<!DOCTYPE html>
<html lang="en">
<head>
    <title>Search Page</title>
</head>
<body>
    <h2>Search for your item here:</h2>

    <?php
    $searchItem = isset($_GET['searchItem']) ? $_GET['searchItem'] : '';
    echo "<p>Search results for: " . $searchItem . "</p>";
    ?>

    <form action="" method="get">
        <input type="text" name="searchItem">
        <button type="submit">Search</button>
    </form>

</body>
</html>