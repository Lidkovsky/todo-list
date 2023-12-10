import { createClient } from "@supabase/supabase-js";
// import { Database } from './database.types
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and API key are required");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
