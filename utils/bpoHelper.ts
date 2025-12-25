
export const calculateEstimate = (serviceType: string, teamSize: number, duration: string): string => {
  // Base monthly rate per agent
  const baseRates: Record<string, number> = {
    'Customer Support': 1200,
    'Telemarketing': 1400,
    'Data Entry': 800,
    'Virtual Assistance': 1000,
    'Back Office Ops': 1100,
    'Back Office': 1100
  };
  
  const rate = baseRates[serviceType] || 1000;
  
  // Duration multiplier
  let multiplier = 1;
  if (duration.includes('Short')) multiplier = 1.25; // Premium for short term
  if (duration.includes('Long')) multiplier = 0.9;   // Discount for long term
  
  // Calculate total monthly cost
  const total = rate * teamSize * multiplier;
  
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(total);
};

export const determinePriority = (teamSize: number, duration: string, serviceType: string): 'High' | 'Medium' | 'Low' => {
  // High Priority Rules
  if (teamSize >= 10) return 'High';
  if (duration.includes('Long') && teamSize >= 5) return 'High';
  if (serviceType === 'Telemarketing' && teamSize >= 8) return 'High';

  // Medium Priority Rules
  if (teamSize >= 4) return 'Medium';
  if (duration.includes('Medium') || duration.includes('Long')) return 'Medium';

  return 'Low';
};
