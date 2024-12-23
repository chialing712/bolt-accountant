import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export async function getCurrentUser() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No user logged in');
    
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
      
    return { user, profile };
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function signUp(email: string, password: string, userType: 'client' | 'accountant') {
  const { data: { user }, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  if (!user) throw new Error('No user returned from sign up');

  // Create profile
  const { error: profileError } = await supabase
    .from('profiles')
    .insert([
      {
        id: user.id,
        user_type: userType,
        full_name: email.split('@')[0], // Temporary name
      },
    ]);

  if (profileError) throw profileError;

  return user;
}

export async function signIn(email: string, password: string) {
  const { data: { user }, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return user;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}