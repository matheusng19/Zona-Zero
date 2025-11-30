script.js=let produtoSelecionado = "";

// DESCONTO PARA QUEM TEM LOGIN
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

// ATUALIZA CONTADOR DO CARRINHO
function atualizarContadorCarrinho() {
    const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];
    const cartCount = document.getElementById("cart-count");
    if (!cartCount) return;

    cartCount.textContent = carrinhoAtual.length;
    cartCount.style.display = carrinhoAtual.length > 0 ? "inline-block" : "none";
}

document.addEventListener("DOMContentLoaded", atualizarContadorCarrinho);

// ABRIR MODAL PRODUTO
document.querySelectorAll(".btn-comprar").forEach(btn => {
    btn.addEventListener("click", () => {
        const produtoDiv = btn.closest(".produto");
        const nome = produtoDiv.querySelector("p").textContent.trim();
        const img = btn.dataset.img;

        produtoSelecionado = nome;
        document.getElementById("nome-produto").textContent = nome;
        document.getElementById("modal-img").src = img;

        document.getElementById("modal-produto").style.display = "flex";
    });
});

// FECHAR MODAL PRODUTO
document.getElementById("closeModalProduto").onclick = () => {
    document.getElementById("modal-produto").style.display = "none";
};

// ADICIONAR AO CARRINHO
document.querySelector(".carrinho").onclick = () => {
    const tamanho = document.querySelector(".tamanho").value;
    const quantidade = Number(document.querySelector(".quantidade").value);
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

    atualizarContadorCarrinho();
    showAddedMessage(produtoSelecionado);

    document.getElementById("modal-produto").style.display = "none";
};

const url = "https://wa.me/5581997718273?text=" + encodeURIComponent(mensagem);
