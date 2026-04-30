import React from 'react';
import {
  Users,
  Layers,
  BarChart2,
  AlertTriangle,
  MessageSquare,
  BookOpen,
  CalendarClock,
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


// Grid plan: 7 cards → grid-cols-4 → row 1: hero spans 2 cols + 2 regular; row 2: 4 regular (last spans 1)
// Adjusted: hero (col-span-2) + 2 regular in row 1 = 4 cols; row 2: 3 regular + 1 spanning 1 = 4 cols ✓

const metrics = [
  {
    id: 'kpi-students',
    label: 'Total Active Students',
    value: '1,847',
    sub: '+43 enrolled this week',
    trend: 'up',
    icon: Users,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    hero: true,
  },
  {
    id: 'kpi-batches',
    label: 'Active Batches',
    value: '14',
    sub: '3 batches starting next week',
    trend: 'neutral',
    icon: Layers,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    hero: false,
  },
  {
    id: 'kpi-avgscore',
    label: 'Avg Mock Score',
    value: '64.7%',
    sub: '+2.3% vs last month',
    trend: 'up',
    icon: BarChart2,
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-100',
    hero: false,
  },
  {
    id: 'kpi-atrisk',
    label: 'At-Risk Students',
    value: '31',
    sub: '↑ 7 since last week — needs review',
    trend: 'alert',
    icon: AlertTriangle,
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    hero: false,
  },
  {
    id: 'kpi-doubts',
    label: 'Doubt Resolution Rate',
    value: '88.4%',
    sub: '142 AI-resolved today',
    trend: 'up',
    icon: MessageSquare,
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    border: 'border-sky-100',
    hero: false,
  },
  {
    id: 'kpi-content',
    label: 'Content Coverage',
    value: '73%',
    sub: '18 topics not yet uploaded',
    trend: 'down',
    icon: BookOpen,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    hero: false,
  },
  {
    id: 'kpi-tests',
    label: 'Tests This Week',
    value: '8',
    sub: '3 scheduled, 5 completed',
    trend: 'neutral',
    icon: CalendarClock,
    color: 'text-slate-600',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    hero: false,
  },
];

export default function AdminMetricsBento() {
  // Layout: grid-cols-4, hero spans 2 cols
  // Row 1: hero(2) + col + col = 4 ✓
  // Row 2: col + col + col + col = 4 ✓
  // Total 7 cards: 3 in row 1 (hero + 2), 4 in row 2 ✓
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
      {metrics?.map((m, idx) => {
        const Icon = m?.icon;
        const isHero = m?.hero;
        return (
          <div
            key={m?.id}
            className={`card p-5 border ${m?.border} ${isHero ? 'col-span-2' : ''} ${
              m?.trend === 'alert' ? 'bg-red-50 ring-1 ring-red-200' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs font-semibold text-muted-foreground tracking-wide uppercase leading-tight">
                {m?.label}
              </p>
              <div className={`w-8 h-8 rounded-lg ${m?.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon size={15} className={m?.color} />
              </div>
            </div>
            <p className={`font-mono-nums font-bold text-foreground ${isHero ? 'text-4xl' : 'text-2xl'}`}>
              {m?.value}
            </p>
            <p
              className={`text-xs mt-1.5 font-medium ${
                m?.trend === 'up' ?'text-green-600'
                  : m?.trend === 'down' ?'text-amber-600'
                  : m?.trend === 'alert' ?'text-red-600' :'text-muted-foreground'
              }`}
            >
              {m?.trend === 'up' && '↑ '}
              {m?.trend === 'down' && '↓ '}
              {m?.trend === 'alert' && '⚠ '}
              {m?.sub}
            </p>
          </div>
        );
      })}
    </div>
  );
}