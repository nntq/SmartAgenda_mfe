import {createClient} from '@supabase/supabase-js'

const supabaseUrl = 'https://iulnggsvywuvnctdyqvo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1bG5nZ3N2eXd1dm5jdGR5cXZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQyODIwOTAsImV4cCI6MTk3OTg1ODA5MH0.shezN0KyqKxLCnqmsN6-ErnNuJIboVDqx0zzxYMeZYo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);