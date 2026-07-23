'use client';

import { scheduleEffect } from '@/lib/scheduleEffect';

import { useCallback, useEffect, useState } from 'react';
import { Building2, Plus } from 'lucide-react';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import type { Institute, InstituteType } from '@/lib/types';
import { Alert, Badge, Button, Card, Field, Modal, Select, TextInput } from '@/components/panel/ui';
import { EmptyState, Spinner } from '@/components/panel/widgets';

const TYPE_LABEL: Record<InstituteType, string> = {
  language: 'زبان',
  vocational: 'فنی و حرفه‌ای',
};

export default function AdminInstitutesPage() {
  const { request } = useAuth();
  const [items, setItems] = useState<Institute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [form, setForm] = useState({ name: '', slug: '', type: 'language' as InstituteType });

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setItems(await request<Institute[]>('/admin/institutes'));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'خطا در دریافت آموزشگاه‌ها.');
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => scheduleEffect(() => load()), [load]);

  const submit = async () => {
    setSaving(true);
    setFormError('');
    try {
      await request('/admin/institutes', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      setOpen(false);
      setForm({ name: '', slug: '', type: 'language' });
      await load();
    } catch (e) {
      setFormError(e instanceof ApiError ? e.message : 'ثبت آموزشگاه ناموفق بود.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">آموزشگاه‌ها</h1>
          <p className="mt-1 text-sm font-bold text-slate-400">
            هر آموزشگاه قابلیت‌های خودش را دارد؛ بلاگ و ورود مشترک است.
          </p>
        </div>
        <Button
          onClick={() => {
            setFormError('');
            setOpen(true);
          }}
        >
          <Plus className="h-4 w-4" /> آموزشگاه جدید
        </Button>
      </header>

      {error && <Alert>{error}</Alert>}
      {loading ? (
        <Spinner />
      ) : items.length === 0 ? (
        <EmptyState icon={<Building2 className="h-6 w-6" />} title="هنوز آموزشگاهی ثبت نشده" />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((inst) => (
            <Card key={inst.id} className="!p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-black text-slate-900 dark:text-white">{inst.name}</p>
                  <p dir="ltr" className="mt-1 text-left text-xs font-bold text-slate-400">
                    /{inst.slug}
                  </p>
                </div>
                <Badge tone={inst.type === 'language' ? 'violet' : 'amber'}>
                  {TYPE_LABEL[inst.type]}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={open}
        title="ثبت آموزشگاه جدید"
        onClose={() => {
          setOpen(false);
        }}
      >
        <div className="space-y-4">
          {formError && <Alert>{formError}</Alert>}
          <Field label="نام آموزشگاه">
            <TextInput
              value={form.name}
              onChange={(e) => {
                setForm((f) => ({ ...f, name: e.target.value }));
              }}
              placeholder="مثلاً آموزشگاه زبان نخستین"
            />
          </Field>
          <Field label="اسلاگ انگلیسی" hint="فقط حروف کوچک، عدد و خط تیره">
            <TextInput
              dir="ltr"
              value={form.slug}
              onChange={(e) => {
                setForm((f) => ({
                  ...f,
                  slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''),
                }));
              }}
              placeholder="language"
            />
          </Field>
          <Field label="نوع">
            <Select
              value={form.type}
              onChange={(e) => {
                setForm((f) => ({ ...f, type: e.target.value as InstituteType }));
              }}
            >
              <option value="language">زبان</option>
              <option value="vocational">فنی و حرفه‌ای</option>
            </Select>
          </Field>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="ghost"
              onClick={() => {
                setOpen(false);
              }}
            >
              انصراف
            </Button>
            <Button
              onClick={submit}
              disabled={saving || form.name.length < 2 || form.slug.length < 2}
            >
              {saving ? 'در حال ثبت…' : 'ثبت'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
