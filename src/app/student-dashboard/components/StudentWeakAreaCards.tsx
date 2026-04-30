import React from 'react';
import Badge from '@/components/ui/Badge';
import { AlertTriangle, ChevronRight, BookOpen, Target } from 'lucide-react';

const weakAreas = [
  {
    id: 'weak-economy',
    subject: 'Economy & Finance',
    score: 52,
    target: 70,
    gap: -18,
    topics: ['Monetary Policy', 'Balance of Payments', 'Budget & Fiscal Policy'],
    questionsAttempted: 84,
    incorrectCount: 40,
    lastAttempted: '25 Apr 2026',
    severity: 'high',
  },
  {
    id: 'weak-environment',
    subject: 'Environment & Ecology',
    score: 58,
    target: 70,
    gap: -12,
    topics: ['Biodiversity Hotspots', 'Climate Conventions', 'Protected Areas'],
    questionsAttempted: 62,
    incorrectCount: 26,
    lastAttempted: '23 Apr 2026',
    severity: 'medium',
  },
  {
    id: 'weak-history',
    subject: 'Modern Indian History',
    score: 61,
    target: 75,
    gap: -14,
    topics: ['Freedom Movement 1920–47', 'Social Reforms', 'Tribal Movements'],
    questionsAttempted: 108,
    incorrectCount: 42,
    lastAttempted: '27 Apr 2026',
    severity: 'medium',
  },
];

export default function StudentWeakAreaCards() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle size={16} className="text-amber-500" />
          <h3 className="text-sm font-semibold text-foreground">Weak Areas — Prioritised for You</h3>
        </div>
        <button className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">
          View full analysis <ChevronRight size={12} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {weakAreas?.map((w) => (
          <div
            key={w?.id}
            className={`card p-5 border-l-4 ${
              w?.severity === 'high' ? 'border-l-red-500' : 'border-l-amber-400'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-semibold text-foreground">{w?.subject}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono-nums text-2xl font-bold text-red-600">{w?.score}%</span>
                  <span className="text-xs text-muted-foreground">vs {w?.target}% target</span>
                </div>
              </div>
              <Badge variant={w?.severity === 'high' ? 'danger' : 'warning'}>
                {w?.severity === 'high' ? 'High Priority' : 'Medium'}
              </Badge>
            </div>

            {/* Gap bar */}
            <div className="mb-3">
              <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                <span>Score gap: {w?.gap}%</span>
                <span>{w?.incorrectCount}/{w?.questionsAttempted} incorrect</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="h-full rounded-full bg-red-400"
                  style={{ width: `${w?.score}%` }}
                />
              </div>
            </div>

            {/* Weak topics */}
            <div className="mb-4">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                Focus Topics
              </p>
              <div className="flex flex-wrap gap-1">
                {w?.topics?.map((t) => (
                  <span
                    key={`topic-${w?.id}-${t}`}
                    className="text-[10px] bg-muted border border-border rounded px-1.5 py-0.5 text-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-primary bg-primary/5 hover:bg-primary/10 rounded-lg py-2 transition-colors">
                <BookOpen size={12} />
                Study Notes
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-primary hover:opacity-90 rounded-lg py-2 transition-colors active:scale-95">
                <Target size={12} />
                Practice MCQs
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}