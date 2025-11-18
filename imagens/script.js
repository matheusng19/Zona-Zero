document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Variáveis Globais e Seletores ---
    let produtoSelecionado = "";
    const modal = document.getElementById("modal-produto");
    const modalImg = document.getElementById("modal-img"); // A imagem do modal
    const modalNome = document.getElementById("nome-produto"); // O título do modal
    const modalPagamento = document.getElementById("modal-pagamento");

    // Atualiza contador ao carregar
    atualizarContadorCarrinho();

    // --- 2. Lógica de Preço com Login (Mantida do seu código) ---
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario) {
        document.querySelectorAll(".preco").forEach(preco => {
            let valor = Number(preco.dataset.valor);
            let desconto = valor * 0.10;
            let novoValor = valor - desconto;
            preco.innerHTML = `
                <span class="preco-antigo">R$ ${valor.toFixed(2)}</span>
                <span class="preco-desconto">R$ ${novoValor.toFixed(2)}</span>
                <span class="tag-desconto">10% OFF Login</span>
            `;
        });
    }

    // --- 3. ABRIR O MODAL (Onde a mágica da imagem acontece) ---
    document.querySelectorAll(".btn-comprar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            // Pega a div pai do botão clicado
            const produtoDiv = btn.closest('.produto');
            
            // Pega o nome (primeiro <p> dentro da div produto)
            const nomeProduto = produtoDiv.querySelector('p').textContent.trim();
            
            // Pega o caminho da imagem do atributo 'data-img' do botão
            const caminhoImagem = btn.getAttribute("data-img");

            // Atualiza as variáveis globais e o HTML do Modal
            produtoSelecionado = nomeProduto;
            modalNome.textContent = nomeProduto;
            
            // AQUI É A CORREÇÃO PRINCIPAL:
            if (modalImg) {
                modalImg.src = caminhoImagem; // Coloca a foto no modal
                modalImg.style.display = "block"; // Garante que ela apareça
            }

            // Abre o modal
            modal.style.display = "flex";
        });
    });

    // --- 4. Fechar Modais ---
    document.getElementById("closeModalProduto").onclick = () => {
        modal.style.display = "none";
    };

    document.getElementById("closeModalPagamento").onclick = () => {
        modalPagamento.style.display = "none";
    };

    // Fecha se clicar fora da janela
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = "none";
        if (event.target == modalPagamento) modalPagamento.style.display = "none";
    };

    // --- 5. Adicionar ao Carrinho ---
    document.querySelector(".btn-carrinho").onclick = () => {
        const tamanho = document.getElementById("tamanho").value;
        const quantidade = Number(document.getElementById("quantidade").value);
        // Tente pegar o preço dinamicamente se possível, aqui está fixo como no seu script
        const preco = 69.99; 

        const produto = {
            produto: produtoSelecionado,
            tamanho,
            quantidade,
            preco,
            imagem: modalImg.src // Salva a imagem no carrinho também se quiser
        };

        let carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];
        carrinhoAtual.push(produto);
        localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));

        showAddedMessage(produtoSelecionado);
        atualizarContadorCarrinho();
        modal.style.display = "none";
    };

    // --- 6. Finalizar Compra (Ir para Pagamento) ---
    document.querySelector(".btn-finalizar").onclick = () => {
        modal.style.display = "none";
        modalPagamento.style.display = "flex";
    };

    // --- 7. WhatsApp ---
    document.getElementById("btnWhatsapp").onclick = () => {
        const pagamento = document.getElementById("pagamento").value;
        const endereco = document.getElementById("endereco").value;
        const tamanho = document.getElementById("tamanho").value;
        const quantidade = document.getElementById("quantidade").value;

        if(endereco.trim() === "") {
            alert("Digite o endereço!");
            return;
        }

        const mensagem =
            "*PEDIDO ZONA ZERO STREETWEAR* 🔥\n\n" +
            "👕 *Produto:* " + produtoSelecionado + "\n" +
            "📏 *Tamanho:* " + tamanho + "\n" +
            "🔢 *Quantidade:* " + quantidade + "\n\n" +
            "💳 *Pagamento:* " + pagamento + "\n" +
            "📍 *Endereço:* " + endereco + "\n\n" +
            "Gostaria de confirmar meu pedido.";

        // ATENÇÃO: Troque pelo seu número real abaixo
        const numeroLoja = "5581999999999"; 
        const url = "https://wa.me/" + numeroLoja + "?text=" + encodeURIComponent(mensagem);
        window.open(url, "_blank");
    };

    // --- Funções Auxiliares ---
    function atualizarContadorCarrinho() {
        const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];
        const cartCount = document.getElementById("cart-count");
        if (cartCount) {
            cartCount.textContent = carrinhoAtual.length;
        }
    }

    function showAddedMessage(name) {
        const msg = document.getElementById("added-message");
        if(msg) {
            msg.innerHTML = `${name} foi adicionado! 🛒`;
            msg.classList.add("show");
            setTimeout(() => {
                msg.classList.remove("show");
            }, 2200);
        } else if (typeof showToast === "function") {
             // Fallback para o Toast do HTML se existir
             showToast(`${name} adicionado!`);
        }
    }
});