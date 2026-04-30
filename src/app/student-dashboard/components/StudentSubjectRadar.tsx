'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { ChartSkeleton } from '@/components/ui/LoadingSkeleton';

const SubjectRadarChart = dynamic(
  () => import('./SubjectRadarChartInner'),
  { ssr: false, loading: () => <ChartSkeleton height={320} /> }
);

export default function StudentSubjectRadar() {
  return <SubjectRadarChart />;
}