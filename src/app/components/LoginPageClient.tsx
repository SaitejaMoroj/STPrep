'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  Copy,
  Check,
  BookOpen,
  Brain,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';



type Role = 'admin' | 'teacher' | 'student' | 'parent';

interface LoginFormData {
  email: string;
  password: string;
  instituteCode?: string;
  rememberMe?: boolean;
}

interface DemoCredential {
  role: Role;
  label: string;
  email: string;
  password: string;
  redirectTo: string;
}

const demoCredentials: DemoCredential[] = [
  {
    role: 'admin',
    label: 'Institute Admin',
    email: 'admin@vidyamandir.edu.in',
    password: 'VidyaAdmin@2026',
    redirectTo: '/institute-admin-dashboard',
  },
  {
    role: 'teacher',
    label: 'Teacher / Mentor',
    email: 'priya.mentor@vidyamandir.edu.in',
    password: 'MentorPriya@2026',
    redirectTo: '/institute-admin-dashboard',
  },
  {
    role: 'student',
    label: 'Student',
    email: 'arjun.student@vidyamandir.edu.in',
    password: 'StudentArjun@2026',
    redirectTo: '/student-dashboard',
  },
  {
    role: 'parent',
    label: 'Parent',
    email: 'parent.sharma@gmail.com',
    password: 'ParentView@2026',
    redirectTo: '/student-dashboard',
  },
];

const roleBadgeVariant: Record<Role, 'primary' | 'accent' | 'success' | 'info'> = {
  admin: 'primary',
  teacher: 'accent',
  student: 'success',
  parent: 'info',
};

const features = [
  { icon: Brain, label: 'AI Doubt Solver', desc: 'Instant answers from study material' },
  { icon: Target, label: 'Weak Area Detection', desc: 'Personalised topic recommendations' },
  { icon: TrendingUp, label: 'Mock Test Analytics', desc: 'Deep performance insights' },
  { icon: Users, label: 'Batch Management', desc: 'Track entire cohorts at once' },
];

