// Aguarda todo o conteúdo da página ser carregado antes de executar o script.
document.addEventListener('DOMContentLoaded', function() {

    // --- SELETORES GERAIS DE ELEMENTOS ---
    // Pega todos os elementos que o script pode precisar interagir.
    const navLinks = document.querySelectorAll('.main-nav .nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const cartIconButton = document.getElementById('cart-icon-btn');
    
    // --- FUNÇÕES REUTILIZÁVEIS ---

    /**
     * Mostra uma seção de conteúdo específica na index.html e esconde as outras.
     * @param {string} targetId - O ID da seção a ser exibida.
     */
    function showSection(targetId) {
        // Esta função só deve rodar na index.html, que tem múltiplas seções.
        if (document.getElementById('home-content')) {
            contentSections.forEach(section => { 
                section.classList.remove('active'); 
            });
            const targetSection = document.getElementById(targetId);
            if (targetSection) { 
                targetSection.classList.add('active');
                
                // Atualiza o estado 'active' no link da navegação principal.
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.dataset.target === targetId);
                });
            }
        }
    }

    /**
     * Filtra os produtos na página de resultados com base em um termo de busca.
     * @param {string} searchTerm - O texto a ser procurado no nome dos produtos.
     * @returns {number} - A quantidade de produtos encontrados.
     */
    const filterProducts = (searchTerm) => {
        const products = document.querySelectorAll('.quadro');
        let productsFound = 0;
        products.forEach(product => {
            const productNameElement = product.querySelector('h3');
            if (productNameElement) {
                const productName = productNameElement.textContent.toLowerCase().trim();
                if (productName.includes(searchTerm)) {
                    // Se o nome do produto corresponde, remove a classe para mostrá-lo.
                    product.classList.remove('escondido');
                    productsFound++;
                } else {
                    // Se não corresponde, adiciona a classe para escondê-lo.
                    product.classList.add('escondido');
                }
            }
        });
        return productsFound;
    };


    // --- LÓGICA ESPECÍFICA PARA A PÁGINA INICIAL (index.html) ---
    // Verifica se estamos na página inicial pela presença do elemento 'home-content'.
    if (document.getElementById('home-content')) {
        
        // Ativa a navegação por seções (links <span>).
        navLinks.forEach(link => {
            if (link.tagName === 'SPAN') {
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    showSection(this.dataset.target);
                });
            }
        });

        // O ícone do carrinho (🛒) mostra a seção de login.
        if (cartIconButton) {
            cartIconButton.addEventListener('click', () => {
                showSection('login-content');
            });
        }

        // O botão "Não Possuo Cadastro" leva para a página de cadastro.
        const btnNaoTenho = document.getElementById('btn-nao-tenho-cadastro');
        if (btnNaoTenho) {
            btnNaoTenho.addEventListener('click', () => {
                window.location.href = 'cadastro.html';
            });
        }
        
        // Inicializa a página mostrando a seção principal ('home-content').
        showSection('home-content');
    }
    
    // --- LÓGICA DA PÁGINA DE CADASTRO (cadastro.html) ---
    // Procura pelo formulário de registro.
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o recarregamento da página.
            const password = document.getElementById('senha').value;
            const confirmPassword = document.getElementById('confirmar-senha').value;
            
            // Validação simples de senha.
            if (password !== confirmPassword) {
                alert('As senhas não coincidem. Por favor, tente novamente.');
                return; // Interrompe a execução.
            }
            
            alert('Cadastro realizado com sucesso! (Funcionalidade de backend não implementada)');
            // Futuramente, aqui você enviaria os dados para um servidor.
        });
    }

    // --- LÓGICA DE PESQUISA GLOBAL (para TODAS as páginas) ---
    // Adiciona a funcionalidade de busca em qualquer página que tenha o formulário.
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                // Redireciona para a página de resultados, passando a busca na URL.
                window.location.href = `resultados.html?q=${encodeURIComponent(searchTerm)}`;
            }
        });
    }

    // --- LÓGICA DA PÁGINA DE RESULTADOS (resultados.html) ---
    // Roda apenas se a URL terminar com 'resultados.html'.
    if (window.location.pathname.endsWith('resultados.html')) {
        const resultsTitle = document.getElementById('search-results-title');
        const urlParams = new URLSearchParams(window.location.search);
        const searchTermFromUrl = urlParams.get('q'); // Pega o termo da URL.

        if (searchTermFromUrl && resultsTitle) {
            const decodedSearchTerm = decodeURIComponent(searchTermFromUrl);
            searchInput.value = decodedSearchTerm; // Coloca o termo na barra de busca.
            
            const numFound = filterProducts(decodedSearchTerm.toLowerCase()); // Filtra os produtos.
            
            resultsTitle.textContent = `${numFound} resultado(s) para: "${decodedSearchTerm}"`; // Atualiza o título.
        } else if (resultsTitle) {
            // Caso a página seja acessada sem um termo de busca.
            resultsTitle.textContent = "Faça uma busca para ver os resultados.";
            document.querySelectorAll('.quadro').forEach(p => p.classList.add('escondido'));
        }
    }
});