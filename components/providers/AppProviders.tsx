'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { AuthProvider } from '@/lib/auth';
import { makeQueryClient } from '@/lib/query/client';

export default function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => makeQueryClient());

  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </NuqsAdapter>
  );
}
