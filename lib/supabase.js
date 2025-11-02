import { createClient } from "@supabase/supabase-js";
import keys from "../keys";



const SUPABASE_URL = keys.supabaseUrl
const SUPABASE_ANON_KEY = keys.supabaseAnonKey

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
