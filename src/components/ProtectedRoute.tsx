import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useEffect, useState, type JSX } from 'react';

export async function isAuthenticated() {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
}

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    isAuthenticated().then(setAuth);
  }, []);

  if (auth === null) {
    return <div>Carregando...</div>; // Ou um spinner
  }

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}