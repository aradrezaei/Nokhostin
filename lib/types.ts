export type UserRole = 'super_admin' | 'mentor' | 'student';
export type StudentType = 'in_person' | 'online' | null;
export type UserStatus = 'active' | 'inactive';
export type PostStatus = 'draft' | 'published' | 'archived';

export interface AuthUser {
  id: string;
  mobile: string;
  fullName: string;
  role: UserRole;
  studentType: StudentType;
  status: UserStatus;
  createdAt?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface ManagedUser extends AuthUser {
  createdBy: string | null;
  createdAt: string;
}

export interface Paginated<T> {
  items: T[];
  pagination: { page: number; pageSize: number; total: number };
}

export interface MediaAsset {
  id: string;
  url: string;
  thumbnailUrl: string | null;
  alt: string;
  width: number;
  height: number;
  placeholder: string | null;
}

export interface Taxonomy {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
}

export type TextMark = 'bold' | 'italic' | 'lead';

export type ContentBlock =
  | { type: 'heading'; level: 2 | 3 | 4; text: string }
  | { type: 'paragraph'; spans: { text: string; marks?: TextMark[]; href?: string }[] }
  | { type: 'image'; mediaId: string; alt: string; caption?: string }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'code'; language?: string; code: string }
  | { type: 'embed'; provider: 'youtube' | 'aparat'; url: string; title?: string }
  | { type: 'divider' };

export interface PostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  status: PostStatus;
  cover: MediaAsset | null;
  category: Taxonomy | null;
  tags: Taxonomy[];
  readingTimeMinutes: number;
  wordCount: number;
  viewsCount: number;
  author: { id: string; name: string } | null;
  publishedAt: string | null;
  updatedAt: string;
  createdAt: string;
}

export interface PostDetail extends PostSummary {
  content: ContentBlock[];
  mediaMap: Record<string, MediaAsset>;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    canonicalUrl: string | null;
    ogTitle: string;
    ogDescription: string;
    ogImage: MediaAsset | null;
  };
}

export interface PostDetailResponse {
  post: PostDetail;
  jsonLd: Record<string, unknown>;
  breadcrumb: Record<string, unknown>;
}

// ===== آموزش: آموزشگاه / دوره / کلاس / حضورغیاب / نمره / روند =====

export type InstituteType = 'language' | 'vocational';
export type ClassStatus = 'active' | 'finished' | 'archived';
export type SessionStatus = 'scheduled' | 'held' | 'canceled';
export type EnrollmentStatus = 'active' | 'dropped';
export type AttendanceStatus = 'present' | 'absent' | 'late';
export type WeekDay =
  | 'saturday'
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday';

export interface ClassSchedule {
  days: WeekDay[];
  time: string;
}

export interface Institute {
  id: string;
  name: string;
  slug: string;
  type: InstituteType;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  instituteId: string;
  name: string;
  level: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CourseRef {
  id: string;
  name: string;
  level: string | null;
  description?: string | null;
}

export interface TeacherRef {
  id: string;
  fullName: string;
  mobile?: string;
}

export interface ClassSummary {
  id: string;
  instituteId: string;
  courseId: string;
  teacherId: string;
  title: string;
  termNumber: number;
  totalSessions: number;
  startDate: string;
  schedule: ClassSchedule;
  status: ClassStatus;
  createdAt: string;
  course: CourseRef | null;
  teacher: TeacherRef | null;
  studentCount: number;
  sessionsHeld: number;
}

export interface ClassSession {
  id: string;
  sessionNumber: number;
  scheduledDate: string;
  scheduledDateJalali?: string;
  status: SessionStatus;
  isToday?: boolean;
}

export interface ClassRosterEntry {
  enrollmentId: string;
  status: EnrollmentStatus;
  tuitionPaid?: boolean;
  student: { id: string; fullName: string; mobile: string; status: UserStatus };
}

export interface ClassDetail {
  id: string;
  instituteId: string;
  courseId: string;
  teacherId: string;
  title: string;
  termNumber: number;
  totalSessions: number;
  startDate: string;
  startDateJalali?: string;
  schedule: ClassSchedule;
  status: ClassStatus;
  createdAt: string;
  course: CourseRef | null;
  teacher: TeacherRef | null;
  sessionsHeld: number;
  students: ClassRosterEntry[];
  sessions: ClassSession[];
}

export interface AttendanceRow {
  studentId: string;
  fullName: string;
  status: AttendanceStatus | null;
  lateMinutes: number;
  note: string | null;
  updatedAt?: string | null;
  updatedAtJalali?: string | null;
}

export interface AttendanceSessionMeta {
  id: string;
  sessionNumber: number;
  scheduledDate: string;
  scheduledDateJalali: string;
  status: SessionStatus;
  isToday: boolean;
  canMark: boolean;
}

export interface AttendancePayload {
  session: AttendanceSessionMeta;
  records: AttendanceRow[];
}

export interface EvaluationRow {
  studentId: string;
  fullName: string;
  listening: number | null;
  writing: number | null;
  reading: number | null;
  speaking: number | null;
  note: string | null;
}

export interface TermGrade {
  id: string;
  enrollmentId: string;
  midterm: number | null;
  final: number | null;
  finalSpeaking: number | null;
  finalListening: number | null;
  note: string | null;
}

export interface Medal {
  code: 'top_rank' | 'improved';
  title: string;
  description: string;
}

export interface SkillAverages {
  listening: number | null;
  writing: number | null;
  reading: number | null;
  speaking: number | null;
}

export interface EvaluationPoint extends SkillAverages {
  sessionNumber: number;
  average: number | null;
}

export interface ClassProgress {
  class: {
    id: string;
    title: string;
    termNumber: number;
    totalSessions: number;
    schedule: ClassSchedule;
    startDate: string;
    status: ClassStatus;
    course: CourseRef | null;
    teacher: TeacherRef | null;
  };
  tuitionPaid: boolean;
  sessions: { total: number; held: number; current: number; remaining: number };
  attendance: {
    present: number;
    absent: number;
    late: number;
    totalLateMinutes: number;
    lateSessions: { sessionNumber: number; lateMinutes: number }[];
  };
  evaluations: { averages: SkillAverages; overall: number | null; series: EvaluationPoint[] };
  termGrade: TermGrade | null;
  score: number | null;
  rank: { position: number | null; totalRanked: number; isTop: boolean };
  improvement: {
    improved: boolean;
    previousScore: number | null;
    currentScore: number | null;
    delta: number | null;
  };
  medals: Medal[];
}

export interface MyClassEntry {
  enrollmentId: string;
  tuitionPaid: boolean;
  status: EnrollmentStatus;
  class: {
    id: string;
    title: string;
    termNumber: number;
    totalSessions: number;
    schedule: ClassSchedule;
    startDate: string;
    status: ClassStatus;
    course: CourseRef | null;
    teacher: TeacherRef | null;
    sessionsHeld: number;
  };
}
