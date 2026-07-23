'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

// تعریف ساختار داده‌ها برای انعطاف‌پذیری کامل
interface FAQItem {
  q: string;
  a: string;
  category?: string;
}

interface SmartFAQProps {
  items: FAQItem[];
  title?: string;
  description?: string;
  accentColor?: string; // برای تغییر رنگ تم در هر صفحه (مثلا purple یا blue)
}

export default function SmartFAQ({
  items,
  title = 'سوالات متداول',
  description,
  accentColor = 'purple',
}: SmartFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery] = useState('');

  // فیلتر کردن سوالات بر اساس جستجو (باعث بالا رفتن شدید تجربه کاربری می‌شود)
  const filteredItems = useMemo(() => {
    return items.filter(
      (item) =>
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, items]);

  return (
    <div className="w-full py-12">
      {/* Header Section */}
      <div className="text-center mb-12 space-y-4">
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight dark:text-white"
          >
            {title}
          </motion.h2>
        )}
        {description && (
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-4xl mx-auto space-y-3 px-4">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((faq, i) => (
            <motion.div
              layout
              key={faq.q}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`group overflow-hidden rounded-2xl border transition-all duration-300 ${
                openIndex === i
                  ? `border-${accentColor}-500/50 bg-${accentColor}-50/30 dark:bg-${accentColor}-900/10 `
                  : 'border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm'
              }`}
            >
              <button
                onClick={() => { setOpenIndex(openIndex === i ? null : i); }}
                className="w-full flex items-center justify-between p-4 md:p-8 text-right outline-none"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
                      openIndex === i
                        ? `bg-${accentColor}-500 text-white`
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {openIndex === i ? <Sparkles size={20} /> : <HelpCircle size={20} />}
                  </div>
                  <span
                    className={`text-lg md:text-xl font-bold transition-colors ${
                      openIndex === i
                        ? `text-${accentColor}-700 dark:text-${accentColor}-400`
                        : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {faq.q}
                  </span>
                </div>

                <div
                  className={`p-2 rounded-full transition-transform duration-500 ${openIndex === i ? 'rotate-180 bg-white dark:bg-slate-800' : ''}`}
                >
                  <ChevronDown
                    className={openIndex === i ? `text-${accentColor}-500` : 'text-slate-400'}
                  />
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-8 pb-8 pr-20 md:pr-24">
                      <div
                        className={`h-px w-full bg-gradient-to-l from-${accentColor}-500/20 to-transparent mb-6`}
                      />
                      <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-slate-500">سوال مورد نظر شما پیدا نشد.</div>
        )}
      </div>
    </div>
  );
}
