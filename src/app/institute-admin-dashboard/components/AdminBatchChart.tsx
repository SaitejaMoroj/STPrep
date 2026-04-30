'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { ChartSkeleton } from '@/components/ui/LoadingSkeleton';

const BatchBarChartInner = dynamic(
  () => import('./BatchBarChartInner'),
  { ssr: false, loading: () => <ChartSkeleton height={280} /> }
);

export default function AdminBatchChart() {
  return <BatchBarChartInner />;
}