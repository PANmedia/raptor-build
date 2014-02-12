var _ = require('lodash');
var cpexec = require('child_process').exec;
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var argv = require('optimist')
        .boolean('v')
        .alias('v', 'verbose')
        .describe('v', 'Enable verbose output.')

        .boolean('d')
        .alias('d', 'debug')
        .describe('d', 'Enable debug output.')

        .boolean('q')
        .alias('q', 'quite')
        .describe('q', 'Disable all output.')

        .default({
            v: false,
            d: false,
            q: false
        })
        .argv;

var verbose = argv.v;
var debug = argv.d;
var quite = argv.q;

module.exports = {
    args: args,
    copyFileSync: copyFileSync,
    humanFileSize: humanFileSize,
    cleanString: cleanString,
    statFile: statFile,
    gzipFile: gzipFile,
    mkdirsSync: mkdirsSync,
    writeLine: writeLine,
    writeDebug: writeDebug,
    error: error,
    exec: exec
};

function args(args, callback) {
    if (args) {
        if (!(args instanceof Array)) {
            args = [args];
        }
        _.each(args, function(arg) {
            callback(arg);
        });
    }
}

function error(error) {
    console.error(error);
    process.exit(1);
}

function writeLine(line) {
    if (!quite) {
        console.log(line);
    }
}

function writeVerbose(line) {
    if (!quite && verbose) {
        console.log(line);
    }
}

function writeDebug(line) {
    if (!quite && debug) {
        console.log(line);
    }
}

function mkdirsSync(dir) {
    dir = dir.replace(/\\/g, '/');
    if (!fs.existsSync(dir)) {
        writeVerbose('Creating directory: ' + dir);
        mkdirp.sync(dir, 0777);
    }
}

function copyFileSync(srcFile, destFile) {
    mkdirsSync(path.dirname(destFile));
    writeVerbose('Copying file ' + srcFile + ' to ' + destFile);
    var BUF_LENGTH, buff, bytesRead, fdr, fdw, pos;
    BUF_LENGTH = 64 * 1024;
    buff = new Buffer(BUF_LENGTH);
    fdr = fs.openSync(srcFile, "r");
    fdw = fs.openSync(destFile, "w");
    bytesRead = 1;
    pos = 0;
    while (bytesRead > 0) {
        bytesRead = fs.readSync(fdr, buff, 0, BUF_LENGTH, pos);
        fs.writeSync(fdw, buff, 0, bytesRead);
        pos += bytesRead;
    }
    fs.closeSync(fdr);
    return fs.closeSync(fdw);
};

function humanFileSize(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if(bytes < thresh) return bytes + ' B';
    var units = si ? ['kB','MB','GB','TB','PB','EB','ZB','YB'] : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(bytes >= thresh);
    return bytes.toFixed(1)+' '+units[u];
};

function cleanString(string) {
    return string.replace(/\s+/g, '-').toLowerCase();
};

function statFile(file) {
    fs.stat(file, function(error, info) {
        if (info) {
            writeDebug(file + ' size: ' + humanFileSize(info.size));
        } else {
            writeDebug('Could not stat file: ' + file);
        }
    });
};

function gzipFile(inputFile) {
    exec('cat ' + inputFile + ' | gzip -9 > ' + inputFile + '.gz', function (error, stdout, stderr) {
        statFile(inputFile + '.gz');
    });
};

function exec(command, callback) {
    cpexec(command, function(errorObj, stdout, stderr) {
        if (stdout.trim()) {
            writeDebug(stdout.trim());
        }
        if (stderr.trim()) {
            writeDebug(stderr.trim());
        }
        if (errorObj !== null) {
            error(errorObj);
        }
        callback(errorObj, stdout, stderr);
    });
}
