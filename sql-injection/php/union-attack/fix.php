<!DOCTYPE html>
<html lang="en">
<head>
    <title>Search User</title>
</head>

<body>
    <h2>Search User:</h2>
    <form action="" method="post">
        <input type="text" name="search-user" placeholder="Search">
        <input type="submit" value="Search">
    </form>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (isset($_POST['search-user'])) {

            try {
                $conn = new PDO('mysql:host=localhost;dbname=sql_injection', 'root', '');
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            } catch (PDOException $e) {
                echo 'Connection failed: ' . $e->getMessage();
            }

            $sql = "SELECT username, bio FROM users WHERE username = :username";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':username', $_POST['search-user'], PDO::PARAM_STR);
            $stmt->execute();
            $result = $stmt->fetchall(PDO::FETCH_ASSOC);

            if ($result) {
                foreach ($result as $user) {
                ?>
                    <h3>Username: <?php echo $user['username']; ?></h3>
                    <h4>Bio: <?php echo $user['bio'];?></h4>
                <?php
                }
            } else {
                ?>
                <h3>🤔 We couldn't find anything matching your search. Maybe try using different keywords or check your spelling?</h3>
                <?php
            }
        }
    }
    ?>
</body>
</html>