import React from 'react';
import AppLayout from '@/components/AppLayout';
import StudentMetricsBento from './components/StudentMetricsBento';
import StudentAIChatPanel from './components/StudentAIChatPanel';
import StudentSubjectRadar from './components/StudentSubjectRadar';
import StudentRecentTests from './components/StudentRecentTests';
import StudentWeakAreaCards from './components/StudentWeakAreaCards';
import StudentUpcomingTests from './components/StudentUpcomingTests';

export default function StudentDashboardPage() {
  return (
    <AppLayout
      role="student"
      userName="Arjun Mehta"
      instituteName="Vidyamandir Classes"
      notificationCount={4}
    >
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Good afternoon, Arjun 👋</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              UPSC CSE 2027 · Batch: IAS Foundation A · Last active 2 hours ago
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
            <div className="text-center">
              <p className="text-xs text-amber-700 font-medium">Exam Target</p>
              <p className="text-lg font-bold text-amber-800 font-mono-nums">247</p>
              <p className="text-[10px] text-amber-600">days remaining</p>
            </div>
          </div>
        </div>

        {/* KPI Bento Grid */}
        <StudentMetricsBento />

        {/* Middle row: AI Chat + Subject Performance */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          <div className="xl:col-span-3">
            <StudentAIChatPanel />
          </div>
          <div className="xl:col-span-2">
            <StudentSubjectRadar />
          </div>
        </div>

        {/* Bottom row: Weak Areas + Upcoming Tests + Recent Mock Tests */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StudentRecentTests />
          </div>
          <div>
            <StudentUpcomingTests />
          </div>
        </div>

        {/* Weak areas */}
        <StudentWeakAreaCards />
      </div>
    </AppLayout>
  );
}