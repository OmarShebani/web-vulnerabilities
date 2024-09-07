<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Ping A Server</title>
</head>

<body>
    <h2>Ping A Server:</h2>
    <form method="POST" action="">
        <input type="text" name="ip" placeholder="Enter IP address">
        <button type="submit">Ping</button>
    </form>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (isset($_POST['ip'])) {
            $ip = $_POST['ip'];

            if (!filter_var($ip, FILTER_VALIDATE_IP)) {
                echo "<h4>Invalid IP address</h4>";
                exit();
            }

            $output = shell_exec("ping -c 4 " . escapeshellarg($ip));
            echo "<h4>$output</h4>";
    
        }
    }
    ?>
</body>
</html>
