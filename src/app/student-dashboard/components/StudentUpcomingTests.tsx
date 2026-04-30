import React from 'react';
import Badge from '@/components/ui/Badge';
import { Calendar, Clock, AlertCircle } from 'lucide-react';

const upcoming = [
  {
    id: 'upcoming-001',
    name: 'UPSC Prelims Full Mock #15',
    date: '02 May 2026',
    time: '10:00 AM',
    duration: '2 hrs',
    status: 'scheduled',
    urgent: false,
  },
  {
    id: 'upcoming-002',
    name: 'Science & Technology Test #9',
    date: '04 May 2026',
    time: '2:00 PM',
    duration: '1 hr',
    status: 'scheduled',
    urgent: false,
  },
  {
    id: 'upcoming-003',
    name: 'Economy Current Affairs Special',
    date: '30 Apr 2026',
    time: '4:00 PM',
    duration: '45 min',
    status: 'today',
    urgent: true,
  },
  {
    id: 'upcoming-004',
    name: 'Indian History Sectional #12',
    date: '07 May 2026',
    time: '11:00 AM',
    duration: '1 hr',
    status: 'scheduled',
    urgent: false,
  },
];

export default function StudentUpcomingTests() {
  return (
    <div className="card">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Upcoming Tests</h3>
        <Badge variant="primary">{upcoming?.length}</Badge>
      </div>
      <div className="divide-y divide-border">
        {upcoming?.map((t) => (
          <div
            key={t?.id}
            className={`px-5 py-3.5 hover:bg-muted/30 transition-colors ${
              t?.urgent ? 'bg-amber-50 hover:bg-amber-50' : ''
            }`}
          >
            <div className="flex items-start gap-2">
              {t?.urgent && (
                <AlertCircle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground leading-tight">{t?.name}</p>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Calendar size={10} />
                    {t?.date}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock size={10} />
                    {t?.time} · {t?.duration}
                  </span>
                </div>
              </div>
              <Badge variant={t?.urgent ? 'warning' : 'neutral'} dot>
                {t?.urgent ? 'Today' : 'Upcoming'}
              </Badge>
            </div>
            {t?.urgent && (
              <button className="mt-2.5 w-full text-xs font-semibold text-amber-700 bg-amber-100 hover:bg-amber-200 rounded-lg py-1.5 transition-colors">
                Start Test Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}