export default function LoginPageClient() {
  const [activeRole, setActiveRole] = useState<Role>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setLoginError('');
    setIsLoading(true);
    // BACKEND INTEGRATION: POST /api/auth/login with { email, password, role: activeRole, instituteCode }
    await new Promise((r) => setTimeout(r, 1200));

    const match = demoCredentials.find(
      (c) => c.email === data.email && c.password === data.password && c.role === activeRole
    );

    if (match) {
      router.push(match.redirectTo);
    } else {
      setLoginError('Invalid credentials — use the demo accounts below to sign in.');
    }
    setIsLoading(false);
  };

  const autofill = (cred: DemoCredential) => {
    setActiveRole(cred.role);
    setValue('email', cred.email);
    setValue('password', cred.password);
    if (cred.role !== 'admin') {
      setValue('instituteCode', 'VMC-2026-DELHI');
    }
    setLoginError('');
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(key);
    setTimeout(() => setCopiedField(null), 1500);
  };

  const roleLabels: Record<Role, string> = {
    admin: 'Admin',
    teacher: 'Teacher',
    student: 'Student',
    parent: 'Parent',
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel — brand */}
      <div className="hidden lg:flex flex-col w-[480px] xl:w-[540px] flex-shrink-0 bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#312E81] relative overflow-hidden p-10">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-32 right-8 w-48 h-48 bg-violet-400 rounded-full blur-3xl" />
        </div>

        {/* Logo */}
        <div className="relative flex items-center gap-3 mb-12">
          <div className="text-white font-bold text-xl">STPREP AI 🚀</div>
          <div>
            <span className="font-bold text-xl text-white tracking-tight">
              ExamEdge <span className="text-blue-300">AI</span>
            </span>
            <p className="text-xs text-blue-200 mt-0.5">Powered by Generative AI</p>
          </div>
        </div>

        {/* Headline */}
        <div className="relative flex-1">
          <h1 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight mb-4">
            India's Smartest <br />
            <span className="text-blue-300">Exam Coaching</span>
            <br /> Platform
          </h1>
          <p className="text-blue-100 text-sm leading-relaxed mb-10 max-w-xs">
            Trusted by 240+ coaching institutes for UPSC, GATE, CAT, and NEET preparation. AI-powered, data-driven, student-first.
          </p>

          {/* Feature list */}
          <div className="space-y-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={`feature-${f.label}`} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={18} className="text-blue-200" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{f.label}</p>
                    <p className="text-xs text-blue-200">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats strip */}
          <div className="mt-10 grid grid-cols-3 gap-3">
            {[
              { val: '2.4L+', label: 'Students' },
              { val: '240+', label: 'Institutes' },
              { val: '94%', label: 'Accuracy' },
            ].map((s) => (
              <div
                key={`stat-${s.label}`}
                className="bg-white/10 rounded-xl p-3 text-center border border-white/10"
              >
                <p className="text-lg font-bold text-white font-mono-nums">{s.val}</p>
                <p className="text-[10px] text-blue-200 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative mt-8">
          <p className="text-[10px] text-blue-300">
            © 2026 ExamEdge AI Technologies Pvt. Ltd. · Privacy Policy · Terms of Service
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 overflow-y-auto scrollbar-thin">
        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-2 mb-8">
          <div className="font-bold text-lg">STPREP AI 🚀</div>
          <span className="font-bold text-lg text-foreground">
            ExamEdge <span className="text-primary">AI</span>
          </span>
        </div>

        <div className="w-full max-w-sm xl:max-w-md">
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-foreground">Sign in to your account</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Select your role and enter your credentials
            </p>
          </div>

          {/* Role tabs */}
          <div className="grid grid-cols-4 gap-1 bg-muted p-1 rounded-xl mb-6">
            {(Object.keys(roleLabels) as Role[]).map((role) => (
              <button
                key={`role-tab-${role}`}
                type="button"
                onClick={() => {
                  setActiveRole(role);
                  setLoginError('');
                }}
                className={`py-2 px-1 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  activeRole === role
                    ? 'bg-card shadow-card text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {roleLabels[role]}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Institute code (non-admin) */}
            {activeRole !== 'admin' && (
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Institute Code <span className="text-danger">*</span>
                </label>
                <p className="text-[11px] text-muted-foreground mb-1.5">
                  Provided by your institute during enrollment
                </p>
                <input
                  type="text"
                  placeholder="e.g. VMC-2026-DELHI"
                  className="input-field font-mono text-sm"
                  {...register('instituteCode', {
                    required:
                      activeRole !== 'admin' ?'Institute code is required'
                        : false,
                  })}
                />
                {errors.instituteCode && (
                  <p className="text-xs text-danger mt-1">
                    {errors.instituteCode.message}
                  </p>
                )}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Email Address <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                placeholder="you@institute.edu.in"
                className="input-field"
                autoComplete="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email address',
                  },
                })}
              />
              {errors.email && (
                <p className="text-xs text-danger mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-foreground">
                  Password <span className="text-danger">*</span>
                </label>
                <button
                  type="button"
                  className="text-[11px] text-primary font-medium hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="input-field pr-10"
                  autoComplete="current-password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Minimum 6 characters' },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-danger mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember-me"
                className="w-3.5 h-3.5 rounded border-input accent-primary cursor-pointer"
                {...register('rememberMe')}
              />
              <label
                htmlFor="remember-me"
                className="text-xs text-muted-foreground cursor-pointer select-none"
              >
                Keep me signed in for 30 days
              </label>
            </div>

            {/* Error */}
            {loginError && (
              <div className="bg-danger-soft border border-red-200 rounded-lg px-3 py-2.5 flex items-start gap-2">
                <Zap size={14} className="text-danger flex-shrink-0 mt-0.5" />
                <p className="text-xs text-danger">{loginError}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-2.5"
            >
              {isLoading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign in as {roleLabels[activeRole]}</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <hr className="flex-1 border-border" />
            <span className="text-[11px] text-muted-foreground font-medium">
              Demo Accounts
            </span>
            <hr className="flex-1 border-border" />
          </div>

          {/* Demo credentials table */}
          <div className="border border-border rounded-xl overflow-hidden">
            <div className="bg-muted px-3 py-2 border-b border-border flex items-center gap-2">
              <BookOpen size={13} className="text-muted-foreground" />
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                Click to autofill credentials
              </p>
            </div>
            <div className="divide-y divide-border">
              {demoCredentials.map((cred) => (
                <div
                  key={`demo-${cred.role}`}
                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-muted/50 transition-colors"
                >
                  <span className="px-2 py-1 text-xs bg-blue-500 text-white rounded">
  {cred.label}
</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-mono text-foreground truncate">{cred.email}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(cred.email, `email-${cred.role}`)}
                      className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      title="Copy email"
                    >
                      {copiedField === `email-${cred.role}` ? (
                        <Check size={12} className="text-success" />
                      ) : (
                        <Copy size={12} />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => autofill(cred)}
                      className="text-[10px] font-semibold text-primary hover:text-blue-700 bg-primary/5 hover:bg-primary/10 px-2 py-1 rounded transition-colors"
                    >
                      Use
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sign up link */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            New institute?{' '}
            <Link href="/sign-up-login-screen" className="text-primary font-semibold hover:underline">
              Request a demo
            </Link>{' '}
            or contact your institute admin.
          </p>
        </div>
      </div>
    </div>
  );
}