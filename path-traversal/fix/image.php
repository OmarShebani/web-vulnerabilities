<?php
if (isset($_GET['filename'])) {
    $filename = $_GET['filename'];

    // Sanitize the filename by removing any directory traversal sequences
    $filename = basename($filename);

    $baseDir = realpath('../images/');
    $filepath = $baseDir . DIRECTORY_SEPARATOR . $filename;

    // Ensure the resolved path is within the base directory
    if (strpos(realpath($filepath), $baseDir) !== 0) {
        header("HTTP/1.1 400 Bad Request");
        echo "Invalid file path.";
        exit;
    }
    
    if (file_exists($filepath)) {
        // Get the file's mime type
        $fileinfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime = finfo_file($fileinfo, $filepath);
        finfo_close($fileinfo);
    
        // Set the appropriate headers
        header('Content-Type: ' . $mime);
        header('Content-Length: ' . filesize($filepath));

        // If the download parameter is set, force the file to be downloaded with the specified name
        if (isset($_GET['download'])) {
            header('Content-Disposition: attachment; filename="' . basename($_GET['download']) . '"');
        }

        // Output the file content
        readfile($filepath);
        exit;
    } else {
        // File not found
        header("HTTP/1.1 404 Not Found");
        echo "File not found.";
        exit;
    }
} else {
    // No filename provided
    header("HTTP/1.1 400 Bad Request");
    echo "No filename provided.";
    exit;
}
?>