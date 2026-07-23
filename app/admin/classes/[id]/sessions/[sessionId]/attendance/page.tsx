'use client';

import { useParams } from 'next/navigation';
import AttendanceEditor from '@/components/panel/AttendanceEditor';

export default function AdminAttendancePage() {
  const { id, sessionId } = useParams<{ id: string; sessionId: string }>();
  return (
    <AttendanceEditor classId={id} sessionId={sessionId} backHref={`/admin/classes/${id}`} />
  );
}
