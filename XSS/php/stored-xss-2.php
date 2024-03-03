<!DOCTYPE html>
<html lang="en">
<head>
    <title>Comments Section</title>
</head>
<body>
    <h2>Comments:</h2> <br>
    <h4>Author: Hacker</h4> <br>

    <?php
    $hackerInput = '<script>alert("Hi")</script>';
    echo "<p>". $hackerInput ."</p>";
    ?>
</body>
</html>