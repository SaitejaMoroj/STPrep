'use client';
import React, { useState } from 'react';
import Badge from '@/components/ui/Badge';
import { ChevronRight, Clock, TrendingUp, TrendingDown } from 'lucide-react';

interface MockAttempt {
  id: string;
  testName: string;
  subject: string;
  date: string;
  score: number;
  total: number;
  percentile: number;
  timeTaken: string;
  rank: number;
  batchSize: number;
  trend: 'up' | 'down' | 'flat';
}

const recentTests: MockAttempt[] = [
  {
    id: 'attempt-001',
    testName: 'UPSC Prelims Full Mock #14',
    subject: 'All Subjects',
    date: '29 Apr 2026',
    score: 142,
    total: 200,
    percentile: 71.3,
    timeTaken: '1h 58m',
    rank: 18,
    batchSize: 62,
    trend: 'up',
  },
  {
    id: 'attempt-002',
    testName: 'Indian Polity Sectional Test #8',
    subject: 'Polity',
    date: '27 Apr 2026',
    score: 74,
    total: 100,
    percentile: 68.5,
    timeTaken: '52m',
    rank: 21,
    batchSize: 62,
    trend: 'up',
  },
  {
    id: 'attempt-003',
    testName: 'Economy & Budget Special',
    subject: 'Economy',
    date: '25 Apr 2026',
    score: 48,
    total: 100,
    percentile: 41.2,
    timeTaken: '58m',
    rank: 39,
    batchSize: 62,
    trend: 'down',
  },
  {
    id: 'attempt-004',
    testName: 'Environment & Ecology Test #5',
    subject: 'Environment',
    date: '23 Apr 2026',
    score: 56,
    total: 100,
    percentile: 55.0,
    timeTaken: '48m',
    rank: 29,
    batchSize: 62,
    trend: 'flat',
  },
  {
    id: 'attempt-005',
    testName: 'UPSC Prelims Full Mock #13',
    subject: 'All Subjects',
    date: '20 Apr 2026',
    score: 131,
    total: 200,
    percentile: 62.8,
    timeTaken: '2h 01m',
    rank: 24,
    batchSize: 62,
    trend: 'up',
  },
];

export default function StudentRecentTests() {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  return (
    <div className="card">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Recent Mock Tests</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Last 5 attempts with performance breakdown</p>
        </div>
        <button className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
          View all <ChevronRight size={12} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-5 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Test</th>
              <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Date</th>
              <th className="text-right px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Score</th>
              <th className="text-right px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Percentile</th>
              <th className="text-right px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Rank</th>
              <th className="text-right px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Time</th>
              <th className="text-center px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Trend</th>
            </tr>
          </thead>
          <tbody>
            {recentTests.map((t) => (
              <tr
                key={t.id}
                onMouseEnter={() => setHoveredRow(t.id)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`border-b border-border transition-colors cursor-pointer ${
                  hoveredRow === t.id ? 'bg-muted/50' : ''
                }`}
              >
                <td className="px-5 py-3">
                  <p className="font-medium text-foreground text-sm leading-tight">{t.testName}</p>
                  <Badge variant={t.subject === 'All Subjects' ? 'primary' : t.subject === 'Economy' ? 'warning' : 'neutral'} className="mt-1">
                    {t.subject}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{t.date}</td>
                <td className="px-4 py-3 text-right">
                  <span className="font-mono-nums font-semibold text-foreground">{t.score}</span>
                  <span className="text-muted-foreground text-xs">/{t.total}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span
                    className={`font-mono-nums font-semibold text-sm ${
                      t.percentile >= 70
                        ? 'text-green-600'
                        : t.percentile >= 50
                        ? 'text-amber-600' :'text-red-600'
                    }`}
                  >
                    {t.percentile}
                  </span>
                  <span className="text-muted-foreground text-xs">%ile</span>
                </td>
                <td className="px-4 py-3 text-right font-mono-nums text-sm text-foreground">
                  #{t.rank}
                  <span className="text-muted-foreground text-xs">/{t.batchSize}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                    <Clock size={11} />
                    {t.timeTaken}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  {t.trend === 'up' ? (
                    <TrendingUp size={15} className="text-green-500 mx-auto" />
                  ) : t.trend === 'down' ? (
                    <TrendingDown size={15} className="text-red-500 mx-auto" />
                  ) : (
                    <div className="w-3 h-0.5 bg-slate-300 mx-auto rounded" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}