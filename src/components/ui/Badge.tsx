import React from 'react';

type BadgeVariant =
  | 'success' |'warning' |'danger' |'info' |'primary' |'accent' |'neutral';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-green-50 text-green-700 border border-green-200',
  warning: 'bg-amber-50 text-amber-700 border border-amber-200',
  danger: 'bg-red-50 text-red-700 border border-red-200',
  info: 'bg-sky-50 text-sky-700 border border-sky-200',
  primary: 'bg-blue-50 text-blue-700 border border-blue-200',
  accent: 'bg-violet-50 text-violet-700 border border-violet-200',
  neutral: 'bg-slate-100 text-slate-600 border border-slate-200',
};

const dotStyles: Record<BadgeVariant, string> = {
  success: 'bg-green-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
  info: 'bg-sky-500',
  primary: 'bg-blue-500',
  accent: 'bg-violet-500',
  neutral: 'bg-slate-400',
};

export default function Badge({
  variant = 'neutral',
  children,
  className = '',
  dot = false,
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${variantStyles[variant]} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotStyles[variant]}`}
        />
      )}
      {children}
    </span>
  );
}