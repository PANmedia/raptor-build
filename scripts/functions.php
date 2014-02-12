<?php
function println($string) {
    echo $string . PHP_EOL;
}

function path($path = null) {
    return realpath(__DIR__ . '/../') . '/' . $path;
}

function gitClone($url, $to) {
    println("Cloning $url to $to");
    system("git clone $url $to");
}

function gitPull($path) {
    println("Pulling $path");
    $cwd = getcwd();
    chdir($path);
    system("git pull");
    chdir($cwd);
}

function gitUpdate($name, $repo, $path) {
    if (!is_dir($path)) {
        println("$name repository not found, cloning...");
        gitClone($repo, $path);
    } else {
        println("$name repository found, pulling...");
        gitPull($path);
    }
}

function gitReset($path) {
    if (is_dir($path)) {
        println("Removing $path");
        system("rm -rf $path");
    }
}

function checkTool($tool) {
    if (!commandExists($tool)) {
        println("Command not found: $tool");
        exit(2);
    }
}

/**
 * Determines if a command exists on the current environment
 *
 * http://stackoverflow.com/a/18540185/268074
 *
 * @param string $command The command to check
 * @return bool True if the command has been found ; otherwise, false.
 */
function commandExists($command) {
    $whereIsCommand = (PHP_OS == 'WINNT') ? 'where' : 'which';

    $process = proc_open(
        "$whereIsCommand $command",
        array(
          0 => array("pipe", "r"), //STDIN
          1 => array("pipe", "w"), //STDOUT
          2 => array("pipe", "w"), //STDERR
        ),
        $pipes
    );
    if ($process !== false) {
        $stdout = stream_get_contents($pipes[1]);
        $stderr = stream_get_contents($pipes[2]);
        fclose($pipes[1]);
        fclose($pipes[2]);
        proc_close($process);

        return $stdout != '';
    }

    return false;
}