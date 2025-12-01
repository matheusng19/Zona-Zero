<?php
session_start();

$email = $_POST['email'];
$senha = $_POST['senha'];

$usuarios = file("usuarios.txt", FILE_IGNORE_NEW_LINES);

foreach ($usuarios as $linha) {
    list($emailSalvo, $senhaSalva) = explode("|", $linha);

    if ($email == $emailSalvo && password_verify($senha, $senhaSalva)) {
        $_SESSION["usuario"] = $email;
        header("Location: desconto.html"); // página depois do login
        exit;
    }
}

echo "<script>alert('E-mail ou senha incorretos!');history.back();</script>";
?>
