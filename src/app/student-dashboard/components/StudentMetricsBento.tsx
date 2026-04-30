import React from 'react';
import {
  Target,
  Flame,
  Trophy,
  AlertTriangle,
  ClipboardCheck,
  TrendingUp,
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


// Bento plan: 6 cards → grid-cols-3 → row 1: hero (spans 2 cols) + 1 regular; row 2: 3 regular cards
const metrics = [
  {
    id: 'metric-accuracy',
    label: 'Overall Accuracy',
    value: '72.4%',
    sub: '+3.1% vs last week',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    hero: true,
  },
  {
    id: 'metric-streak',
    label: 'Study Streak',
    value: '14',
    sub: 'consecutive days',
    trend: 'up',
    icon: Flame,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    hero: false,
  },
  {
    id: 'metric-rank',
    label: 'Batch Rank',
    value: '#7',
    sub: 'of 62 in IAS-A',
    trend: 'up',
    icon: Trophy,
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-100',
    hero: false,
  },
  {
    id: 'metric-weakareas',
    label: 'Weak Areas',
    value: '4',
    sub: 'subjects need attention',
    trend: 'alert',
    icon: AlertTriangle,
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    hero: false,
  },
  {
    id: 'metric-tests',
    label: 'Tests Completed',
    value: '31',
    sub: 'this month',
    trend: 'neutral',
    icon: ClipboardCheck,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    hero: false,
  },
  {
    id: 'metric-target',
    label: 'Target Score',
    value: '68%',
    sub: '4.4% below target',
    trend: 'down',
    icon: Target,
    color: 'text-slate-600',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    hero: false,
  },
];

export default function StudentMetricsBento() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-6 gap-4">
      {metrics?.map((m) => {
        const Icon = m?.icon;
        return (
          <div
            key={m?.id}
            className={`card p-5 border ${m?.border} ${m?.hero ? 'md:col-span-2 xl:col-span-2' : ''} ${
              m?.trend === 'alert' ? 'bg-red-50' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                {m?.label}
              </p>
              <div className={`w-8 h-8 rounded-lg ${m?.bg} flex items-center justify-center`}>
                <Icon size={15} className={m?.color} />
              </div>
            </div>
            <p className={`font-mono-nums font-bold text-foreground ${m?.hero ? 'text-3xl' : 'text-2xl'}`}>
              {m?.value}
            </p>
            <p
              className={`text-xs mt-1 font-medium ${
                m?.trend === 'up' ?'text-green-600'
                  : m?.trend === 'down' ?'text-red-600'
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