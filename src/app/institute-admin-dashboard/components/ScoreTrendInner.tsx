'use client';
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const weeklyData = [
  { week: 'Mar W1', avg: 58.2, top: 81.4 },
  { week: 'Mar W2', avg: 59.8, top: 83.1 },
  { week: 'Mar W3', avg: 57.4, top: 80.6 },
  { week: 'Mar W4', avg: 61.3, top: 84.2 },
  { week: 'Apr W1', avg: 60.1, top: 82.9 },
  { week: 'Apr W2', avg: 63.7, top: 85.3 },
  { week: 'Apr W3', avg: 62.4, top: 84.1 },
  { week: 'Apr W4', avg: 64.7, top: 87.6 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl shadow-elevated px-3 py-2.5 text-xs">
      <p className="font-semibold text-foreground mb-1.5">{label}</p>
      {payload.map((p, i) => (
        <p key={`tooltip-line-${i + 1}`} style={{ color: p.name === 'avg' ? 'var(--primary)' : 'var(--accent)' }}>
          {p.name === 'avg' ? 'Institute Avg' : 'Top Performer'}: <span className="font-bold font-mono-nums">{p.value}%</span>
        </p>
      ))}
    </div>
  );
};

export default function ScoreTrendInner() {
  return (
    <div className="card p-5 h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Weekly Score Trend</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Institute avg vs top performer</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={weeklyData} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
          <defs>
            <linearGradient id="gradAvg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.25} />
              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradTop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="week"
            tick={{ fontSize: 10, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}
            axisLine={false}
            tickLine={false}
            domain={[50, 95]}
            tickFormatter={(v: number) => `${v}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="top"
            stroke="var(--accent)"
            strokeWidth={1.5}
            fill="url(#gradTop)"
            strokeDasharray="4 2"
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="avg"
            stroke="var(--primary)"
            strokeWidth={2}
            fill="url(#gradAvg)"
            dot={false}
            activeDot={{ r: 4, fill: 'var(--primary)' }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="flex items-center gap-4 justify-center mt-3 pt-3 border-t border-border">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-primary rounded" />
          <span className="text-[11px] text-muted-foreground">Institute Average</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-accent rounded border-dashed" />
          <span className="text-[11px] text-muted-foreground">Top Performer</span>
        </div>
      </div>
    </div>
  );
}