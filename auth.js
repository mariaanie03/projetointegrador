// js/auth.js

// Importa a função createClient que foi exposta globalmente no HTML
const { createClient } = window.myCreateSupabaseClient;

// Suas credenciais do Supabase
const supabaseUrl = 'https://crlcdyiuyqgkyeuiahgb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNybGNkeWl1eXFna3lldWlhaGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNzgyNzUsImV4cCI6MjA2NTc1NDI3NX0.y_rIdqY6ducucO0lTX4KjbxdJsD10V4BImKTKizk6O4';

// Inicializa o cliente Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Função para lidar com o login na página index.html
const loginForm = document.getElementById('actual-login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        const email = loginForm.email.value;
        const password = loginForm.senha.value;

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            console.error('Erro no login:', error.message);
            alert('Falha no login: ' + error.message);
        } else {
            console.log('Login bem-sucedido!', data.user);
            alert('Login realizado com sucesso!');
            // Redirecionar para uma página de perfil ou para a home
            window.location.href = 'index.html'; 
        }
    });
}

// --- CÓDIGO PARA O CADASTRO (cadastro.html) ---
const registrationForm = document.getElementById('registration-form');

if (registrationForm) {
    registrationForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        const email = registrationForm.email.value;
        const password = registrationForm.senha.value;
        const confirmPassword = document.getElementById('confirmar-senha').value;
        const fullName = document.getElementById('nome-completo').value;

        // Validação simples de senha
        if (password.length < 6) {
            alert('A senha deve ter no mínimo 6 caracteres.');
            return;
        }
        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        // Tenta registrar o usuário no Supabase
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                // Você pode passar dados adicionais aqui, que serão salvos na tabela auth.users
                data: {
                    full_name: fullName,
                    // outros campos que você queira salvar
                }
            }
        });

        if (error) {
            // Se houver um erro, exiba-o
            console.error('Erro no cadastro:', error.message);
            alert('Ocorreu um erro no cadastro: ' + error.message);
        } else {
            // Se o cadastro for bem-sucedido
            console.log('Usuário registrado:', data.user);
            alert('Cadastro realizado com sucesso! Verifique seu e-mail para confirmar a conta.');
            // Opcional: redirecionar para uma página de "verifique seu e-mail" ou para a página de login
            window.location.href = 'index.html'; 
        }
    });
}