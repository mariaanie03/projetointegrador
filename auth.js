// Importa o cliente Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

console.log("✅ auth.js: Script iniciado.");

// --- INICIALIZAÇÃO DO SUPABASE ---
try {
    const supabaseUrl = 'https://crlcdyiuyqgkyeuiahgb.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNybGNkeWl1eXFna3lldWlhaGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNzgyNzUsImV4cCI6MjA2NTc1NDI3NX0.y_rIdqY6ducucO0lTX4KjbxdJsD10V4BImKTKizk6O4';
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log("✅ auth.js: Cliente Supabase inicializado com sucesso.");
} catch (error) {
    console.error("❌ auth.js: FALHA ao inicializar o cliente Supabase.", error);
}

// --- SELETORES DE ELEMENTOS DO FORMULÁRIO ---
console.log("✅ auth.js: Procurando elementos do formulário no DOM...");
const form = document.getElementById('actual-login-form');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const btnNaoTenhoCadastro = document.getElementById('btn-nao-tenho-cadastro');
const btnTenhoCadastro = document.getElementById('btn-tenho-cadastro');
console.log("   > Botão 'Não Possuo Cadastro' encontrado:", btnNaoTenhoCadastro ? 'Sim' : 'Não (NULL)');
console.log("   > Botão 'Já Possuo Cadastro' encontrado:", btnTenhoCadastro ? 'Sim' : 'Não (NULL)');

// --- FUNÇÕES PARA ALTERNAR O MODO DO FORMULÁRIO ---
function switchToRegisterMode() {
    console.log("🚀 auth.js: Função switchToRegisterMode() CHAMADA.");
    
    // ... (o resto da lógica da função)
    const confirmPasswordField = document.getElementById('confirm-password-field');
    const confirmPasswordInput = document.getElementById('confirmar-senha');

    formTitle.textContent = 'Cadastro';
    submitBtn.textContent = 'Cadastrar';
    if(confirmPasswordField) confirmPasswordField.style.display = 'block';
    if(confirmPasswordInput) confirmPasswordInput.required = true;
    if(btnNaoTenhoCadastro) btnNaoTenhoCadastro.style.display = 'none';
    if(btnTenhoCadastro) btnTenhoCadastro.style.display = 'block';
}

function switchToLoginMode() {
    console.log("🚀 auth.js: Função switchToLoginMode() CHAMADA.");
    
    // ... (o resto da lógica da função)
    const confirmPasswordField = document.getElementById('confirm-password-field');
    const confirmPasswordInput = document.getElementById('confirmar-senha');
    
    formTitle.textContent = 'Login';
    submitBtn.textContent = 'Entrar';
    if(confirmPasswordField) confirmPasswordField.style.display = 'none';
    if(confirmPasswordInput) confirmPasswordInput.required = false;
    if(btnNaoTenhoCadastro) btnNaoTenhoCadastro.style.display = 'block';
    if(btnTenhoCadastro) btnTenhoCadastro.style.display = 'none';
}


// --- EVENT LISTENERS ---
// A verificação `if (elemento)` previne erros se o elemento não for encontrado
if (btnNaoTenhoCadastro) {
    console.log("✅ auth.js: Adicionando listener de clique ao botão 'Não Possuo Cadastro'.");
    btnNaoTenhoCadastro.addEventListener('click', switchToRegisterMode);
} else {
    console.error("❌ auth.js: Não foi possível adicionar o listener porque o botão 'Não Possuo Cadastro' não foi encontrado.");
}

if (btnTenhoCadastro) {
    console.log("✅ auth.js: Adicionando listener de clique ao botão 'Já Possuo Cadastro'.");
    btnTenhoCadastro.addEventListener('click', switchToLoginMode);
} else {
    console.error("❌ auth.js: Não foi possível adicionar o listener porque o botão 'Já Possuo Cadastro' não foi encontrado.");
}

// O resto do seu código de submit do formulário continua aqui...
if (form) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        // ... sua lógica de handleLogin e handleSignUp
    });
    }