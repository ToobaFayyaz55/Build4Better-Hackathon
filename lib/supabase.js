import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://gxginazddoopndcynlsc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4Z2luYXpkZG9vcG5kY3lubHNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5MzQ2MzcsImV4cCI6MjA3NzUxMDYzN30.qOwgvpNtQb9-jxWGQFzZboefVR2hEXBpBBII11FMlFA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
