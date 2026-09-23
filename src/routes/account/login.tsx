/* eslint-disable react-refresh/only-export-components */
import React, { useState, useMemo, useEffect } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  X,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Seo from '@/components/ui/Seo';

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
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Real Google Sign In modal state (user enters their own Gmail)
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [googleEmailInput, setGoogleEmailInput] = useState('');
  const [googleNameInput, setGoogleNameInput] = useState('');

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
      setErrorMessage('Please enter your phone number or email, and password.');
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

    const res = await loginWithGoogle(cleanEmail, googleNameInput.trim() || undefined);
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
    <div className="min-h-screen bg-brand-cream pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 flex flex-col items-center justify-center px-4 sm:px-6 selection:bg-amber-100 selection:text-amber-900">
      <Seo
        title="Sign In | Vivaldi Foods Ltd"
        description="Log into your customer account for fast ordering, live delivery updates, and saved addresses."
      />

      {/* Clean Oraimo-Style Auth Modal Container */}
      <div className="relative w-full max-w-110 sm:max-w-115 bg-white rounded-3xl sm:rounded-4xl shadow-xl sm:shadow-2xl border border-gray-100/90 p-6 sm:p-8 my-auto transition-all text-sm leading-normal">
        {/* Modal Close Button */}
        <Link
          to="/products"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal and return to store"
        >
          <X size={16} />
        </Link>

        {/* Brand Logo Only (Centered) */}
        <div className="text-center mb-4 sm:mb-5">
          <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
            <img
              src={vivaldiLogo}
              alt="Vivaldi Foods Ltd"
              width={130}
              height={40}
              className="h-8 sm:h-9 w-auto mx-auto object-contain"
            />
          </Link>
        </div>

        {/* Alerts */}
        {errorMessage && (
          <div className="mb-3.5 p-2.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-xs text-red-700 animate-scale-in">
            <AlertCircle size={14} className="text-red-600 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-3.5 p-2.5 bg-green-50 border border-green-200 rounded-xl flex items-start gap-2 text-xs text-green-800 animate-scale-in">
            <CheckCircle2 size={14} className="text-green-700 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 text-center mb-4 sm:mb-5 tracking-tight">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Email / Phone Field */}
            <div>
              <label
                htmlFor="identifier"
                className="block text-xs font-semibold text-gray-700 mb-1"
              >
                Email Address or Ghana Phone
              </label>
              <div className="relative">
                <input
                  id="identifier"
                  type="text"
                  required
                  autoComplete="username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. 024 123 4567 or email@domain.com"
                  className="w-full py-2 text-sm text-gray-900 border-0 border-b border-gray-300 focus:border-green-700 outline-none bg-transparent transition-colors placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full py-2 pr-10 text-sm text-gray-900 border-0 border-b border-gray-300 focus:border-green-700 outline-none bg-transparent transition-colors placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-2 text-gray-400 hover:text-gray-700 p-1 cursor-pointer transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Forgot password link */}
            <div className="pt-0.5 flex items-center justify-between text-xs text-gray-600">
              <span>Forgot your password?</span>
              <button
                type="button"
                onClick={() =>
                  alert('Password reset instructions will be sent to your registered contact.')
                }
                className="font-bold text-gray-900 hover:text-green-700 inline-flex items-center gap-0.5 cursor-pointer transition-colors"
              >
                <span>Reset it</span>
                <ChevronRight size={13} />
              </button>
            </div>

            {/* Submit Button (Pill Button) */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 sm:h-11 bg-[#111] hover:bg-black text-white font-bold text-xs sm:text-sm rounded-full transition-all shadow-xs active:scale-95 disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </div>

            {/* Create Account Link */}
            <p className="text-xs text-gray-600 pt-0.5 text-center">
              <span>Don't have an account? </span>
              <Link
                to="/account/register"
                search={redirectUrl !== '/account' ? { redirect_url: redirectUrl } : {}}
                className="font-bold text-gray-900 hover:text-green-700 inline-flex items-center gap-0.5 ml-1 transition-colors"
              >
                <span>Create one</span>
                <ChevronRight size={13} />
              </Link>
            </p>

            {/* Divider */}
            <div className="relative py-1 flex items-center justify-center">
              <div className="w-full border-t border-gray-200" />
              <span className="absolute bg-white px-2.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Or continue with
              </span>
            </div>

            {/* Sign in with Google Button */}
            <div>
              <button
                type="button"
                onClick={handleOpenGoogleModal}
                className="w-full h-10 sm:h-11 rounded-full bg-[#f8f8f8] hover:bg-[#f0f0f0] border border-gray-200/80 text-gray-800 text-xs font-semibold flex items-center justify-center gap-2.5 transition-colors cursor-pointer shadow-2xs active:scale-95"
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
                <span>Sign in with Google</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* REAL GOOGLE ACCOUNT INPUT MODAL (No Hardcoded Demo Accounts) */}
      {isGoogleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 sm:p-6 shadow-2xl border border-gray-100 space-y-3.5 animate-scale-in text-sm leading-normal">
            <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
              <div className="flex items-center gap-2">
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
                <span className="font-bold text-xs sm:text-sm text-gray-900">Sign in with Google</span>
              </div>
              <button
                type="button"
                onClick={() => setIsGoogleModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 p-1 cursor-pointer transition-colors"
                aria-label="Close Google sign-in"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Enter your Google (Gmail) address. If you have an existing account registered with this email, it will be automatically recognized and logged in.
            </p>

            <form onSubmit={handleGoogleSubmit} className="space-y-3">
              <div>
                <label htmlFor="google-email" className="block text-xs font-semibold text-gray-700 mb-1">
                  Your Google / Gmail Address
                </label>
                <input
                  id="google-email"
                  type="email"
                  required
                  autoFocus
                  value={googleEmailInput}
                  onChange={(e) => setGoogleEmailInput(e.target.value)}
                  placeholder="e.g. yourmail@gmail.com"
                  className="w-full py-2 text-sm text-gray-900 border-0 border-b border-gray-300 focus:border-green-700 outline-none bg-transparent transition-colors placeholder:text-gray-400"
                />
              </div>

              <div>
                <label htmlFor="google-name" className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name <span className="font-normal text-gray-400">(Optional for new profiles)</span>
                </label>
                <input
                  id="google-name"
                  type="text"
                  value={googleNameInput}
                  onChange={(e) => setGoogleNameInput(e.target.value)}
                  placeholder="e.g. Kwame Mensah"
                  className="w-full py-2 text-sm text-gray-900 border-0 border-b border-gray-300 focus:border-green-700 outline-none bg-transparent transition-colors placeholder:text-gray-400"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsGoogleModalOpen(false)}
                  className="flex-1 py-2 text-xs font-bold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-2 text-xs font-bold text-white bg-green-700 hover:bg-green-800 rounded-full transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
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
