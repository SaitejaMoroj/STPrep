'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { ChartSkeleton } from '@/components/ui/LoadingSkeleton';

const ScoreTrendInner = dynamic(
  () => import('./ScoreTrendInner'),
  { ssr: false, loading: () => <ChartSkeleton height={280} /> }
);

export default function AdminScoreTrendChart() {
  return <ScoreTrendInner />;
}