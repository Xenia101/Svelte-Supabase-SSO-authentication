import { supabase, isSupabaseConfigured } from '$lib/supabase';

export async function load({ url }) {
  if (!isSupabaseConfigured || !supabase) {
    return {
      supabaseConfigured: false,
    };
  }
  
  try {
    const { data } = await supabase.auth.getSession();
    
    const accessToken = url.searchParams.get('access_token');
    const refreshToken = url.searchParams.get('refresh_token');
    
    if (accessToken && refreshToken) {
      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      });
    }
    
    return { 
      supabaseConfigured: true,
      session: data.session
    };
  } catch (err) {
    console.error('Page load error:', err);
    return {
      supabaseConfigured: true,
      error: err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
    };
  }
}