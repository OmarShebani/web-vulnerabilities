<!DOCTYPE html>
<html lang="en">
<head>
    <title>Comments Section</title>
</head>
<body>
    

    <?php
    $filePath = "email.csv";

    function getData() {
        global $filePath;
        try {
            $data = file_get_contents($filePath);
            $splitData = explode("&", $data); 

            if (isset($splitData[0]) && isset($splitData[1])) {
                return $splitData;
            } else {
                throw new Exception("Could not get the data.");
            }

        } catch (Exception $e) {
            return NULL;
            echo "Error: " . $e->getMessage();
        }
    }

    function changeEmail($email) {
        global $filePath;
        try {
            $email = str_replace('&', '%26', $email);
            $csrfToken = getData()[1];
            $data = "{$email}&{$csrfToken}";
            file_put_contents($filePath, $data);

        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    function generateCsrfToken() {
        global $filePath;
        $email = getData()[0];
        $token = bin2hex(random_bytes(32));
        $data = "{$email}&{$token}";
        file_put_contents($filePath, $data);
        return $token;
    }

    if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === '/') {
        $email = getData()[0];
        $csrfToken = generateCsrfToken();

        if (isset($email) && isset($csrfToken)) {
            echo str_replace('%26', '&', "<h4>{$email}</h4>");
            ?>
            
            <h2>Your Email Address:</h2>
            <h3>Change your email here:</h3>
            <form action="/change-email" method="POST">
                <input type="email" name="email" placeholder="New Email Address" required>
                <input type="text" name="csrfToken" value="<?php echo $csrfToken; ?>" hidden>
                <button type="submit">Confirm</button>
            </form>

            <?php
        } else {
            http_response_code(500);
            echo "Internal Server Error";
        }

    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/change-email' && isset($_POST['email'])) {
        $email = $_POST['email'];
        $csrfToken = $_POST['csrfToken'];

        if ($csrfToken !== getData()[1]) {
            http_response_code(403);
            echo "Access Denied";
            
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(422);
            echo "The email address provided is not valid";

        } else {
            changeEmail($email);
            header("Location: /");
        }
    }
    ?>
</body>
</html>