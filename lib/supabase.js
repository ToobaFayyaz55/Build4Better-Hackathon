import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://hyaxdbvdtffhbenfnokz.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5YXhkYnZkdGZmaGJlbmZub2t6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyODk3OTcsImV4cCI6MjA4OTg2NTc5N30.wdhTOfdUS7DTmT3ROKCdCq4Atqbc7m7Qt3K8o6edujI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);