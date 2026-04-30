'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Badge from '@/components/ui/Badge';
import {
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Settings,
  User,
} from 'lucide-react';

interface AppTopbarProps {
  role: 'admin' | 'teacher' | 'student' | 'parent';
  userName: string;
  instituteName?: string;
  notificationCount?: number;
}

export default function AppTopbar({
  role,
  userName,
  instituteName = 'Vidyamandir Classes',
  notificationCount = 3,
}: AppTopbarProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const roleLabel =
    role === 'admin' ?'Institute Admin'
      : role === 'teacher' ?'Mentor'
      : role === 'student' ?'Student' :'Parent';

  return (
    <header className="h-16 bg-card border-b border-border flex items-center px-4 lg:px-6 gap-4 sticky top-0 z-40">
      {/* Mobile logo */}
      <div className="flex lg:hidden items-center gap-2">
        <AppLogo size={28} />
        <span className="font-bold text-sm text-foreground">
          ExamEdge <span className="text-primary">AI</span>
        </span>
      </div>

      {/* Search */}
      <div className="hidden md:flex flex-1 max-w-xs items-center gap-2 bg-muted rounded-lg px-3 py-2 border border-border">
        <Search size={14} className="text-muted-foreground flex-shrink-0" />
        <input
          type="text"
          placeholder="Search students, tests, topics..."
          className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
        />
        <kbd className="hidden lg:inline text-[10px] font-mono text-muted-foreground bg-white border border-border rounded px-1">
          ⌘K
        </kbd>
      </div>

      <div className="flex-1 lg:flex-none" />

      {/* Institute name */}
      <div className="hidden lg:flex items-center gap-2 border border-border rounded-lg px-3 py-1.5">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-xs font-medium text-foreground">{instituteName}</span>
      </div>

      {/* Notifications */}
      <button className="relative p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
        <Bell size={18} />
        {notificationCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-danger text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            {notificationCount}
          </span>
        )}
      </button>

      {/* Profile dropdown */}
      <div className="relative">
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-semibold text-foreground leading-tight">{userName}</p>
            <p className="text-[10px] text-muted-foreground">{roleLabel}</p>
          </div>
          <ChevronDown size={14} className="hidden md:block text-muted-foreground" />
        </button>

        {profileOpen && (
          <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-xl shadow-elevated z-50 py-1 animate-slide-up">
            <div className="px-3 py-2 border-b border-border">
              <p className="text-xs font-semibold text-foreground">{userName}</p>
              <Badge variant="primary" className="mt-0.5">{roleLabel}</Badge>
            </div>
            <Link href="/settings" className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors">
              <Settings size={14} /> Settings
            </Link>
            <Link href="/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors">
              <User size={14} /> My Profile
            </Link>
            <hr className="border-border my-1" />
            <Link href="/" className="flex items-center gap-2 px-3 py-2 text-sm text-danger hover:bg-red-50 transition-colors">
              <LogOut size={14} /> Sign Out
            </Link>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      <button
        className="lg:hidden p-2 rounded-lg text-muted-foreground hover:bg-muted"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>
    </header>
  );
}