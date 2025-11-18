document.addEventListener('DOMContentLoaded', () => {

    const cartContainer = document.getElementById('carrinho-container');
    const cartTotalEl = document.getElementById('cart-total');
    const carrinhoVazioMsg = document.getElementById('carrinho-vazio-msg');
    const carrinhoResumo = document.getElementById('carrinho-resumo');
    const limparCarrinhoBtn = document.getElementById('limpar-carrinho-btn');

    // Carrega o carrinho do localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    //Desenha os itens do carrinho na página
    function displayCartItems() {
        // Limpa o container (exceto a msg de carrinho vazio)
        cartContainer.innerHTML = ''; 
        cartContainer.appendChild(carrinhoVazioMsg); // Recoloca a msg
        
        if (cart.length === 0) {
            carrinhoVazioMsg.style.display = 'block';
            carrinhoResumo.style.display = 'none';
        } else {
            carrinhoVazioMsg.style.display = 'none';
            carrinhoResumo.style.display = 'block';

            let total = 0;

            cart.forEach((item, index) => {
                const itemEl = document.createElement('div');
                itemEl.classList.add('carrinho-item');
                
                itemEl.innerHTML = `
                    <p class="item-nome">${item.name} (x${item.quantity})</p>
                    <p class="item-preco">R$${(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                    <button class="remover-item-btn" data-index="${index}">&times;</button>
                `;
                
                cartContainer.appendChild(itemEl);
                total += item.price * item.quantity;
            });

            // Atualiza o total
            cartTotalEl.innerText = `R$${total.toFixed(2).replace('.', ',')}`;

            // Adiciona evento aos botões de remover
            document.querySelectorAll('.remover-item-btn').forEach(button => {
                button.addEventListener('click', removeItem);
            });
        }
    }

    //Remove um item do carrinho
    function removeItem(event) {
        const indexToRemove = parseInt(event.target.dataset.index);
        
        // Remove o item do array 'cart'
        cart.splice(indexToRemove, 1);
        
        // Atualiza o localStorage
        saveCart();
        
        // Atualiza a tela
        displayCartItems();
        updateCartCounterOnMainScript(); // Atualiza o contador no header
    }

    //Limpa o carrinho todo
    function clearCart() {
        cart = [];
        saveCart();
        displayCartItems();
        updateCartCounterOnMainScript(); // Atualiza o contador no header
    }

    //Salva o estado atual do carrinho no localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    //Atualiza o contador no cabeçalho (chamando a função do script.js)
     function updateCartCounterOnMainScript() {
        
        //recarregar o contador baseado no localStorage
        const cartCountEl = document.getElementById('cart-count');
        if (cartCountEl) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCountEl.innerText = totalItems;
        }
     }

    // Inincialização da Página de Carrinho
    displayCartItems();
    limparCarrinhoBtn.addEventListener('click', clearCart);

});