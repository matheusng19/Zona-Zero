// Espera a página inteira carregar
document.addEventListener('DOMContentLoaded', () => {

    // --- Variáveis Globais ---
    let cart = []; // Array para armazenar os itens

    // --- 1. FUNÇÃO PARA CRIAR OS ELEMENTOS DO CARRINHO ---
    function injectCartElements() {
        
        // --- MUDANÇA AQUI ---
        // A. Encontra o link "Produtos" e o transforma no botão do carrinho
        const navLinks = document.querySelectorAll('header nav ul li a');
        navLinks.forEach(link => {
            if (link.innerText.trim() === 'Produtos') {
                link.id = 'cart-button'; // Dá um ID para facilitar
                link.innerHTML = 'Produtos <span id="cart-count">0</span>'; // Adiciona o contador
            }
        });

        // B. Cria a barra lateral do carrinho (sidebar) e adiciona no <body>
        const cartSidebar = document.createElement('div');
        cartSidebar.id = 'cart-sidebar';
        cartSidebar.classList.add('cart-sidebar'); 
        cartSidebar.innerHTML = `
            <button id="close-cart" class="cart-close-btn">&times;</button>
            <h2>Seu Carrinho</h2>
            <div id="cart-items" class="cart-items-container">
                </div>
            <h3>Total: <span id="cart-total">R$0,00</span></h3>
            <button id="clear-cart" class="clear-cart-btn">Limpar Carrinho</button>
        `;
        document.body.appendChild(cartSidebar);

        // C. Adiciona os botões "Adicionar ao Carrinho" em cada produto
        const produtos = document.querySelectorAll('.produto');
        produtos.forEach(produto => {
            const btn = document.createElement('button');
            btn.innerText = 'Adicionar ao Carrinho';
            btn.classList.add('add-to-cart-btn'); 
            produto.appendChild(btn);
        });
    }

    // --- 2. FUNÇÃO PARA ADICIONAR OS EVENTOS DE CLIQUE ---
    function addEventListeners() {
        // Seletores
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        
        // --- MUDANÇA AQUI ---
        // Agora o botão do carrinho é o link "Produtos"
        const cartButton = document.getElementById('cart-button'); 
        
        const cartSidebarEl = document.getElementById('cart-sidebar');
        const closeCartBtn = document.getElementById('close-cart');
        const clearCartBtn = document.getElementById('clear-cart');

        // Abrir/Fechar carrinho (usando o link "Produtos")
        if(cartButton) { // Verifica se encontrou o link
             cartButton.addEventListener('click', toggleCart);
        }
        closeCartBtn.addEventListener('click', toggleCart);

        // Adicionar ao carrinho
        addToCartButtons.forEach(button => {
            button.addEventListener('click', addToCart);
        });
        
        // Limpar carrinho
        clearCartBtn.addEventListener('click', clearCart);
    }

    // --- 3. FUNÇÕES DE LÓGICA DO CARRINHO ---

    /**
     * Abre ou fecha a barra lateral do carrinho.
     */
    function toggleCart(event) {
        // Previne o link <a> de pular para o topo da página
        event.preventDefault(); 
        const cartSidebarEl = document.getElementById('cart-sidebar');
        cartSidebarEl.classList.toggle('open');
    }

    /**
     * Adiciona um item ao carrinho.
     */
    function addToCart(event) {
        const productEl = event.target.closest('.produto');
        const productName = productEl.querySelector('p:nth-of-type(1)').innerText;
        const productPriceString = productEl.querySelector('p:nth-of-type(2)').innerText;
        const productPrice = parseFloat(productPriceString.replace('R$', '').replace(',', '.'));

        const existingItem = cart.find(item => item.name === productName);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }

        updateCartUI();

        // Abre o carrinho se não estiver aberto
        const cartSidebarEl = document.getElementById('cart-sidebar');
        if (!cartSidebarEl.classList.contains('open')) {
            cartSidebarEl.classList.add('open');
        }
    }

    /**
     * Atualiza toda a interface do carrinho (itens, total, contador).
     */
    function updateCartUI() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalEl = document.getElementById('cart-total');
        const cartCountEl = document.getElementById('cart-count'); // O span dentro do link "Produtos"

        cartItemsContainer.innerHTML = '';
        let total = 0;
        let totalItems = 0;

        cart.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.classList.add('cart-item');
            itemEl.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <span>R$${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
            `;
            cartItemsContainer.appendChild(itemEl);

            total += item.price * item.quantity;
            totalItems += item.quantity;
        });

        cartTotalEl.innerText = `R$${total.toFixed(2).replace('.', ',')}`;
        
        // Atualiza o contador (ex: "Produtos 3")
        if (cartCountEl) {
             cartCountEl.innerText = totalItems;
        }
    }
    
    /**
     * Limpa todos os itens do carrinho.
     */
    function clearCart() {
        cart = [];
        updateCartUI();
    }


    // --- 4. INICIALIZAÇÃO ---
    injectCartElements();
    addEventListeners();

});