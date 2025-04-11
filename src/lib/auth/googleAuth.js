import { supabase } from '$lib/supabase';
import { goto } from '$app/navigation';

export async function signInWithGoogle(redirectTo = '/') {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}${redirectTo}`,
      }
    });

    if (error) {
      console.error('Error during Google login:', error.message);
      throw error;
    }

    console.log('Google login started:', data);
  } catch (error) {
    console.error('Exception occurred during Google login:', error.message);
    throw error;
  }
}

export async function signOut(redirectTo = '/') {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Error during logout:', error.message);
      throw error;
    }
    
    console.log('Logout successful');
    
    goto(redirectTo);
  } catch (error) {
    console.error('Exception occurred during logout:', error.message);
    throw error;
  }
}