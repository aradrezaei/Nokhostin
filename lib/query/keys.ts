/** Central query-key factory — keeps cache invalidation typed and consistent. */
export const queryKeys = {
  me: ['me'] as const,
  classes: ['me', 'classes'] as const,
  overview: ['me', 'overview'] as const,
  classProgress: (classId: string) => ['me', 'classes', classId, 'progress'] as const,
  adminUsers: (filters: { role: string; search: string }) =>
    ['admin', 'users', filters] as const,
} as const;
