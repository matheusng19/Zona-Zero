<?php
session_start();

// captura e apaga a flash (se existir)
$flash = '';
if (isset($_SESSION['flash'])) {
    $flash = $_SESSION['flash'];
    unset($_SESSION['flash']);
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Zona Zero</title>

    <style>
        body {
            margin: 0;
            padding: 0;
            background: #000;
            color: white;
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .login-box {
            background: #111;
            width: 350px;
            padding: 30px;
            border: 2px solid #FFD700;
            border-radius: 12px;
            box-shadow: 0 0 25px #ffd70040;
        }

        h2 {
            text-align: center;
            margin-bottom: 25px;
            color: #FFD700;
            letter-spacing: 2px;
        }

        label {
            font-size: 14px;
            color: #FFD700;
            font-weight: bold;
        }

        input {
            width: 70%;
            padding: 12px;
            margin: 8px 0 18px;
            border-radius: 8px;
            border: 1px solid #FFD700;
            background: #0a0a0a;
            color: #FFD700;
            font-size: 15px;
        }

        input:focus {
            outline: none;
            box-shadow: 0 0 10px #ffd70080;
        }

        .btn-login {
            width: 100%;
            padding: 12px;
            background: #FFD700;
            color: #000;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: .3s;
        }

        .btn-login:hover {
            background: #e6c000;
        }

        .links {
            text-align: center;
            margin-top: 15px;
        }

        .links a {
            color: #FFD700;
            text-decoration: none;
            font-size: 14px;
        }

        .links a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>

<div class="login-box">

    <?php if ($flash !== ''): ?>
    <p style="color:#00ff00; text-align:center; font-weight:bold; margin-bottom:10px;">
        <?php echo htmlspecialchars($flash); ?>
    </p>
    <?php endif; 
    ?>


    <h2>LOGIN</h2>

    <form action="produtos.html" method="POST">
        <label>E-mail:</label>
        <input type="email" name="email" placeholder="Digite seu e-mail" required>

        <label>Senha:</label>
        <input type="password" name="senha" placeholder="Digite sua senha" required>

        <button type="submit" class="btn-login">Entrar</button>
    </form>

    <div class="links">
        <a href="esquecisenha.php">Esqueci minha senha</a><br>
        <a href="criarconta.php">Criar conta</a>
    </div>

</div>

</body>
</html>
