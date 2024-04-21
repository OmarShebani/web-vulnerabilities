<!DOCTYPE html>
<html lang="en">
<head>
    <title>Comments Section</title>
</head>
<body>
    <h2>Comments:</h2>

    <?php
    $filePath = "comments.csv";
    function read_file() {
        global $filePath;
        try {
            $data = file_get_contents($filePath);
            $splitData = explode("\n", $data);

            $comments = array_map(function($element) {
                return explode("&", $element);
            }, $splitData);

            return array_slice($comments, 0, -1);

        } catch (Exception $e) {
            return NULL;
            echo "Error: " . $e->getMessage();
        }
    }

    function storeComment($author, $comment) {
        global $filePath;
        try {
            $author = str_replace('&', '%26', $author);
            $comment = str_replace('&', '%26', $comment);
            $data = "{$author}&{$comment}\n";
            file_put_contents($filePath, $data, FILE_APPEND);

        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/post-comment') {
        if (isset($_POST["author"]) && isset($_POST["comment"])) {
            storeComment($_POST["author"], $_POST["comment"]);
        }
    }

    $comments = read_file();
    if (isset($comments)) {
        foreach ($comments as $item) {
            echo htmlspecialchars("<h4>{$item[0]}:</h4>{$item[1]}");
        }
    }
    ?>

    <br><br><h3>Post A Comment Here:</h3>
    <form action="/post-comment" method="POST">
        <input required="" type="text" name="comment" placeholder="Type Your Comment Here..."> <br><br>
        <input required="" type="text" name="author" placeholder="Type Your Username Here..."> <br><br>
        <button type="submit">Post Comment</button>
    </form>
</body>
</html>