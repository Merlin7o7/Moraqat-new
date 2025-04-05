import { useLanguage } from '@/hooks/use-language';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const { t, language } = useLanguage();

  const testimonials = [
    {
      name: language === 'en' ? 'Sarah A.' : 'سارة أ.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      content: language === 'en' 
        ? 'My picky Persian cat Luna finally loves her food! The Premium plan has the perfect mix of wet and dry food that keeps her satisfied.' 
        : 'قطتي الفارسية المتقلبة لونا أخيرًا تحب طعامها! تحتوي الخطة المتميزة على مزيج مثالي من الطعام الرطب والجاف الذي يبقيها راضية.',
      rating: 5,
    },
    {
      name: language === 'en' ? 'Mohammed K.' : 'محمد ك.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      content: language === 'en' 
        ? 'I love the convenience! The VIP plan with bi-weekly delivery means I never run out of food for Simba. The vet consultation is also incredibly helpful.' 
        : 'أحب الراحة! تعني خطة كبار الشخصيات مع التوصيل نصف الشهري أنني لا أنفد أبدًا من الطعام لسيمبا. الاستشارة البيطرية مفيدة أيضًا بشكل لا يصدق.',
      rating: 5,
    },
    {
      name: language === 'en' ? 'Layla M.' : 'ليلى م.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      content: language === 'en' 
        ? 'My 3 cats all have different needs, and Moraqqat makes it so easy to manage. The Basic plan is affordable and still provides high-quality nutrition.' 
        : 'قططي الثلاث لديهم احتياجات مختلفة، ومرقط يجعل من السهل إدارتها. الخطة الأساسية ميسورة التكلفة وما زالت توفر تغذية عالية الجودة.',
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#1A2421] sm:text-4xl font-heading">
            {t('testimonials.title')}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-[#52524E]">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-[#FAFAF9] p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  className="h-12 w-12 rounded-full" 
                  src={testimonial.image} 
                  alt={`${testimonial.name} avatar`} 
                />
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-[#1A2421]">
                    {testimonial.name}
                  </h4>
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-[#52524E]">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
