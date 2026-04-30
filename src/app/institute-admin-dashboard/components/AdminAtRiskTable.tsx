'use client';
import React, { useState } from 'react';
import Badge from '@/components/ui/Badge';
import {
  AlertTriangle,
  ChevronDown,
  Eye,
  MessageSquare,
  TrendingDown,
  Filter,
} from 'lucide-react';

interface AtRiskStudent {
  id: string;
  name: string;
  batch: string;
  examTarget: string;
  lastScore: number;
  avgScore: number;
  dropPercent: number;
  missedTests: number;
  lastActive: string;
  riskLevel: 'critical' | 'high' | 'medium';
  riskReason: string;
}

const atRiskStudents: AtRiskStudent[] = [
  {
    id: 'stu-031',
    name: 'Kavya Nair',
    batch: 'GATE-EC',
    examTarget: 'GATE ECE 2027',
    lastScore: 41,
    avgScore: 44.2,
    dropPercent: -18.4,
    missedTests: 5,
    lastActive: '6 days ago',
    riskLevel: 'critical',
    riskReason: 'Score dropped 18% · 5 missed tests',
  },
  {
    id: 'stu-018',
    name: 'Rohit Bansal',
    batch: 'NEET-B',
    examTarget: 'NEET UG 2026',
    lastScore: 48,
    avgScore: 55.1,
    dropPercent: -12.9,
    missedTests: 4,
    lastActive: '4 days ago',
    riskLevel: 'critical',
    riskReason: 'Consistent decline · Low Biology accuracy',
  },
  {
    id: 'stu-047',
    name: 'Sneha Pillai',
    batch: 'IAS-B',
    examTarget: 'UPSC CSE 2027',
    lastScore: 54,
    avgScore: 57.8,
    dropPercent: -6.2,
    missedTests: 3,
    lastActive: '3 days ago',
    riskLevel: 'high',
    riskReason: 'Economy weak area not improving',
  },
  {
    id: 'stu-052',
    name: 'Aman Verma',
    batch: 'CAT-Int',
    examTarget: 'CAT 2026',
    lastScore: 58,
    avgScore: 62.3,
    dropPercent: -7.0,
    missedTests: 2,
    lastActive: '2 days ago',
    riskLevel: 'high',
    riskReason: 'DILR accuracy below 40%',
  },
  {
    id: 'stu-009',
    name: 'Priyanka Joshi',
    batch: 'GATE-EC',
    examTarget: 'GATE ECE 2027',
    lastScore: 52,
    avgScore: 56.4,
    dropPercent: -7.8,
    missedTests: 3,
    lastActive: '5 days ago',
    riskLevel: 'high',
    riskReason: 'Signal Processing topic gap',
  },
  {
    id: 'stu-074',
    name: 'Deepak Rawat',
    batch: 'IAS-A',
    examTarget: 'UPSC CSE 2027',
    lastScore: 61,
    avgScore: 63.1,
    dropPercent: -3.3,
    missedTests: 1,
    lastActive: '1 day ago',
    riskLevel: 'medium',
    riskReason: 'Slightly below batch average',
  },
  {
    id: 'stu-088',
    name: 'Tanvi Mehrotra',
    batch: 'NEET-B',
    examTarget: 'NEET UG 2026',
    lastScore: 59,
    avgScore: 61.7,
    dropPercent: -4.4,
    missedTests: 2,
    lastActive: '2 days ago',
    riskLevel: 'medium',
    riskReason: 'Chemistry organic concepts weak',
  },
  {
    id: 'stu-103',
    name: 'Manish Tiwari',
    batch: 'IAS-C',
    examTarget: 'UPSC CSE 2027',
    lastScore: 63,
    avgScore: 65.2,
    dropPercent: -3.4,
    missedTests: 1,
    lastActive: 'Today',
    riskLevel: 'medium',
    riskReason: 'Current Affairs not practised',
  },
];

const riskBadge = (level: AtRiskStudent['riskLevel']) => {
  if (level === 'critical') return <Badge variant="danger" dot>Critical</Badge>;
  if (level === 'high') return <Badge variant="warning" dot>High</Badge>;
  return <Badge variant="neutral" dot>Medium</Badge>;
};

export default function AdminAtRiskTable() {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [filterLevel, setFilterLevel] = useState<'all' | AtRiskStudent['riskLevel']>('all');

  const filtered = filterLevel === 'all' ? atRiskStudents : atRiskStudents.filter((s) => s.riskLevel === filterLevel);

  return (
    <div className="card">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <AlertTriangle size={15} className="text-red-500" />
          <div>
            <h3 className="text-sm font-semibold text-foreground">At-Risk Students</h3>
            <p className="text-xs text-muted-foreground">Flagged for immediate intervention</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Filter size={13} className="text-muted-foreground" />
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value as typeof filterLevel)}
            className="text-xs border border-border rounded-lg px-2 py-1.5 bg-white text-foreground outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="all">All Risk Levels</option>
            <option value="critical">Critical only</option>
            <option value="high">High only</option>
            <option value="medium">Medium only</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-5 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Student</th>
              <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Batch</th>
              <th className="text-right px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Last Score</th>
              <th className="text-right px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Avg Score</th>
              <th className="text-right px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Drop</th>
              <th className="text-center px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Missed</th>
              <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Risk Level</th>
              <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Last Active</th>
              <th className="text-center px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr
                key={s.id}
                onMouseEnter={() => setHoveredRow(s.id)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`border-b border-border transition-colors ${
                  s.riskLevel === 'critical' ?'bg-red-50/50'
                    : hoveredRow === s.id
                    ? 'bg-muted/50' :''
                }`}
              >
                <td className="px-5 py-3">
                  <div>
                    <p className="font-semibold text-foreground text-sm">{s.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{s.riskReason}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="text-xs font-medium text-foreground">{s.batch}</p>
                    <p className="text-[10px] text-muted-foreground">{s.examTarget}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className={`font-mono-nums font-bold text-sm ${s.lastScore < 50 ? 'text-red-600' : 'text-amber-600'}`}>
                    {s.lastScore}%
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="font-mono-nums text-sm text-muted-foreground">{s.avgScore}%</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="flex items-center justify-end gap-1 text-xs font-semibold text-red-600">
                    <TrendingDown size={12} />
                    {s.dropPercent}%
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`font-mono-nums text-sm font-bold ${s.missedTests >= 4 ? 'text-red-600' : 'text-amber-600'}`}>
                    {s.missedTests}
                  </span>
                </td>
                <td className="px-4 py-3">{riskBadge(s.riskLevel)}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{s.lastActive}</td>
                <td className="px-4 py-3">
                  <div className={`flex items-center justify-center gap-1 transition-opacity ${hoveredRow === s.id ? 'opacity-100' : 'opacity-0'}`}>
                    <button
                      title="View student profile"
                      className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                      <Eye size={13} />
                    </button>
                    <button
                      title="Send message to student"
                      className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                    >
                      <MessageSquare size={13} />
                    </button>
                    <button
                      title="More actions"
                      className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                      <ChevronDown size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-border flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{' '}
          <span className="font-semibold text-foreground">31</span> at-risk students
        </p>
        <button className="text-xs font-semibold text-primary hover:underline">
          View all at-risk students →
        </button>
      </div>
    </div>
  );
}