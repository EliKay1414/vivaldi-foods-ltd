/* eslint-disable react-refresh/only-export-components */
import React, { useState, useMemo, useEffect } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  CheckCircle2,
  X,
  Mail,
  Lock,
  Phone,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Seo from '@/components/ui/Seo';
import heroHoney from '@/assets/Hero/hero-honey.webp';

const vivaldiLogo = '/Vivaldi-logo.webp';

export interface AccountLoginSearch {
  redirect_url?: string;
}

export const Route = createFileRoute('/account/login')({
  validateSearch: (search: Record<string, unknown>): AccountLoginSearch => ({
    redirect_url: typeof search.redirect_url === 'string' ? search.redirect_url : undefined,
  }),
  component: LoginPage,
});

function LoginPage() {
  const {
    login,
    loginWithGoogle,
    isAuthenticated,
    currentUser,
    isLoading,
  } = useAuth();

  const redirectUrl = useMemo(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('redirect_url') || '/account';
    } catch {
      return '/account';
    }
  }, []);

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Google Sign In modal state
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [googleEmailInput, setGoogleEmailInput] = useState('');

  // If already authenticated, redirect
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      window.location.href = redirectUrl;
    }
  }, [isAuthenticated, currentUser, redirectUrl]);

  const handleOpenGoogleModal = () => {
    if (identifier.includes('@') && !googleEmailInput) {
      setGoogleEmailInput(identifier);
    }
    setIsGoogleModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!identifier.trim() || !password.trim()) {
      setErrorMessage('Please enter your phone number or email, and your password.');
      return;
    }

    const res = await login(identifier, password);
    if (!res.success) {
      setErrorMessage(res.message);
    } else {
      setSuccessMessage(res.message);
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 400);
    }
  };

  const handleGoogleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const cleanEmail = googleEmailInput.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMessage('Please enter a valid Google / Gmail address.');
      return;
    }

    setIsGoogleModalOpen(false);

    const res = await loginWithGoogle(cleanEmail);
    if (!res.success) {
      setErrorMessage(res.message);
    } else {
      setSuccessMessage(res.message);
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 400);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 selection:bg-amber-100 selection:text-amber-900">
      <Seo
        title="Sign In | Vivaldi Foods Ltd"
        description="Sign in to your Vivaldi customer account to manage your orders and track deliveries."
      />

      {/* Landscape Master Auth Card */}
      <div className="w-full max-w-5xl xl:max-w-6xl bg-white rounded-3xl sm:rounded-4xl shadow-2xl shadow-green-950/10 border border-gray-100/90 overflow-hidden my-auto grid grid-cols-1 lg:grid-cols-12 min-h-145">
        {/* Left Side: Brand Showcase Stage (Bold Logo Centered, Clean & Matured) */}
        <div className="lg:col-span-5 relative bg-[#0e271a] text-white p-8 sm:p-10 lg:p-12 flex flex-col items-center justify-center text-center overflow-hidden">
          {/* Subtle Ambient Background Texture */}
          <div className="absolute inset-0 opacity-20 mix-blend-luminosity pointer-events-none">
            <img
              src={heroHoney}
              alt="Vivaldi Foods"
              className="w-full h-full object-cover object-center filter saturate-150"
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-[#091b12] via-transparent to-[#091b12]/80 pointer-events-none" />

          {/* Centered Bold Brand Presentation */}
          <div className="relative z-10 space-y-6 max-w-sm">
            <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
              <img
                src={vivaldiLogo}
                alt="Vivaldi Foods Ltd"
                className="h-12 sm:h-14 md:h-16 w-auto mx-auto object-contain brightness-0 invert filter drop-shadow-md"
              />
            </Link>

            <div className="w-12 h-0.5 bg-amber-400/40 mx-auto rounded-full" />

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Customer Portal
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Sign in to manage your orders, track doorstep deliveries, and view your saved preferences.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Clean Modern Form Stage */}
        <div className="lg:col-span-7 bg-white p-7 sm:p-10 lg:p-12 flex flex-col justify-between">
          <div className="max-w-md w-full mx-auto space-y-6">
            {/* Top Form Header */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                  Sign In
                </h1>
                <Link
                  to="/products"
                  className="text-xs font-semibold text-gray-500 hover:text-green-800 transition-colors"
                >
                  Return to Store
                </Link>
              </div>
              <p className="text-xs sm:text-sm text-gray-500">
                Welcome back. Please enter your credentials to access your account.
              </p>
            </div>

            {/* Notification Banners */}
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700 animate-scale-in">
                <AlertCircle size={15} className="text-red-600 shrink-0 mt-0.5" />
                <span className="font-medium">{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-xl flex items-start gap-2.5 text-xs text-green-800 animate-scale-in">
                <CheckCircle2 size={15} className="text-green-700 shrink-0 mt-0.5" />
                <span className="font-medium">{successMessage}</span>
              </div>
            )}

            {/* Google Social Login */}
            <div>
              <button
                type="button"
                onClick={handleOpenGoogleModal}
                className="w-full h-11 px-4 rounded-xl border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50/80 text-gray-700 font-semibold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all shadow-2xs hover:shadow-xs active:scale-[0.99] cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

            {/* Symmetrical Clean Divider */}
            <div className="relative flex items-center justify-center">
              <div className="w-full border-t border-gray-200" />
              <span className="absolute bg-white px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                Or sign in with email or phone
              </span>
            </div>

            {/* Standard Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Identifier Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="identifier"
                  className="block text-xs font-bold text-gray-700"
                >
                  Email Address or Ghana Phone
                </label>
                <div className="relative rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white focus-within:bg-white focus-within:border-green-700 focus-within:ring-3 focus-within:ring-green-700/10 transition-all">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    {identifier.includes('@') ? <Mail size={16} /> : <Phone size={16} />}
                  </div>
                  <input
                    id="identifier"
                    type="text"
                    required
                    autoComplete="username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="024 123 4567 or email@domain.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-xs font-bold text-gray-700"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      alert('Password reset instructions will be sent to your registered email or phone.')
                    }
                    className="text-xs font-semibold text-green-700 hover:text-green-800 hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white focus-within:bg-white focus-within:border-green-700 focus-within:ring-3 focus-within:ring-green-700/10 transition-all">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Lock size={16} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center gap-2 pt-0.5">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-green-700 border-gray-300 focus:ring-green-600 cursor-pointer accent-green-700"
                />
                <label htmlFor="remember" className="text-xs text-gray-600 font-medium cursor-pointer select-none">
                  Remember me on this browser
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 bg-green-800 hover:bg-green-900 active:bg-green-950 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-green-900/15 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Account</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Create Account Switch Link */}
            <div className="pt-2 text-center text-xs text-gray-600">
              <span>Don't have an account yet? </span>
              <Link
                to="/account/register"
                search={redirectUrl !== '/account' ? { redirect_url: redirectUrl } : {}}
                className="font-bold text-green-800 hover:text-green-950 hover:underline transition-colors"
              >
                Create an account
              </Link>
            </div>
          </div>

          {/* Bottom Security Trust Notice */}
          <div className="pt-8 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px] text-gray-400">
            <ShieldCheck size={13} className="text-green-700" />
            <span>256-Bit SSL Encrypted • Your account information is strictly protected</span>
          </div>
        </div>
      </div>

      {/* CLEAN GOOGLE ACCOUNT INPUT MODAL (No Demo Fields) */}
      {isGoogleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-gray-100 space-y-4 animate-scale-in text-sm leading-normal">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="font-bold text-base text-gray-900">Sign in with Google</span>
              </div>
              <button
                type="button"
                onClick={() => setIsGoogleModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Close Google sign-in"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Enter your Google (Gmail) address to continue with your Vivaldi account.
            </p>

            <form onSubmit={handleGoogleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="google-email" className="block text-xs font-bold text-gray-700">
                  Your Google / Gmail Address
                </label>
                <div className="relative rounded-xl border border-gray-200 bg-gray-50 focus-within:bg-white focus-within:border-green-700 focus-within:ring-2 focus-within:ring-green-700/10 transition-all">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Mail size={15} />
                  </div>
                  <input
                    id="google-email"
                    type="email"
                    required
                    autoFocus
                    value={googleEmailInput}
                    onChange={(e) => setGoogleEmailInput(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsGoogleModalOpen(false)}
                  className="flex-1 py-2.5 text-xs font-bold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-2.5 text-xs font-bold text-white bg-green-800 hover:bg-green-900 rounded-xl transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <span>Continue with Google</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
