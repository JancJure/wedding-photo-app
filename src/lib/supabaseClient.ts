import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rmjycolarfskryufekbt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtanljb2xhcmZza3J5dWZla2J0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNTgwNjUsImV4cCI6MjA2NzgzNDA2NX0.-i1Y8D35Py8EO3W80HYDqQxv9OQ3_1q4pp1TiKyLk0U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);