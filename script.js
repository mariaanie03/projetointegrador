document.addEventListener('DOMContentLoaded', function() {
    console.log("Sistema iniciado. Analisando a página...");

    // --- CONFIGURAÇÃO DO SUPABASE ---
    const SUPABASE_URL = 'https://crlcdyiuyqgkyeuiahgb.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNybGNkeWl1eXFna3lldWlhaGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNzgyNzUsImV4cCI6MjA2NTc1NDI3NX0.y_rIdqY6ducucO0lTX4KjbxdJsD10V4BImKTKizk6O4';
    let supabase = null;
    if (window.myCreateSupabaseClient) {
        supabase = window.myCreateSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log("Cliente Supabase inicializado.");
    } else {
        console.error("Biblioteca Supabase não encontrada. Certifique-se de que o script de inicialização do Supabase está presente no HTML.");
    }

    // --- BASE DE DADOS LOCAL DE PRODUTOS ---
    const todosOsProdutos = [
        { id: 1, nome: 'Caneca Branca', preco: 'R$ 25,00', imagem: 'imagens/caneca-removebg-preview.png', descricao: 'Caneca de cerâmica de alta qualidade, perfeita para personalizar com sua foto ou frase favorita.' },
        { id: 2, nome: 'Camisetão', preco: 'R$ 55,00', imagem: 'imagens/camisetão2.0-removebg-preview (1).png', descricao: 'Camiseta 100% algodão, confortável e estilosa. Disponível em várias cores.' },
        { id: 3, nome: 'Kit Val', preco: 'R$ 80,00', imagem: 'imagens/cesta-basica-do-amor-laina-editavel-6-removebg-preview.png', descricao: 'Um kit pensado para celebrar momentos, com itens personalizáveis.' },
        { id: 4, nome: 'Kit Chocolate', preco: 'R$ 65,00', imagem: 'imagens/presente_criativo_1-removebg-preview.png', descricao: 'A combinação perfeita de chocolates deliciosos e um item personalizado.' },
        { id: 5, nome: 'Caneca Mágica', preco: 'R$ 45,00', imagem: 'imagens/th-removebg-preview.png', descricao: 'Surpreenda com esta caneca que revela sua imagem com líquido quente.' },
        { id: 6, nome: 'Garrafinha ', preco: 'R$ 55,90', imagem: 'imagens/imagens/garrafinhas2.0.png', descricao: '' },
        { id: 7, nome: 'Almofada', preco: 'R$ 48,00', imagem: 'imagens/imagens/almofadas2.0.png', descricao: '' },
        { id: 8, nome: 'Kit Diamemn ', preco: 'R$ 110,00', imagem: 'imagens/Kit_Diamemn2.0.png', descricao: '' },
        { id: 9, nome: 'Kit Vinho', preco: 'R$ 124,50', imagem: 'imagens/kit-vinho-2.0.png', descricao: '' },
        { id: 10, nome: 'Kit Churrasco ', preco: 'R$ 99,99', imagem: 'imagens/kit_Churrasco2.0.png', descricao: '' },
        { id: 11, nome: 'Pulseira ', preco: 'R$ 85,00', imagem: 'imagens/pulseira2.0.png', descricao: '' },
        { id: 12, nome: 'Kit Café', preco: 'R$ 50,00', imagem: 'imagens/kit-cafe-2.0.png', descricao: '' },
        { id: 13, nome: 'Diario ', preco: 'R$ 36,00', imagem: 'imagens/diario2.0.png', descricao: '' },
        { id: 14, nome: 'Acessório de Cabelo', preco: 'R$ 43,70', imagem: 'imagens/cabelo2.0.png', descricao: '' },
        { id: 15, nome: 'Kit Chocolate', preco: 'R$ 65,00', imagem: 'imagens/presente_criativo_1-removebg-preview.png', descricao: '' }
    ];

    // ===================================================================
    // --- LÓGICA GLOBAL (FUNCIONA EM TODAS AS PÁGINAS) ---
    // ===================================================================
    const cartIconButton = document.getElementById('cart-icon-btn');
    if (cartIconButton) {
        cartIconButton.addEventListener('click', () => {
            if (document.getElementById('home-content')) {
                // Se já estiver na página inicial, apenas mostra a seção de login
                const contentSections = document.querySelectorAll('.content-section');
                const loginSection = document.getElementById('login-content');
                
                contentSections.forEach(section => section.classList.remove('active'));
                if (loginSection) {
                    loginSection.classList.add('active');
                }
            } else {
                // Se estiver em outra página, redireciona para a home com um parâmetro para mostrar o login
                window.location.href = 'index.html?section=login';
            }
        });
    }

    // ===================================================================
    // --- LÓGICA ESPECÍFICA DE CADA PÁGINA ---
    // ===================================================================

    // --- LÓGICA DA PÁGINA INICIAL (index.html) ---
    if (document.getElementById('home-content')) {
        console.log("Lógica da PÁGINA INICIAL sendo executada.");

        function showSection(targetId) {
            const contentSections = document.querySelectorAll('.content-section');
            contentSections.forEach(section => section.classList.remove('active'));
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        }

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('section') === 'login') {
            showSection('login-content');
        } else {
            showSection('home-content'); // Comportamento padrão
        }

        const navLinks = document.querySelectorAll('.main-nav .nav-link');
        navLinks.forEach(link => {
            if (link.tagName === 'SPAN') {
                link.addEventListener('click', function(e) { 
                    e.preventDefault(); 
                    showSection(this.dataset.target); 
                });
            }
        });
    }
    
    // --- LÓGICA DA PÁGINA DE CADASTRO (cadastro.html) ---
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        console.log("Lógica da PÁGINA DE CADASTRO sendo executada.");

        // Lógica para buscar CEP
        const cepInput = document.getElementById('cep');
        if (cepInput) {
            cepInput.addEventListener('blur', function() {
                const cep = this.value.replace(/\D/g, '');
                if (cep.length === 8) {
                    fetch(`https://viacep.com.br/ws/${cep}/json/`)
                        .then(response => response.json())
                        .then(data => {
                            if (!data.erro) {
                                document.getElementById('logradouro').value = data.logradouro;
                                document.getElementById('bairro').value = data.bairro;
                                document.getElementById('cidade').value = data.localidade;
                                document.getElementById('estado').value = data.uf;
                                document.getElementById('numero').focus();
                            } else { alert('CEP não encontrado.'); }
                        }).catch(error => console.error('Erro ao buscar CEP:', error));
                }
            });
        }

        // Lógica para enviar o formulário para o Supabase
        registrationForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const nomeCompleto = document.getElementById('nome-completo').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('senha').value;
            const confirmPassword = document.getElementById('confirmar-senha').value;
            const termosAceitos = document.getElementById('termos').checked;

            if (password !== confirmPassword) {
                alert('As senhas não coincidem.'); return;
            }
            if (!termosAceitos) {
                alert('Você precisa aceitar os Termos e Condições.'); return;
            }
            if (!supabase) {
                alert('Erro na conexão com o sistema. Tente novamente mais tarde.'); return;
            }

            try {
                const { error } = await supabase.auth.signUp({
                    email: email, password: password,
                    options: { data: { full_name: nomeCompleto } }
                });

                if (error) { throw error; }

                alert('Cadastro realizado com sucesso! Verifique seu e-mail para confirmar a conta.');
                window.location.href = 'index.html';

            } catch (error) {
                console.error('Erro no cadastro:', error.message);
                alert('Erro ao realizar o cadastro: ' + error.message);
            }
        });
    }

    // --- LÓGICA DA PÁGINA DE RESULTADOS (resultados.html) ---
    if (document.getElementById('resultados-grid')) {
        console.log("Lógica da PÁGINA DE RESULTADOS sendo executada.");
        
        const resultsGrid = document.getElementById('resultados-grid');
        const resultsTitle = document.getElementById('search-results-title');
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = urlParams.get('q');

        if (searchTerm) {
            const decodedSearchTerm = decodeURIComponent(searchTerm);
            const searchInput = document.getElementById('search-input');
            if (searchInput) { searchInput.value = decodedSearchTerm; }

            const resultados = todosOsProdutos.filter(produto => 
                produto.nome.toLowerCase().includes(decodedSearchTerm.toLowerCase())
            );

            resultsTitle.textContent = `${resultados.length} resultado(s) para: "${decodedSearchTerm}"`;
            
            if (resultados.length > 0) {
                resultados.forEach(produto => {
                    const produtoCard = document.createElement('div');
                    produtoCard.className = 'quadro';
                    produtoCard.innerHTML = `
                        <img src="${produto.imagem}" alt="${produto.nome}">
                        <h3>${produto.nome}</h3>
                        <p class="preco">${produto.preco}</p>
                        <a href="produtos.html?id=${produto.id}" class="btn-ver-produto">Ver Produto</a>
                    `;
                    resultsGrid.appendChild(produtoCard);
                });
            } else {
                resultsGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">Nenhum produto encontrado.</p>';
            }
        } else {
            resultsTitle.textContent = "Faça uma busca para ver os resultados.";
        }
    }

    // --- LÓGICA DA PÁGINA DE DETALHES DO PRODUTO (produto.html) ---
    if (document.getElementById('detalhe-produto-container')) {
        console.log("Lógica da PÁGINA DE PRODUTO sendo executada.");

        const urlParams = new URLSearchParams(window.location.search);
        const produtoIdString = urlParams.get('id');

        if (produtoIdString) {
            const produtoId = parseInt(produtoIdString);
            const produtoEncontrado = todosOsProdutos.find(p => p.id === produtoId);

            if (produtoEncontrado) {
                document.title = produtoEncontrado.nome;
                document.getElementById('produto-imagem').src = produtoEncontrado.imagem;
                document.getElementById('produto-imagem').alt = produtoEncontrado.nome;
                document.getElementById('produto-nome').textContent = produtoEncontrado.nome;
                document.getElementById('produto-preco').textContent = produtoEncontrado.preco;
                document.getElementById('produto-descricao').textContent = produtoEncontrado.descricao;
            } else {
                document.getElementById('detalhe-produto-container').innerHTML = '<h1>Produto não encontrado!</h1>';
            }
        } else {
             document.getElementById('detalhe-produto-container').innerHTML = '<h1>Erro!</h1><p>Nenhum ID de produto foi especificado na URL.</p>';
        }
    }
});