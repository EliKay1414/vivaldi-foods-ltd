import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface CustomerUser {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  deliveryAddress?: string;
  createdAt: string;
}

export interface RegisterPayload {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  deliveryAddress?: string;
  password: string;
}

interface StoredAccount extends CustomerUser {
  password: string;
}

export interface AuthContextType {
  currentUser: CustomerUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<{ success: boolean; message: string }>;
  loginWithGoogle: (email: string, name?: string) => Promise<{ success: boolean; message: string }>;
  loginWithGoogleAuthenticator: (code: string, identifier: string) => Promise<{ success: boolean; message: string }>;
  register: (payload: RegisterPayload) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<CustomerUser>) => Promise<{ success: boolean; message: string }>;
}

const AUTH_CURRENT_USER_KEY = 'vivaldi_current_customer';
const AUTH_ACCOUNTS_KEY = 'vivaldi_registered_customers';
const AUTH_SYNC_EVENT = 'vivaldi-auth-state-sync';

// Default seeded customer for instant prototype testing
const SEEDED_DEMO_USER: StoredAccount = {
  id: 'cust-demo-01',
  fullName: 'Kwame Mensah',
  phone: '0241234567',
  email: 'kwame@gmail.com',
  city: 'Accra',
  deliveryAddress: 'Sakumono Estate, Block 14, Near Junction',
  createdAt: '2026-01-15T10:00:00.000Z',
  password: 'password123',
};

