import React from 'react';
import AppSidebar from './AppSidebar';
import AppTopbar from './AppTopbar';

interface AppLayoutProps {
  children: React.ReactNode;
  role?: 'admin' | 'teacher' | 'student' | 'parent';
  userName?: string;
  instituteName?: string;
  notificationCount?: number;
}

export default function AppLayout({
  children,
  role = 'admin',
  userName = 'Rajiv Sharma',
  instituteName = 'Vidyamandir Classes',
  notificationCount = 3,
}: AppLayoutProps) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AppSidebar role={role} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AppTopbar
          role={role}
          userName={userName}
          instituteName={instituteName}
          notificationCount={notificationCount}
        />
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-8 2xl:px-10 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}