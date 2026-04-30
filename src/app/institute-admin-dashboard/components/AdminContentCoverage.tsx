import React from 'react';
import Badge from '@/components/ui/Badge';
import { BookOpen, AlertCircle } from 'lucide-react';

const subjects = [
  { id: 'subj-polity', name: 'Indian Polity', covered: 92, total: 24, uploaded: 22, color: 'bg-blue-500' },
  { id: 'subj-history', name: 'Modern History', covered: 78, total: 18, uploaded: 14, color: 'bg-violet-500' },
  { id: 'subj-geo', name: 'Geography', covered: 85, total: 20, uploaded: 17, color: 'bg-green-500' },
  { id: 'subj-eco', name: 'Economy', covered: 61, total: 22, uploaded: 13, color: 'bg-amber-500' },
  { id: 'subj-env', name: 'Environment', covered: 54, total: 16, uploaded: 9, color: 'bg-red-400' },
  { id: 'subj-scitech', name: 'Sci & Technology', covered: 70, total: 14, uploaded: 10, color: 'bg-sky-500' },
];

export default function AdminContentCoverage() {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen size={15} className="text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Content Coverage</h3>
        </div>
        <Badge variant="warning">18 topics missing</Badge>
      </div>
      <div className="space-y-3">
        {subjects?.map((s) => (
          <div key={s?.id}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium text-foreground">{s?.name}</span>
                {s?.covered < 65 && (
                  <AlertCircle size={11} className="text-amber-500" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground font-mono-nums">
                  {s?.uploaded}/{s?.total} topics
                </span>
                <span className={`text-xs font-bold font-mono-nums ${s?.covered >= 80 ? 'text-green-600' : s?.covered >= 65 ? 'text-amber-600' : 'text-red-600'}`}>
                  {s?.covered}%
                </span>
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${s?.color}`}
                style={{ width: `${s?.covered}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 w-full text-xs font-semibold text-primary bg-primary/5 hover:bg-primary/10 rounded-lg py-2 transition-colors">
        Upload Missing Material →
      </button>
    </div>
  );
}