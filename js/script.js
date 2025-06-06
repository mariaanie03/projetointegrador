
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

    // Conteúdo simulado para as seções de "Métodos" e "Dicas" e sub-links
    const pageContents = {
        // Para links principais
        "metodos": {
            title: "Nossos Métodos de Personalização",
            description: "Descubra como transformamos produtos comuns em presentes extraordinários com nossas técnicas de personalização de ponta. Cada método é aplicado com precisão e carinho.",
         
        },
        "dicas": {
            title: "Dicas e Inspirações para Presentes",
            description: "Precisa de ideias? Explore nossas dicas e inspire-se para encontrar ou criar o presente personalizado perfeito para qualquer ocasião. Surpreenda quem você ama!",
            
        },
        // Para sub-links da home
        "datas-especiais": {
            title: "Presentes para Datas Especiais",
            description: "Celebre aniversários, casamentos, formaturas e outras datas importantes com presentes que marcam. Personalize com nomes, datas ou mensagens especiais."
        },
        "corporativos": {
            title: "Presentes Corporativos Únicos",
            description: "Fortaleça sua marca e valorize seus colaboradores e clientes com presentes corporativos personalizados. Opções elegantes e criativas para todas as necessidades."
        },
        "criativos": {
            title: "Solte a Criatividade: Presentes Originais",
            description: "Para quem busca algo fora do comum. Nossa seleção de presentes criativos pode ser personalizada para refletir a personalidade de quem presenteia e de quem recebe."
        },
        "estampas": {
            title: "Estampas e Impressões de Alta Qualidade",
            description: "Utilizamos tecnologia de ponta para estampas vibrantes e duradouras em uma variedade de materiais. Ideal para camisetas, canecas, almofadas e muito mais."
        },
        "gravura": {
            title: "Gravura e Corte a Laser de Precisão",
            description: "Adicione um toque sofisticado com gravações a laser em metal, madeira, acrílico e outros materiais. Cortes precisos para designs complexos e detalhados."
        },
        "bordados": {
            title: "Bordados e Patchwork Artesanais",
            description: "Presentes com um toque artesanal e charmoso. Bordados personalizados em tecidos e aplicações de patchwork que contam histórias."
        },
        "tendencias": {
            title: "Tendências Atuais em Presentes Personalizados",
            description: "Fique por dentro do que há de mais novo e desejado no mundo dos presentes personalizados. Ideias inovadoras para você se inspirar."
        },
        "ocasioes": {
            title: "O Presente Perfeito para Cada Ocasião",
            description: "Não importa o evento, temos sugestões de presentes personalizados que se encaixam perfeitamente, desde pequenas lembranças até grandes surpresas."
        },
        "depoimentos": {
            title: "Depoimentos e Experiências de Clientes",
            description: "Veja o que nossos clientes dizem sobre seus presentes personalizados e a experiência de compra conosco. Histórias reais de satisfação e emoção."
        }
    };

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

    // Sub-links da página inicial
    // Descomentar para fazer o conteúdo aparecer na mesma página!!!
    /*
    subLinkButtons.forEach(button => {
        button.addEventListener('click', function() {
            const contentKey = this.dataset.contentKey;
            showSection('product-display-content', contentKey);
        });
    });
    */

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