'use client';
import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts';

const batchData = [
  { batch: 'IAS-A', avg: 68.4, target: 72, students: 62, atRisk: 4 },
  { batch: 'IAS-B', avg: 61.2, target: 72, students: 58, atRisk: 9 },
  { batch: 'IAS-C', avg: 71.8, target: 72, students: 71, atRisk: 2 },
  { batch: 'GATE-CS', avg: 74.3, target: 75, students: 45, atRisk: 3 },
  { batch: 'GATE-EC', avg: 59.1, target: 75, students: 38, atRisk: 11 },
  { batch: 'CAT-Int', avg: 66.9, target: 70, students: 52, atRisk: 6 },
  { batch: 'NEET-A', avg: 78.2, target: 80, students: 84, atRisk: 5 },
  { batch: 'NEET-B', avg: 63.5, target: 80, students: 76, atRisk: 12 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  const d = batchData.find((b) => b.batch === label);
  return (
    <div className="bg-card border border-border rounded-xl shadow-elevated px-4 py-3 text-xs min-w-[160px]">
      <p className="font-bold text-foreground mb-2">{label}</p>
      <p className="text-blue-600 mb-1">Avg Score: <span className="font-bold font-mono-nums">{payload[0]?.value}%</span></p>
      <p className="text-muted-foreground mb-1">Target: <span className="font-semibold">{d?.target}%</span></p>
      <p className="text-foreground mb-1">Students: <span className="font-semibold font-mono-nums">{d?.students}</span></p>
      <p className={`font-semibold ${(d?.atRisk ?? 0) > 8 ? 'text-red-600' : 'text-amber-600'}`}>
        At-Risk: {d?.atRisk}
      </p>
    </div>
  );
};

export default function BatchBarChartInner() {
  const [activeBar, setActiveBar] = useState<string | null>(null);

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Batch-wise Average Score</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Mock test performance across all active batches</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-primary opacity-80" />
            <span className="text-[11px] text-muted-foreground">Avg Score</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 border-t-2 border-dashed border-amber-500" />
            <span className="text-[11px] text-muted-foreground">Target</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={batchData} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="batch"
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}
            axisLine={false}
            tickLine={false}
            domain={[40, 90]}
            tickFormatter={(v: number) => `${v}%`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--muted)', opacity: 0.5 }} />
          <ReferenceLine y={72} stroke="#F59E0B" strokeDasharray="4 2" strokeWidth={1.5} />
          <Bar
            dataKey="avg"
            radius={[4, 4, 0, 0]}
            onMouseEnter={(d: { batch: string }) => setActiveBar(d.batch)}
            onMouseLeave={() => setActiveBar(null)}
          >
            {batchData.map((entry) => (
              <Cell
                key={`bar-cell-${entry.batch}`}
                fill={
                  entry.avg >= entry.target
                    ? '#16A34A'
                    : entry.avg >= entry.target - 8
                    ? 'var(--primary)'
                    : '#DC2626'
                }
                opacity={activeBar === null || activeBar === entry.batch ? 1 : 0.5}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-lg font-bold font-mono-nums text-green-600">3</p>
          <p className="text-[11px] text-muted-foreground">Batches on target</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold font-mono-nums text-primary">3</p>
          <p className="text-[11px] text-muted-foreground">Near target (±8%)</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold font-mono-nums text-red-600">2</p>
          <p className="text-[11px] text-muted-foreground">Underperforming</p>
        </div>
      </div>
    </div>
  );
}