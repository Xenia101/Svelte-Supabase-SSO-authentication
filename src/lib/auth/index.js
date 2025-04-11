export { signInWithGoogle } from './googleAuth';

export { signInWithKakao, subscribeToAuthChanges } from './kakaoAuth';

export { signOut } from './googleAuth';

import { supabase } from '$lib/supabase';

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    console.error('Failed to get user information:', error.message);
    return null;
  }
  
  return user;
}

export async function getCurrentSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Failed to get session information:', error.message);
    return null;
  }
  
  return session;
}