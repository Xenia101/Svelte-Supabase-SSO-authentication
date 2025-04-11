import { supabase } from '$lib/supabase';
import { goto } from '$app/navigation';

export async function signInWithKakao(redirectTo = '/') {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}${redirectTo}`,
      }
    });

    if (error) {
      console.error('Error during Kakao login:', error.message);
      throw error;
    }

    console.log('Kakao login started:', data);
  } catch (error) {
    console.error('Exception occurred during Kakao login:', error);
    throw error;
  }
}

export function subscribeToAuthChanges(callback) {
  return supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth state changed:', event, session);
    callback(event, session);
  });
}