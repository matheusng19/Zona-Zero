<?php
session_start();

$email = isset($_POST['email']) ? trim($_POST['email']) : '';

// aqui podes procurar no usuarios.txt e enviar email.
// para teste, só define a mensagem:
if ($email === '') {
    $_SESSION['flash'] = "Digite o e-mail.";
} else {
    $_SESSION['flash'] = "E-mail enviado com sucesso!";
}

header("Location: login.php");
exit;
?>
