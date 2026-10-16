import{createClient}from'@supabase/supabase-js';import{publicSupabaseConfig}from'./supabase-public';
const env=import.meta.env||{};
export const supabase=createClient(env.VITE_SUPABASE_URL||publicSupabaseConfig.url,env.VITE_SUPABASE_PUBLISHABLE_KEY||publicSupabaseConfig.key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'implicit',storageKey:'respiro-auth-v1'}});
