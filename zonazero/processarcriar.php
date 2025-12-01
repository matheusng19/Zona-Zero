<?php
// DEBUG: mostra erros (só enquanto testa)
ini_set('display_errors', 1);
error_reporting(E_ALL);

session_start();

// pega os valores do POST (verifica se existe)
$nome  = isset($_POST['nome'])  ? trim($_POST['nome'])  : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$senha = isset($_POST['senha']) ? trim($_POST['senha']) : '';

// Simula validação simples (podes acrescentar validações)
if ($email === '' || $senha === '') {
    $_SESSION['flash'] = "Preencha e-mail e senha.";
    header("Location: login.php");
    exit;
}

// Aqui normalmente salvaria em arquivo/DB.
// Se já salva em usuarios.txt, mantém esse passo.
// Exemplo (opcional): salvar em usuarios.txt
// $linha = $email . '|' . password_hash($senha, PASSWORD_DEFAULT) . PHP_EOL;
// file_put_contents('usuarios.txt', $linha, FILE_APPEND);

// Define a mensagem flash (sucesso)
$_SESSION['flash'] = "Conta criada com sucesso!";

// Redireciona para o login (mesma pasta)
header("Location: login.php");
exit;
?>
