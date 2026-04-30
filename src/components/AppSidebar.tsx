'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardList,
  BarChart3,
  MessageSquare,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  FileText,
  Target,
  Layers,
  UserCheck,
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  group?: string;
}

interface AppSidebarProps {
  role: 'admin' | 'teacher' | 'student' | 'parent';
}

const adminNav: NavItem[] = [
  { id: 'nav-dashboard', label: 'Dashboard', href: '/institute-admin-dashboard', icon: LayoutDashboard, group: 'Overview' },
  { id: 'nav-students', label: 'Students', href: '/students', icon: Users, badge: 3, group: 'Management' },
  { id: 'nav-batches', label: 'Batches', href: '/batches', icon: Layers, group: 'Management' },
  { id: 'nav-material', label: 'Study Material', href: '/material', icon: BookOpen, group: 'Content' },
  { id: 'nav-qbank', label: 'Question Bank', href: '/question-bank', icon: FileText, group: 'Content' },
  { id: 'nav-tests', label: 'Mock Tests', href: '/mock-tests', icon: ClipboardList, badge: 2, group: 'Assessments' },
  { id: 'nav-reports', label: 'Reports', href: '/reports', icon: BarChart3, group: 'Analytics' },
  { id: 'nav-parents', label: 'Parent Reports', href: '/parent-reports', icon: UserCheck, group: 'Analytics' },
  { id: 'nav-doubts', label: 'AI Doubts', href: '/doubts', icon: MessageSquare, badge: 8, group: 'AI Tools' },
  { id: 'nav-settings', label: 'Settings', href: '/settings', icon: Settings, group: 'System' },
];

const studentNav: NavItem[] = [
  { id: 'nav-dashboard', label: 'Dashboard', href: '/student-dashboard', icon: LayoutDashboard, group: 'Overview' },
  { id: 'nav-doubts', label: 'AI Doubt Solver', href: '/doubts', icon: MessageSquare, group: 'Learning' },
  { id: 'nav-tests', label: 'Mock Tests', href: '/mock-tests', icon: ClipboardList, badge: 1, group: 'Assessments' },
  { id: 'nav-material', label: 'Study Material', href: '/material', icon: BookOpen, group: 'Learning' },
  { id: 'nav-performance', label: 'My Performance', href: '/performance', icon: BarChart3, group: 'Analytics' },
  { id: 'nav-target', label: 'Exam Target', href: '/target', icon: Target, group: 'Goals' },
  { id: 'nav-notifications', label: 'Notifications', href: '/notifications', icon: Bell, badge: 4, group: 'System' },
];

const navsByRole: Record<string, NavItem[]> = {
  admin: adminNav,
  teacher: adminNav,
  student: studentNav,
  parent: studentNav,
};

export default function AppSidebar({ role }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const navItems = navsByRole[role] || adminNav;

  const groups = Array.from(new Set(navItems.map((n) => n.group)));

  return (
    <aside
      className={`hidden lg:flex flex-col bg-card border-r border-border transition-all duration-300 ease-in-out flex-shrink-0 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
      style={{ minHeight: '100vh' }}
    >
      {/* Logo */}
      <div className={`flex items-center border-b border-border h-16 px-3 ${collapsed ? 'justify-center' : 'gap-2 px-4'}`}>
        <AppLogo size={32} />
        {!collapsed && (
          <span className="font-bold text-base text-foreground tracking-tight">
            ExamEdge <span className="text-primary">AI</span>
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin px-2 space-y-1">
        {groups.map((group) => (
          <div key={`group-${group}`} className="mb-2">
            {!collapsed && (
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-3 py-1.5">
                {group}
              </p>
            )}
            {navItems
              .filter((n) => n.group === group)
              .map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    className={`sidebar-item ${
                      isActive
                        ? 'sidebar-item-active' :'sidebar-item-inactive'
                    } ${collapsed ? 'justify-center px-2' : ''}`}
                  >
                    <Icon size={18} className="flex-shrink-0" />
                    {!collapsed && (
                      <span className="flex-1 truncate">{item.label}</span>
                    )}
                    {!collapsed && item.badge !== undefined && (
                      <span className="ml-auto bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                        {item.badge}
                      </span>
                    )}
                    {collapsed && item.badge !== undefined && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                    )}
                  </Link>
                );
              })}
          </div>
        ))}
      </nav>

      {/* Role badge + collapse */}
      <div className="border-t border-border p-3 space-y-2">
        {!collapsed && (
          <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-muted">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
              <GraduationCap size={14} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">
                {role === 'admin' ? 'Institute Admin' : role === 'student' ? 'Student' : role === 'teacher' ? 'Teacher' : 'Parent'}
              </p>
              <p className="text-[10px] text-muted-foreground">ExamEdge AI</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
}