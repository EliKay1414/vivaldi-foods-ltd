import { useEffect } from 'react';
import { useLocation } from '@tanstack/react-router';

/**
 * Custom hook that listens to router pathname changes and resets window scroll to the top.
 */
export function useScrollToTop(): void {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}

/**
 * Component wrapper to invoke `useScrollToTop` inside JSX route trees.
 */
export function ScrollToTop(): null {
  useScrollToTop();
  return null;
}

export default useScrollToTop;
