"use client";

import { useState, useEffect } from "react";

// Deze hook (useHasMounted) en component (HydrationGuard) helpen hydration errors te voorkomen.
// Ze zorgen ervoor dat client-specifieke UI pas gerenderd wordt nadat de component gemount is.

export function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
}

interface HydrationGuardProps {
  children: React.ReactNode;
}

const HydrationGuard: React.FC<HydrationGuardProps> = ({ children }) => {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null; // Of een laadindicator
  }

  return <>{children}</>;
};

export default HydrationGuard;
