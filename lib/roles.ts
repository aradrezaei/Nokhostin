import type { UserRole } from './types';

export const ROLE_LABEL: Record<UserRole, string> = {
  super_admin: 'مدیرکل',
  mentor: 'استاد',
  student: 'هنرجو',
};

/** Landing route for each role's panel. */
export function panelHome(role: UserRole): string {
  switch (role) {
    case 'super_admin':
      return '/admin';
    case 'mentor':
      return '/mentor';
    case 'student':
      return '/dashboard';
  }
}
