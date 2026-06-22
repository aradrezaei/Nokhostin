'use client';
import { Award, Shield, GraduationCap, Globe, Building2, Users } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: Award,
      title: 'مجوز رسمی و مدرک بین‌المللی',
      description:
        'دارای مجوز رسمی از سازمان فنی و حرفه‌ای کشور و مدرک معتبر قابل ترجمه برای اشتغال و مهاجرت',
      gradient: 'from-blue-500/10 to-cyan-500/10',
      iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      iconColor: 'text-blue-500',
    },
    {
      icon: GraduationCap,
      title: 'اساتید با سابقه اجرایی',
      description:
        'اساتید ما مدیران و متخصصان فعال در صنعت هستند. آموزش بر پایه تجربه واقعی و پروژه‌های عملی',
      gradient: 'from-violet-500/10 to-purple-500/10',
      iconBg: 'bg-gradient-to-br from-violet-500 to-purple-500',
      iconColor: 'text-violet-500',
      featured: true,
    },
    {
      icon: Shield,
      title: 'تعهد به موفقیت شما',
      description:
        'پشتیبانی کامل تا زمان اشتغال، معرفی به کار، مشاوره شغلی و به‌روزرسانی مداوم محتوا',
      gradient: 'from-emerald-500/10 to-teal-500/10',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-500',
      iconColor: 'text-emerald-500',
    },
  ];

  const credentials = [
    {
      icon: Building2,
      title: 'موسسه ثبت‌شده',
      value: 'شماره ثبت: ۲۸۴۵۶',
    },
    {
      icon: Globe,
      title: 'مجوز بین‌المللی',
      value: 'سازمان فنی و حرفه‌ای کشور',
    },
    {
      icon: Users,
      title: 'از سال ۱۳۸۱',
      value: 'در خدمت جامعه آموزشی ایران',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0" />
      <div className="absolute inset-0 " />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className={`group relative ${feature.featured ? 'md:scale-105' : ''}`}>
              {/* Card */}
              <div
                className={`
                relative h-full p-8 rounded-2xl border transition-all duration-300
                ${
                  feature.featured
                    ? 'bg-white dark:bg-gray-900 border-violet-500/50 dark:border-violet-500/50 shadow-xl shadow-violet-500/10'
                    : 'bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-lg'
                }
              `}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative space-y-6">
                  {/* Icon */}
                  <div
                    className={`
                    w-14 h-14 rounded-xl ${feature.iconBg} 
                    flex items-center justify-center
                    shadow-lg shadow-current/20
                    transition-transform duration-300 
                  `}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Featured Badge */}
                  {feature.featured}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Credentials Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-cyan-500/10 rounded-3xl blur-3xl" />

          <div className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-3xl border border-gray-200 dark:border-gray-800 p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8">
              {credentials.map((credential, index) => (
                <div key={index} className="text-center space-y-4 group">
                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center ">
                    <credential.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>

                  {/* Title */}
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    {credential.title}
                  </h4>

                  {/* Value */}
                  <p className="text-gray-600 dark:text-gray-400">{credential.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
