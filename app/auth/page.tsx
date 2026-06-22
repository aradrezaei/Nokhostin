// app/auth/page.tsx
'use client'; // استفاده از 'use client' برای کامپوننت‌های تعاملی در App Router

import React, { useState } from 'react';
import Link from 'next/link';

export default function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false); // وضعیت برای نمایش فیلد OTP

  // این توابع فعلاً کاری نمی‌کنند و فقط برای نمایش UI هستند
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending OTP to:', phoneNumber);
    // در اینجا منطق ارسال OTP به بک‌اند قرار می‌گیرد
    // فعلاً فقط برای نمایش، otpSent را True می‌کنیم
    setOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Verifying OTP:', otp);
    // در اینجا منطق تایید OTP با بک‌اند قرار می‌گیرد
    // در صورت موفقیت، کاربر به صفحه اصلی هدایت می‌شود
    alert('تایید OTP - (این بخش فقط UI است و عملکرد ندارد)');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          ورود به نخستین
        </h1>

        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                شماره موبایل
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="مثال: 09123456789"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              ارسال کد تایید (OTP)
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              کد تایید به شماره <span className="font-bold">{phoneNumber}</span> ارسال شد.
            </p>
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                کد تایید (OTP)
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="مثال: 123456"
                maxLength={6}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              تایید کد
            </button>
            <p className="text-center text-sm text-purple-600 dark:text-purple-400">
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="hover:underline focus:outline-none"
              >
                شماره موبایل اشتباه است؟
              </button>
            </p>
          </form>
        )}

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          با ادامه، شما با{' '}
          <Link href="/terms" className="text-purple-600 dark:text-purple-400 hover:underline">
            شرایط و قوانین
          </Link>{' '}
          موافقت می‌کنید.
        </div>
      </div>
    </div>
  );
}
