import { useContext } from 'react';
import {
  AuthContext,
  type AuthContextType,
  type CustomerUser,
  type RegisterPayload,
} from '@/context/AuthContext';

/**
 * Custom hook for customer authentication state and operations.
 * Provides access to the current customer user session, login, Google sign-in,
 * registration, profile updates, and logout.
 *
 * Must be used within an `AuthProvider`.
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export type { CustomerUser, RegisterPayload, AuthContextType };
export default useAuth;