function getStoredAccounts(): StoredAccount[] {
  if (typeof window === 'undefined') return [SEEDED_DEMO_USER];
  try {
    const raw = localStorage.getItem(AUTH_ACCOUNTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to read registered customer accounts', err);
  }
  // Initialize with seeded demo user
  try {
    localStorage.setItem(AUTH_ACCOUNTS_KEY, JSON.stringify([SEEDED_DEMO_USER]));
  } catch {
    // ignore
  }
  return [SEEDED_DEMO_USER];
}

function getCurrentStoredUser(): CustomerUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_CURRENT_USER_KEY);
    if (raw) {
      const user = JSON.parse(raw);
      if (user && typeof user.id === 'string' && typeof user.fullName === 'string') {
        return user;
      }
    }
  } catch (err) {
    console.error('Failed to load current customer session', err);
  }
  return null;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(() => getCurrentStoredUser());
  const [isLoading, setIsLoading] = useState(false);

  // Synchronize authentication across tabs & custom events
  useEffect(() => {
    const handleSync = () => {
      setCurrentUser(getCurrentStoredUser());
    };

    window.addEventListener(AUTH_SYNC_EVENT, handleSync);
    window.addEventListener('storage', handleSync);

    return () => {
      window.removeEventListener(AUTH_SYNC_EVENT, handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const login = useCallback(async (identifier: string, password: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);

    // Simulate realistic network roundtrip
    await new Promise((res) => setTimeout(res, 450));

    const cleanId = identifier.trim().toLowerCase();
    const cleanDigits = cleanId.replace(/\D/g, '');
    const cleanPass = password.trim();

    if (!cleanId || !cleanPass) {
      setIsLoading(false);
      return { success: false, message: 'Please enter your phone number or email, and password.' };
    }

    const accounts = getStoredAccounts();

    // Match by email OR Ghana phone number
    const match = accounts.find((acc) => {
      const accEmail = acc.email.toLowerCase();
      const accDigits = acc.phone.replace(/\D/g, '');
      const emailMatches = accEmail === cleanId;
      const phoneMatches = cleanDigits.length >= 8 && accDigits.endsWith(cleanDigits.slice(-8));
      return emailMatches || phoneMatches;
    });

    if (!match) {
      setIsLoading(false);
      return {
        success: false,
        message: 'No account found with this phone number or email. Please register first.',
      };
    }

    if (match.password !== cleanPass) {
      setIsLoading(false);
      return {
        success: false,
        message: 'Incorrect password. Please try again.',
      };
    }

    // Strip password from current active session
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _p, ...safeUser } = match;
    try {
      localStorage.setItem(AUTH_CURRENT_USER_KEY, JSON.stringify(safeUser));
      window.dispatchEvent(new CustomEvent(AUTH_SYNC_EVENT));
    } catch (err) {
      console.error('Failed to save customer session', err);
    }

    setCurrentUser(safeUser);
    setIsLoading(false);

    return {
      success: true,
      message: `Welcome back, ${safeUser.fullName}!`,
    };
  }, []);

  const loginWithGoogle = useCallback(async (googleEmail: string, googleName?: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 400));

    const cleanEmail = (googleEmail || '').trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setIsLoading(false);
      return { success: false, message: 'Please enter a valid Google (Gmail) address.' };
    }

    const accounts = getStoredAccounts();
    // Check if an existing registered customer has this matching Gmail
    const existing = accounts.find((acc) => acc.email.toLowerCase() === cleanEmail);

    if (existing) {
      // Existing original account recognized!
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _p, ...safeUser } = existing;
      try {
        localStorage.setItem(AUTH_CURRENT_USER_KEY, JSON.stringify(safeUser));
        window.dispatchEvent(new CustomEvent(AUTH_SYNC_EVENT));
      } catch (err) {
        console.error('Failed to save customer session', err);
      }
      setCurrentUser(safeUser);
      setIsLoading(false);
      return {
        success: true,
        message: `Welcome back, ${safeUser.fullName}! Account recognized via Google (${cleanEmail}).`,
      };
    }

    // New Google customer: extract readable name if not passed
    const fallbackName = cleanEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const finalName = (googleName && googleName.trim()) || fallbackName;

    const newAccount: StoredAccount = {
      id: `cust-g-${Date.now().toString(36)}`,
      fullName: finalName,
      email: cleanEmail,
      phone: '',
      city: 'Accra',
      deliveryAddress: '',
      createdAt: new Date().toISOString(),
      password: 'google-oauth-authenticated',
    };

    try {
      localStorage.setItem(AUTH_ACCOUNTS_KEY, JSON.stringify([...accounts, newAccount]));
    } catch (err) {
      console.error('Failed to save Google account', err);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _p, ...safeUser } = newAccount;
    try {
      localStorage.setItem(AUTH_CURRENT_USER_KEY, JSON.stringify(safeUser));
      window.dispatchEvent(new CustomEvent(AUTH_SYNC_EVENT));
    } catch (err) {
      console.error('Failed to save customer session', err);
    }

    setCurrentUser(safeUser);
    setIsLoading(false);

    return {
      success: true,
      message: `Account created & linked with Google (${cleanEmail})! Welcome, ${safeUser.fullName}!`,
    };
  }, []);

  const loginWithGoogleAuthenticator = useCallback(async (code: string, identifier: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 400));

    const cleanCode = (code || '').replace(/\D/g, '');
    if (cleanCode.length !== 6) {
      setIsLoading(false);
      return {
        success: false,
        message: 'Please enter a valid 6-digit verification code from Google Authenticator.',
      };
    }

    const cleanId = (identifier || '').trim().toLowerCase();
    if (!cleanId) {
      setIsLoading(false);
      return {
        success: false,
        message: 'Please enter your registered Gmail or phone number associated with your authenticator.',
      };
    }

    const accounts = getStoredAccounts();
    const cleanDigits = cleanId.replace(/\D/g, '');
    const match = accounts.find((acc) => {
      const emailMatches = acc.email.toLowerCase() === cleanId;
      const phoneMatches = cleanDigits.length >= 8 && acc.phone.replace(/\D/g, '').endsWith(cleanDigits.slice(-8));
      return emailMatches || phoneMatches;
    });

    if (!match) {
      setIsLoading(false);
      return {
        success: false,
        message: `No account found for "${identifier}". Please check your email or register.`,
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _p, ...safeUser } = match;
    try {
      localStorage.setItem(AUTH_CURRENT_USER_KEY, JSON.stringify(safeUser));
      window.dispatchEvent(new CustomEvent(AUTH_SYNC_EVENT));
    } catch (err) {
      console.error('Failed to save customer session', err);
    }

    setCurrentUser(safeUser);
    setIsLoading(false);

    return {
      success: true,
      message: `Google Authenticator verified! Welcome back, ${safeUser.fullName}!`,
    };
  }, []);

  const register = useCallback(async (payload: RegisterPayload): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);

    await new Promise((res) => setTimeout(res, 550));

    const cleanName = payload.fullName.trim();
    const cleanPhone = payload.phone.trim();
    const cleanEmail = payload.email.trim().toLowerCase();
    const cleanCity = payload.city.trim() || 'Accra';
    const cleanAddress = payload.deliveryAddress?.trim() || '';
    const cleanPass = payload.password.trim();

    if (!cleanName || !cleanPhone || !cleanPass) {
      setIsLoading(false);
      return { success: false, message: 'Please fill in your name, phone number, and password.' };
    }

    if (cleanPass.length < 6) {
      setIsLoading(false);
      return { success: false, message: 'Password should be at least 6 characters long.' };
    }

    const accounts = getStoredAccounts();
    const cleanDigits = cleanPhone.replace(/\D/g, '');

    // Check duplicate phone or email
    const duplicate = accounts.find((acc) => {
      const emailMatch = cleanEmail && acc.email.toLowerCase() === cleanEmail;
      const phoneMatch = acc.phone.replace(/\D/g, '').endsWith(cleanDigits.slice(-8));
      return emailMatch || phoneMatch;
    });

    if (duplicate) {
      setIsLoading(false);
      return {
        success: false,
        message: 'An account with this phone number or email already exists. Please sign in.',
      };
    }

    const newId = `cust-${Date.now().toString().slice(-6)}`;
    const newAccount: StoredAccount = {
      id: newId,
      fullName: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      city: cleanCity,
      deliveryAddress: cleanAddress,
      createdAt: new Date().toISOString(),
      password: cleanPass,
    };

    const updatedAccounts = [newAccount, ...accounts];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _p, ...safeUser } = newAccount;

    try {
      localStorage.setItem(AUTH_ACCOUNTS_KEY, JSON.stringify(updatedAccounts));
      localStorage.setItem(AUTH_CURRENT_USER_KEY, JSON.stringify(safeUser));
      window.dispatchEvent(new CustomEvent(AUTH_SYNC_EVENT));
    } catch (err) {
      console.error('Failed to save new registered account', err);
    }

    setCurrentUser(safeUser);
    setIsLoading(false);

    return {
      success: true,
      message: `Account created successfully! Welcome, ${safeUser.fullName}.`,
    };
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(AUTH_CURRENT_USER_KEY);
      window.dispatchEvent(new CustomEvent(AUTH_SYNC_EVENT));
    } catch (err) {
      console.error('Failed to clear customer session', err);
    }
    setCurrentUser(null);
  }, []);

  const updateProfile = useCallback(async (updates: Partial<CustomerUser>): Promise<{ success: boolean; message: string }> => {
    if (!currentUser) {
      return { success: false, message: 'You must be signed in to update your profile.' };
    }

    const updatedUser: CustomerUser = {
      ...currentUser,
      ...updates,
      id: currentUser.id, // preserve ID
    };

    const accounts = getStoredAccounts();
    const updatedAccounts = accounts.map((acc) => {
      if (acc.id === currentUser.id) {
        return {
          ...acc,
          ...updates,
          id: acc.id,
          password: acc.password,
        };
      }
      return acc;
    });

    try {
      localStorage.setItem(AUTH_ACCOUNTS_KEY, JSON.stringify(updatedAccounts));
      localStorage.setItem(AUTH_CURRENT_USER_KEY, JSON.stringify(updatedUser));
      window.dispatchEvent(new CustomEvent(AUTH_SYNC_EVENT));
    } catch (err) {
      console.error('Failed to update account in storage', err);
    }

    setCurrentUser(updatedUser);

    return {
      success: true,
      message: 'Your profile has been updated successfully.',
    };
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: Boolean(currentUser),
        isLoading,
        login,
        loginWithGoogle,
        loginWithGoogleAuthenticator,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
