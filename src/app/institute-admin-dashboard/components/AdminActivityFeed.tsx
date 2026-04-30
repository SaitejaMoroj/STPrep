import React from 'react';
import {
  UserPlus,
  ClipboardCheck,
  MessageSquare,
  Upload,
  AlertTriangle,
  FileText,
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface ActivityItem {
  id: string;
  type: 'enrollment' | 'test' | 'doubt' | 'upload' | 'alert' | 'report';
  text: string;
  meta: string;
  time: string;
}

const activities: ActivityItem[] = [
  {
    id: 'act-001',
    type: 'alert',
    text: 'Kavya Nair flagged as critical risk — GATE-EC batch',
    meta: 'Auto-detection',
    time: '12 min ago',
  },
  {
    id: 'act-002',
    type: 'test',
    text: 'UPSC Prelims Full Mock #14 completed — 62 students',
    meta: 'IAS Foundation A',
    time: '2 hrs ago',
  },
  {
    id: 'act-003',
    type: 'upload',
    text: 'Priya Menon uploaded Economy Module 4 (38 pages)',
    meta: 'Study Material',
    time: '3 hrs ago',
  },
  {
    id: 'act-004',
    type: 'doubt',
    text: '142 doubts resolved by AI today — 8 escalated to mentors',
    meta: 'AI Doubt Solver',
    time: '4 hrs ago',
  },
  {
    id: 'act-005',
    type: 'report',
    text: 'April progress reports dispatched to 1,621 parents',
    meta: 'Parent Reports',
    time: '6 hrs ago',
  },
  {
    id: 'act-006',
    type: 'enrollment',
    text: '7 new students enrolled in NEET-B batch',
    meta: 'Enrollment',
    time: '1 day ago',
  },
];

const iconMap: Record<ActivityItem['type'], { icon: React.ElementType; bg: string; color: string }> = {
  enrollment: { icon: UserPlus, bg: 'bg-green-50', color: 'text-green-600' },
  test: { icon: ClipboardCheck, bg: 'bg-blue-50', color: 'text-blue-600' },
  doubt: { icon: MessageSquare, bg: 'bg-violet-50', color: 'text-violet-600' },
  upload: { icon: Upload, bg: 'bg-sky-50', color: 'text-sky-600' },
  alert: { icon: AlertTriangle, bg: 'bg-red-50', color: 'text-red-600' },
  report: { icon: FileText, bg: 'bg-amber-50', color: 'text-amber-600' },
};

export default function AdminActivityFeed() {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Live Activity</h3>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] text-muted-foreground">Live</span>
        </div>
      </div>

      <div className="space-y-3">
        {activities.map((a) => {
          const { icon: Icon, bg, color } = iconMap[a.type];
          return (
            <div key={a.id} className="flex items-start gap-3">
              <div className={`w-7 h-7 rounded-lg ${bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <Icon size={13} className={color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground leading-snug">{a.text}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-muted-foreground">{a.meta}</span>
                  <span className="text-[10px] text-muted-foreground">·</span>
                  <span className="text-[10px] text-muted-foreground">{a.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="mt-4 w-full text-xs font-semibold text-muted-foreground hover:text-foreground bg-muted hover:bg-slate-200 rounded-lg py-2 transition-colors">
        View full activity log
      </button>
    </div>
  );
}