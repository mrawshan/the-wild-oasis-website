import { createClient } from '@supabase/supabase-js';

// Connecting the app to the supabase database
export const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_KEY,
);
