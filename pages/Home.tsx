
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { COMPANY_NAME, TAGLINE, FEATURES, SERVICES, TESTIMONIALS } from '../constants';
import { Button } from '../components/Button';

const HERO_SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    title: 'Your Trusted Partner in Smart Outsourcing',
    subtitle: 'Scale your business efficiently with our world-class dedicated teams and operational excellence.'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    title: '24/7 Global Customer Support',
    subtitle: 'Deliver seamless, empathetic customer experiences around the clock, in any timezone.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    title: 'Data-Driven Business Growth',
    subtitle: 'Unlock insights and streamline operations with our expert data entry and analysis services.'
  }
];

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero Slider Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Testimonial Logic
  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    const testimonialTimer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(testimonialTimer);
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Slider Section */}
      <section className="relative h-[650px] md:h-[750px] flex items-center justify-center overflow-hidden bg-brand-900">
        
        {/* Background Images with Crossfade */}
        {HERO_SLIDES.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-brand-900/60 z-10 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-transparent to-transparent z-10" />
            <img 
              src={slide.image} 
              alt={slide.title} 
              className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${index === currentSlide ? 'scale-110' : 'scale-100'}`}
            />
          </div>
        ))}

        {/* Hero Content */}
        <div className="container mx-auto px-4 md:px-6 relative z-20 pt-16">
          <div className="max-w-4xl mx-auto text-center">
            {HERO_SLIDES.map((slide, index) => (
               index === currentSlide && (
                 <div key={slide.id} className="animate-fade-in-up">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight text-white drop-shadow-sm">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-brand-100 mb-10 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
                      {slide.subtitle}
                    </p>
                 </div>
               )
            ))}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-200">
              <Button size="lg" onClick={() => navigate('/quote')} className="shadow-lg shadow-brand-500/30">
                Get a Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-900 backdrop-blur-sm bg-white/10" onClick={() => navigate('/services')}>
                Explore Services
              </Button>
            </div>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center space-x-3">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentSlide 
                  ? 'bg-brand-400 w-8' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Why Choose {COMPANY_NAME}?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              We combine human expertise with technology to deliver superior results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl transition-all hover:shadow-xl hover:-translate-y-1 border border-slate-100 dark:border-slate-700">
                <div className="w-12 h-12 bg-brand-100 dark:bg-slate-700 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl mb-6 md:mb-0">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Core Services</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Comprehensive outsourcing solutions tailored to your industry needs.
              </p>
            </div>
            <Button variant="secondary" onClick={() => navigate('/services')}>View All Services</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.slice(0, 3).map((service) => (
              <div key={service.id} className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-500 transition-colors group">
                <div className="w-14 h-14 bg-brand-50 dark:bg-slate-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-500 dark:group-hover:bg-brand-500 transition-colors">
                  <service.icon className="h-7 w-7 text-brand-600 dark:text-brand-400 group-hover:text-white dark:group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">{service.description}</p>
                <ul className="space-y-2 mb-8">
                  {service.details?.slice(0, 2).map((detail, i) => (
                    <li key={i} className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                      <CheckCircle2 className="h-4 w-4 text-brand-500 dark:text-brand-400 mr-2" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Client Success Stories</h2>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Carousel Item */}
            <div className="bg-slate-50 dark:bg-slate-800 p-12 rounded-2xl relative border border-transparent dark:border-slate-700 text-center transition-all duration-500 ease-in-out">
              <div className="absolute top-8 left-8 text-brand-200 dark:text-slate-700">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21L14.017 18C14.017 16.896 14.325 15.923 14.941 15.082C15.557 14.241 16.48 13.821 17.709 13.821C18.156 13.821 18.66 13.87 19.22 13.968V7.526C17.375 7.721 16.037 8.246 15.207 9.1C14.377 9.954 13.962 11.232 13.962 12.934L13.962 13.906H11V3H23V12.934C23 15.65 22.338 17.788 21.014 19.349C19.69 20.91 17.917 21.691 15.694 21.691L14.017 21ZM5.017 21L5.017 18C5.017 16.896 5.325 15.923 5.941 15.082C6.557 14.241 7.48 13.821 8.709 13.821C9.156 13.821 9.66 13.87 10.22 13.968V7.526C8.375 7.721 7.037 8.246 6.207 9.1C5.377 9.954 4.962 11.232 4.962 12.934L4.962 13.906H2V3H14V12.934C14 15.65 13.338 17.788 12.014 19.349C10.69 20.91 8.917 21.691 6.694 21.691L5.017 21Z" />
                </svg>
              </div>
              
              <div className="relative z-10 py-4">
                <p className="text-2xl text-slate-700 dark:text-slate-300 italic mb-8">"{TESTIMONIALS[activeTestimonial].content}"</p>
                <div className="flex flex-col items-center">
                  <img src={TESTIMONIALS[activeTestimonial].image} alt={TESTIMONIALS[activeTestimonial].name} className="w-16 h-16 rounded-full object-cover mb-4 ring-4 ring-brand-100 dark:ring-slate-700" />
                  <h4 className="font-bold text-xl text-slate-900 dark:text-white">{TESTIMONIALS[activeTestimonial].name}</h4>
                  <p className="text-slate-500 dark:text-slate-400">{TESTIMONIALS[activeTestimonial].role}, {TESTIMONIALS[activeTestimonial].company}</p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={prevTestimonial}
              className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 bg-white dark:bg-slate-700 p-3 rounded-full shadow-lg text-brand-900 dark:text-white hover:bg-brand-50 dark:hover:bg-slate-600 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 bg-white dark:bg-slate-700 p-3 rounded-full shadow-lg text-brand-900 dark:text-white hover:bg-brand-50 dark:hover:bg-slate-600 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            
            {/* Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-3 h-3 rounded-full transition-colors ${idx === activeTestimonial ? 'bg-brand-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-500 dark:bg-brand-600 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Optimize Your Business?</h2>
          <p className="text-brand-100 text-lg mb-8 max-w-2xl mx-auto">Get a free consultation and quote today. Let's build a solution that fits your specific needs.</p>
          <Button size="lg" variant="secondary" onClick={() => navigate('/contact')}>
            Contact Us Now
          </Button>
        </div>
      </section>
    </div>
  );
};
