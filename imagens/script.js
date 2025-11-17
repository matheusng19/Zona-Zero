
let produtoSelecionado = "";

const usuario = JSON.parse(localStorage.getItem("usuario"));

if (!usuario) {
    window.location.href = "login.html";
}

if (usuario) {
    document.querySelectorAll(".preco").forEach(preco => {
        let valor = Number(preco.dataset.valor);
        let desconto = valor * 0.10; // 10%
        let novoValor = valor - desconto;

        preco.innerHTML = `
            <span class="preco-antigo">R$ ${valor.toFixed(2)}</span>
            <span class="preco-desconto">R$ ${novoValor.toFixed(2)}</span>
            <span class="tag-desconto">10% OFF Login</span>
        `;
    });
}


function abrirModal(produto) {
    produtoSelecionado = produto;
    document.getElementById("nome-produto").textContent = produto;
    document.getElementById("modal-produto").style.display = "flex";
}

document.getElementById("closeModalProduto").onclick = () => {
    document.getElementById("modal-produto").style.display = "none";
};

function atualizarContadorCarrinho() {
    const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.textContent = carrinhoAtual.length;
    }
}

document.querySelector(".btn-carrinho").onclick = () => {
    const tamanho = document.getElementById("tamanho").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const preco = 69.99; 

    const produto = {
        produto: produtoSelecionado,
        tamanho,
        quantidade,
        preco
    };

    let carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinhoAtual.push(produto);
    localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));

    
    showAddedMessage(produtoSelecionado);
    atualizarContadorCarrinho();
    document.getElementById("modal-produto").style.display = "none";
};


function showAddedMessage(name) {
    const msg = document.getElementById("added-message");
    msg.innerHTML = `${name} foi adicionado ao carrinho! 🛒`;
    msg.classList.add("show");
    setTimeout(() => {
        msg.classList.remove("show");
    }, 2200);
}

document.querySelector(".btn-finalizar").onclick = () => {
    document.getElementById("modal-produto").style.display = "none";
    document.getElementById("modal-pagamento").style.display = "flex";
};


document.getElementById("closeModalPagamento").onclick = () => {
    document.getElementById("modal-pagamento").style.display = "none";
};


document.getElementById("btnWhatsapp").onclick = () => {
    const pagamento = document.getElementById("pagamento").value;
    const endereco = document.getElementById("endereco").value;
    const tamanho = document.getElementById("tamanho").value;
    const quantidade = document.getElementById("quantidade").value;

    const mensagem =
        "Pedido Zona Zero Streetwear\n\n" +
        "Produto: " + produtoSelecionado + "\n" +
        "Tamanho: " + tamanho + "\n" +
        "Quantidade: " + quantidade + "\n\n" +
        "Forma de pagamento: " + pagamento + "\n" +
        "Endereço de entrega: " + endereco + "\n\n" +
        "Gostaria de confirmar meu pedido.";

    const url = "https://wa.me/55SEU_NUMERO_AQUI?text=" + encodeURIComponent(mensagem);
    window.open(url, "_blank");
};


const modal = document.getElementById("modal-produto");
const modalImg = document.getElementById("modal-img");

document.querySelectorAll(".btn-comprar").forEach(btn => {
    btn.addEventListener("click", () => {
        
        const produtoDiv = btn.closest('.produto');
        const nomeProduto = produtoDiv.querySelector('p').textContent.trim();
        produtoSelecionado = nomeProduto; 

        
        const img = btn.getAttribute("data-img");
        modalImg.src = img;

       
        modal.style.display = "flex";
    });
});

document.addEventListener("DOMContentLoaded", atualizarContadorCarrinho);
