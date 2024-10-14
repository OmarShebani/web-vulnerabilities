<!DOCTYPE html>
<html lang="en">
<head>
    <title>Login</title>
</head>

<body>
    <h2>Login:</h2>
    <form action="" method="post">
        <input type="text" name="username" placeholder="Username"> <br><br>
        <input type="password" name="password" placeholder="Password"> <br><br>
        <input type="submit" value="Login">
    </form>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (isset($_POST['username']) && isset($_POST['password'])) {

            try {
                $conn = new PDO('mysql:host=localhost;dbname=sql_injection', 'root', '');
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            } catch (PDOException $e) {
                echo 'Connection failed: ' . $e->getMessage();
            }

            $sql = "SELECT username, password FROM users WHERE username = :username";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':username', $_POST['username'], PDO::PARAM_STR);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);


            if ($result && $result['password'] === $_POST['password']) {
                echo '<h3>Mission Complete :D</h3>';

            } else {
                echo '<p>Invalid Login</p>';
            }
        }
    }
    ?>
</body>
</html>