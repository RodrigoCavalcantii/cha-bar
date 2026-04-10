import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://dlommelaiwhijlhlnoqq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsb21tZWxhaXdoaWpsaGxub3FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4NTQ3MDEsImV4cCI6MjA5MTQzMDcwMX0.YzqtMZSQc9quyhl94Ab1kYuPNhuG_HXFAOgT9Ub9VzQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
