'use client';
import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const subjectData = [
  { subject: 'Polity', score: 74, target: 80 },
  { subject: 'History', score: 61, target: 75 },
  { subject: 'Geography', score: 68, target: 75 },
  { subject: 'Economy', score: 52, target: 70 },
  { subject: 'Sci & Tech', score: 79, target: 80 },
  { subject: 'Current Aff.', score: 83, target: 85 },
  { subject: 'Environment', score: 58, target: 70 },
];

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { payload: { subject: string; score: number; target: number } }[] }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-card border border-border rounded-lg shadow-elevated px-3 py-2 text-xs">
      <p className="font-semibold text-foreground mb-1">{d.subject}</p>
      <p className="text-blue-600">Your score: <span className="font-bold font-mono-nums">{d.score}%</span></p>
      <p className="text-muted-foreground">Target: <span className="font-bold font-mono-nums">{d.target}%</span></p>
    </div>
  );
};

export default function SubjectRadarChartInner() {
  return (
    <div className="card p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Subject-wise Performance</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Accuracy % vs target score</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <RadarChart data={subjectData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fontSize: 10, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}
          />
          <Radar
            name="Target"
            dataKey="target"
            stroke="var(--border)"
            fill="var(--border)"
            fillOpacity={0.2}
            strokeDasharray="4 2"
          />
          <Radar
            name="Your Score"
            dataKey="score"
            stroke="var(--primary)"
            fill="var(--primary)"
            fillOpacity={0.25}
            strokeWidth={2}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center gap-4 justify-center mt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-primary rounded" />
          <span className="text-[11px] text-muted-foreground">Your Score</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-border rounded border-dashed" />
          <span className="text-[11px] text-muted-foreground">Target</span>
        </div>
      </div>

      {/* Subject bars */}
      <div className="mt-4 space-y-2">
        {subjectData.slice(0, 4).map((s) => {
          const gap = s.score - s.target;
          return (
            <div key={`bar-${s.subject}`} className="flex items-center gap-2">
              <span className="text-[11px] text-muted-foreground w-24 flex-shrink-0 truncate">{s.subject}</span>
              <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${gap >= 0 ? 'bg-green-500' : 'bg-red-400'}`}
                  style={{ width: `${s.score}%` }}
                />
              </div>
              <span className={`text-[11px] font-semibold font-mono-nums w-10 text-right ${gap >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {s.score}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}