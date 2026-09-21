import { useLocation } from "wouter";
import { useEffect, useState } from "react";

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [, setLocation] = useLocation();
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAdminAuthenticated") === "true";
    setIsAuthenticated(authStatus);
    setHasChecked(true);

    if (!authStatus) {
      // Redirect to login page if not authenticated
      // Use setTimeout to ensure state update completes first
      const timer = setTimeout(() => {
        setLocation("/admin/login");
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [setLocation]);

  return { isAuthenticated, hasChecked };
}

export function logoutAdmin() {
  localStorage.removeItem("isAdminAuthenticated");
  // The component using useAdminAuth will handle the redirect
}
