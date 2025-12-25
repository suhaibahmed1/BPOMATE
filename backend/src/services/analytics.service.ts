import Quote, { QuoteStatus } from '../models/Quote';
import Service from '../models/Service';

export const getDashboardStats = async () => {
  const totalQuotes = await Quote.countDocuments();
  
  const activeServices = await Service.countDocuments({ active: true });

  // Conversion Rate (Approved / Total)
  const approvedQuotes = await Quote.countDocuments({ status: QuoteStatus.APPROVED });
  const conversionRate = totalQuotes > 0 ? ((approvedQuotes / totalQuotes) * 100).toFixed(1) : 0;

  // Most Requested Service
  const popularService = await Quote.aggregate([
    { $group: { _id: "$serviceType", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 }
  ]);
  const mostRequested = popularService.length > 0 ? popularService[0]._id : 'N/A';

  // Monthly Trends (Last 6 months)
  const monthlyTrends = await Quote.aggregate([
    {
      $match: {
        createdAt: { 
          $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)) 
        } 
      }
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 },
        approved: { 
          $sum: { $cond: [{ $eq: ["$status", QuoteStatus.APPROVED] }, 1, 0] } 
        }
      }
    },
    { $sort: { "_id": 1 } }
  ]);

  return {
    totalQuotes,
    activeServices,
    conversionRate,
    mostRequested,
    monthlyTrends
  };
};