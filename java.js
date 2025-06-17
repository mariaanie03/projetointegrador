
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.main-nav .nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const subLinkButtons = document.querySelectorAll('.sub-link-button');
    const cartIconButton = document.getElementById('cart-icon-btn');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    const dynamicProductTitle = document.getElementById('dynamic-product-title');
    const dynamicProductDescription = document.getElementById('dynamic-product-description');
    // const dynamicProductImage = document.getElementById('dynamic-product-image'); // Para mudar imagem


    function showSection(targetId, contentSourceKey = null) {
        contentSections.forEach(section => {        
            section.classList.remove('active');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');

            // Atualizar o link ativo na navegação principal
            const activeNavLink = document.querySelector(`.main-nav .nav-link[data-target="${targetId}"]`);
            if (activeNavLink) {
                activeNavLink.classList.add('active');
            }

        } else {
            console.warn(`Seção com ID "${targetId}" não encontrada.`);
        }
    } // Final da função show section

    // Navegação principal
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.dataset.target;
            const contentSource = this.dataset.contentSource; // Para "Métodos" e "Dicas"
            showSection(targetId, contentSource);
        });
    });

    // Ícone do carrinho leva para a página de login
    if (cartIconButton) {
        cartIconButton.addEventListener('click', function() {
            showSection('login-content');
            // Remover a classe 'active' de todos os navLinks principais
            navLinks.forEach(link => link.classList.remove('active'));
        });
    }

    // Formulário de Login
    const actualLoginForm = document.getElementById('actual-login-form');
    if (actualLoginForm) {
        actualLoginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            alert(`Tentativa de login com e-mail: ${email}. (Funcionalidade de login real não implementada).`);
            // Aqui você adicionaria a lógica de login real
        });
    }
    
    // Botões de Não Possuo/Possuo Cadastro
    const btnNaoTenho = document.getElementById('btn-nao-tenho-cadastro');
    const btnTenho = document.getElementById('btn-tenho-cadastro');
    if(btnNaoTenho) {
        btnNaoTenho.addEventListener('click', () => {
            alert("Redirecionando para a página de cadastro... (Não implementado)");
            // Aqui você poderia mostrar um formulário de cadastro ou redirecionar
        });
    }
    if(btnTenho) {
        btnTenho.addEventListener('click', () => {
            // Apenas garante que o form de login está visível, o que já acontece
            // Poderia focar no campo de email, por exemplo:
            document.getElementById('email').focus();
        });
    }


    // Formulário de Pesquisa
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                alert(`Você pesquisou por: "${searchTerm}". (Funcionalidade de busca real não implementada).`);
                // Aqui você implementaria a lógica de busca nos produtos/conteúdo
            } else {
                alert('Por favor, digite algo para pesquisar.');
            }
        });
    }

     // Mostrar a seção inicial (home)
    showSection('home-content');
});