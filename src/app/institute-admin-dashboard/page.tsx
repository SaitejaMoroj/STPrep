import React from 'react';
import AppLayout from '@/components/AppLayout';
import AdminMetricsBento from './components/AdminMetricsBento';
import AdminBatchChart from './components/AdminBatchChart';
import AdminAtRiskTable from './components/AdminAtRiskTable';
import AdminContentCoverage from './components/AdminContentCoverage';
import AdminActivityFeed from './components/AdminActivityFeed';
import AdminScoreTrendChart from './components/AdminScoreTrendChart';

export default function InstituteAdminDashboardPage() {
  return (
    <AppLayout
      role="admin"
      userName="Rajiv Sharma"
      instituteName="Vidyamandir Classes"
      notificationCount={6}
    >
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Institute Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Vidyamandir Classes · UPSC / GATE / CAT · Last synced 4 min ago
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select className="input-field py-2 text-sm w-auto pr-8">
              <option>All Batches</option>
              <option>IAS Foundation A</option>
              <option>IAS Foundation B</option>
              <option>GATE CSE 2027</option>
              <option>CAT Intensive 2026</option>
            </select>
            <button className="btn-primary flex items-center gap-2 text-sm py-2">
              Generate Reports
            </button>
          </div>
        </div>

        {/* KPI Bento Grid */}
        <AdminMetricsBento />

        {/* Charts row */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          <div className="xl:col-span-3">
            <AdminBatchChart />
          </div>
          <div className="xl:col-span-2">
            <AdminScoreTrendChart />
          </div>
        </div>

        {/* At-risk table + Content Coverage + Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <AdminAtRiskTable />
          </div>
          <div className="space-y-6">
            <AdminContentCoverage />
            <AdminActivityFeed />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}