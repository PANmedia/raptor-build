<?php
$public = realpath(__DIR__ . '/../');
$request = substr($_SERVER["REQUEST_URI"], 0, strpos($_SERVER["REQUEST_URI"], '?') ?: strlen($_SERVER["REQUEST_URI"]));
if (is_dir($public . $request)) {
    foreach (scandir($public . $request) as $file) {
        if ($file[0] === '.' && $file !== '..') {
            continue;
        }
        if (is_dir($public . $request . $file)) {
            $file .= '/';
        }
        echo "<a href='$file'>$file</a><br/>";
    }
    return true;
} elseif (!is_file($public . $request)) {
    return false;
}
return false;
