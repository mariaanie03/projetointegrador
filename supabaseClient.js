// Importe a função createClient da biblioteca
//import { createClient } from '@supabase/supabase-js';

// Suas credenciais Supabase (substitua pelos seus valores reais)
const supabaseUrl = 'https://crlcdyiuyqgkyeuiahgb.supabase.co';// Ex: 'https://abcdefghijk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNybGNkeWl1eXFna3lldWlhaGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNzgyNzUsImV4cCI6MjA2NTc1NDI3NX0.y_rIdqY6ducucO0lTX4KjbxdJsD10V4BImKTKizk6O4'; // Ex: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'

// Inicializa o cliente Supabase
//const supabase = createClient(supabaseUrl, supabaseAnonKey);

const supabase = window.myCreateSupabaseClient(supabaseUrl, supabaseAnonKey);
                

//export { supabase };

console.log('Cliente Supabase inicializado com sucesso!');


