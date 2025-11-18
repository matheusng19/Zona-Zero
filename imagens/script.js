document.addEventListener("DOMContentLoaded", () => {
    
    //variáveis e seletores
    let produtoSelecionado = "";
    const modal = document.getElementById("modal-produto"); // O popup principal
    const modalImg = document.getElementById("modal-img"); 
    const modalNome = document.getElementById("nome-produto"); 
    const modalPagamento = document.getElementById("modal-pagamento"); // Popup de checkout

    // quantos itens tem no carrinho
    atualizarContadorCarrinho();

    //desconto para quem já tem conta
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

    //popup do produto quando clica em COMPRAR
    document.querySelectorAll(".btn-comprar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            // Pega as infos do produto (nome e imagem)
            const produtoDiv = btn.closest('.produto');
            const nomeProduto = produtoDiv.querySelector('p').textContent.trim();
            const caminhoImagem = btn.getAttribute("data-img");

            // Coloca as infos na janela pop-up
            produtoSelecionado = nomeProduto;
            modalNome.textContent = nomeProduto;
            
            // Colocando a foto no modal
            if (modalImg) {
                modalImg.src = caminhoImagem; 
                modalImg.style.display = "block";
            }

            // Mostra o modal!
            modal.style.display = "flex";
        });
    });

    // Fechar os popups
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

    //Adicionar ao Carrinho
    document.querySelector(".btn-carrinho").onclick = () => {
        const tamanho = document.getElementById("tamanho").value;
        const quantidade = Number(document.getElementById("quantidade").value);
        // Preço fixo por enquanto
        const preco = 69.99; 

        const produto = {
            produto: produtoSelecionado,
            tamanho,
            quantidade,
            preco,
            imagem: modalImg.src
        };

        let carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];
        carrinhoAtual.push(produto);
        localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));

        showAddedMessage(produtoSelecionado);
        atualizarContadorCarrinho();
        modal.style.display = "none";
    };

    // Ir para o pagamento
    document.querySelector(".btn-finalizar").onclick = () => {
        modal.style.display = "none";
        modalPagamento.style.display = "flex";
    };

    //Finalizar no WhatsApp
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

        const numeroLoja = "5581999999999"; 
        const url = "https://wa.me/" + numeroLoja + "?text=" + encodeURIComponent(mensagem);
        window.open(url, "_blank");
    };

    // Funções Auxiliares
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