
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Esqueci minha senha</title>
    <style>
        body {margin:0;padding:0;background:#000;color:white;font-family:Arial;display:flex;justify-content:center;align-items:center;height:100vh;}
        .login-box {background:#111;width:350px;padding:30px;border:2px solid #FFD700;border-radius:12px;box-shadow:0 0 25px #ffd70040;}
        h2 {text-align:center;color:#FFD700;}
        label {color:#FFD700;font-weight:bold;}
        input {width:90%;padding:12px;margin:10px 0;border-radius:8px;border:1px solid #FFD700;background:#0a0a0a;color:#FFD700;}
        button {width:100%;padding:12px;background:#FFD700;color:#000;border:none;border-radius:8px;margin-top:15px;}
        button:hover {background:#e6c000;}
        a {color:#FFD700;text-decoration:none;display:block;margin-top:15px;text-align:center;}
    </style>
</head>

<body>

    <div class="login-box">
       <?php
       if (isset($_GET['msg']) && $_GET['msg'] == 'email_enviado') {
        echo "<p style='color:#00ff00; text-align:center; font-weight:bold;'>E-mail enviado com sucesso!</p>";
    }
    ?>


        <h2>Recuperar senha</h2>

        <?php if (!empty($msg)) echo "<p style='color:yellow; text-align:center;'>$msg</p>"; ?>

        <form action= "processaresqueci.php" method="POST">
            <label>Digite seu e-mail:</label>
            <input type="email" name="email" required>

            <button type="submit">Recuperar</button>
        </form>

        <a href="login.php">Voltar</a>
    </div>

</body>
</html>
