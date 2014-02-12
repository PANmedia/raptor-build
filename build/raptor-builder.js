var _ = require('lodash');
var cleanCSS = require('clean-css');
var fs = require('fs');
var fs2 = require('file');
var path = require('path');
var rimraf = require('rimraf');
var uglify = require('uglify-js');
var lib = require('./raptor-builder-lib');

module.exports = {
    addLocale: addLocale,
    addModule: addModule,
    addPath: addPath,
    addSassPath: addSassPath,
    build: build,
    buildTemplates: buildTemplates,
    excludeModule: excludeModule,
    includeModule: includeModule,
    outputModuleNames: outputModuleNames,
    outputModules: outputModules,
    setOptions: setOptions,
    setRoot: setRoot,
    setTemp: setTemp
};

var addedModules = [];
var modules = [];
var paths = [];
var sassPaths = [];
var includes = [];
var excludes = [];
var temp;
var root;
var currentRoot;
var options = {
    stripBlocks: [],
    compress: true,
    compileCSS: true,
    mergeCSS: true,
    includeLibraries: true,
    // Debug
    // compileCSS: false,
    // stripBlocks: false,
    // compress: false,
};

function setOptions(newOptions) {
    for (var option in newOptions) {
        options[option] = newOptions[option];
    }
}

function includeModule(module) {
    includes.push(module);
}

function excludeModule(module) {
    excludes.push(module);
}

function setRoot(newRoot) {
    root = fs.realpathSync(newRoot) + '/';
    if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
        lib.error('Expected root to be an existing directory: ' + newRoot)
        lib.error('Root real path: ' + root)
    }
    lib.writeDebug('Set root to: ' + root);
}

function setTemp(newTemp) {
    temp = newTemp;
    lib.mkdirsSync(newTemp, 0777);
    lib.writeDebug('Set temp to: ' + newTemp);
}

function addModule(module) {
    module = _.extend({
        root: currentRoot,
        name: null,
        description: null,
        group: null,
        link: null,
        hidden: false,
        files: [],
        include: [],
        depends: [],
    }, module);
    modules.push(module);
};

function addLocale(module) {
    var exists = false;
    _.each(modules, function(m) {
        if (m.type === 'locale' && m.name === module.name) {
            lib.writeDebug('Extending Locale: ' + module.name);
            m.files = m.files.concat(module.files);
            exists = true;
        }
    });
    if (!exists) {
        module = _.extend({
            root: currentRoot,
            type: 'locale',
            locale: null,
            name: null,
            files: [],
            include: [],
            depends: [
                'Common'
            ],
        }, module);
        modules.push(module);
    }
};

function outputModules() {
    lib.writeLine(JSON.stringify(getModules(), null, 4));
};

function outputModuleNames() {
    var result = [];
    _.each(getModules(), function(module) {
        result.push(module.name);
    });
    lib.writeLine(JSON.stringify(result, null, 4));
};

function addPath(path) {
    if (!fs.existsSync(path)) {
        lib.writeLine('Skipping missing path: ' + path);
        return;
    }
    lib.writeDebug('Adding path: ' + fs.realpathSync(root + path));
    paths.push(fs.realpathSync(root + path));
};

function addSassPath(path) {
    lib.writeDebug('Adding SASS path: ' + root + path);
    sassPaths.push(fs.realpathSync(root + path));
};

function getModules() {
    if (addedModules.length === 0) {
        var addedLog = [];
        var skippedLog = [];
        var excludedLog = [];
        for (var i = 0; i < paths.length; i++) {
            fs2.walkSync(paths[i], function(file) {
                if (fs.existsSync(file + '/build.js')) {
                    readBuildFile(file + '/build.js');
                }
            });
        }
        var added = [];
        function add(module, dependant) {
            if (_.find(added, {
                        name: module.name
                    })) {
                return;
            }
            if (excludes.indexOf(module.name) !== -1) {
                excludedLog.push(module.name);
                return;
            }
            if (includes.length !== 0 && includes.indexOf(module.name) === -1 && !dependant) {
                skippedLog.push(module.name);
                return;
            }
            for (var i = 0; i < module.depends.length; i++) {
                var depends = _.find(modules, {
                    name: module.depends[i]
                });
                if (typeof depends === 'undefined') {
                    lib.error('Failed to find dependency: ' + module.depends[i] + ' for: ' + module.name);
                } else {
                    add(depends, true);
                }
            }
            addedLog.push(module.name);
            added.push(module);
            for (var i = 0; i < module.include.length; i++) {
                _(modules).filter({
                    type: module.include[i]
                }).each(add);
            }
        }
        for (var i = 0; i < modules.length; i++) {
            if (modules[i].type === 'library') {
                add(modules[i]);
            }
        }
        for (var i = 0; i < modules.length; i++) {
            add(modules[i]);
        }

        addedModules = added;

        lib.writeDebug('Added modules: ' + addedLog.join(', '));
        lib.writeDebug('Skipped modules: ' + skippedLog.join(', '));
        lib.writeDebug('Excluded modules: ' + excludedLog.join(', '));
    }
    return addedModules;
};

function build() {
    var added = getModules();
    if (fs.existsSync(temp)) {
        if (fs.statSync(temp).isDirectory()) {
            lib.writeDebug('Removing temp directory: ' + temp);
            rimraf.sync(temp);
        }
    }
    lib.mkdirsSync(temp, 0777);
    var tempStyleDir = temp + '/style';
    lib.mkdirsSync(tempStyleDir, 0777);
    lib.mkdirsSync(tempStyleDir + '/images', 0777);

    lib.writeDebug('Preparing files...');
    var templates = {};
    var jsData = '';
    var scssManifest = '';
    var scssFrontEnd = '';
    var cssContent = '';
    var themeAdded = false;
    jsData += "(function(){";
    _.each(added, function(added) {
        if (!options.includeLibraries && added.type == 'library') {
            lib.writeDebug('Ignored: ' + added.name);
            return;
        }
        if (added.type == 'theme') {
            if (themeAdded) {
                lib.writeDebug('Skipped theme: ' + added.name);
                return;
            } else {
                themeAdded = true;
            }
        }
        _.each(added.files, function(file) {
            switch (path.extname(file)) {
                case '':
                case '.js': {
                    jsData += ";\n";
                    jsData += "// File start: " + file;
                    jsData += "\n";
                    jsData += fs.readFileSync(file);
                    jsData += ";\n";
                    jsData += "// File end: " + file;
                    jsData += "\n";
                    break;
                }
                case '.png':
                case '.gif':
                case '.jpg':
                case '.jpeg': {
                    lib.copyFileSync(file, tempStyleDir + '/images/' + path.basename(file));
                    break;
                }
                case '.rb':
                case '.css':
                case '.scss': {
                    var import2 = true;
                    var scssPath;
                    var scssShortPath;
                    if (added.type != 'core') {
                        var pluginName = lib.cleanString(added.name);
                        var pluginPath = path.dirname(fs.realpathSync(file).substring(added.root.length));
                        scssPath = tempStyleDir + '/' + pluginName + pluginPath;
                        scssShortPath = pluginName + pluginPath + '/';
                        scssShortPath = scssShortPath.replace(/[\\/]/g, '/');
                        lib.copyFileSync(file, scssPath + '/' + path.basename(file));
                    } else {
                        scssPath = tempStyleDir;
                        scssShortPath = '';
                        lib.copyFileSync(file, scssPath + '/' + path.basename(file));
                    }
                    if (import2 && path.extname(file) == '.scss') {
                        if (file.match(/-front-end/)) {
                            scssFrontEnd += '@import "' + scssShortPath + path.basename(file) + '";\n';
                        } else if (!file.match(/src[\\/]style/)) {
                            scssManifest += '@import "' + scssShortPath + path.basename(file) + '";\n';
                        }
                    } else if (path.extname(file) == '.css') {
                        cssContent += fs.readFileSync(file).toString() + "\n\n";
                    }
                    break;
                }
                case '.html': {
                    var name = path.basename(file);
                    name = name.substring(0, name.length - 5);
                    if (added.type == 'plugin') {
                        templates[lib.cleanString(added.name) + '.' + name] = fs.readFileSync(file).toString().replace(/\s+/g, ' ').trim();
                    } else {
                        templates[name] = fs.readFileSync(file).toString().replace(/\s+/g, ' ').trim();
                    }
                    break;
                }
                default: {
                    lib.writeDebug('No hanlder for: ' + path.extname(file));
                }
            }
        });
    });

    if (options.stripBlocks) {
        lib.writeDebug('Replacing tokens...');
        _.each(options.stripBlocks, function(block) {
            var regex = new RegExp('//\\s*<(' + block + ')>([\\s\\S]*?)//\\s*</(' + block + ')>', 'g');
            jsData = jsData.replace(regex, function(string, block) {
                return '// <' + block + '/>'
            });
        });
    }

    lib.writeDebug('Caching templates...');
    templates = JSON.stringify(templates, null, 4);
    templates = templates.substr(1, templates.length - 2);
    jsData = jsData.replace(/\/\* <templates\/> \*\//g, templates);

    jsData += "})();";

    lib.writeDebug('Compiling SCSS...');
    fs.writeFileSync(tempStyleDir + '/manifest.scss', scssManifest);
    fs.writeFileSync(tempStyleDir + '/front-end.scss', scssFrontEnd);
    fs.appendFileSync(tempStyleDir + '/raptor.scss', '@import "manifest.scss";');
    compileSCSS(tempStyleDir, 'front-end.scss', 'raptor-front-end.css', function(css) {
        packageFile(tempStyleDir + '/raptor-front-end.css');
        if (options.compress) {
            compressCSS(tempStyleDir + '/raptor-front-end.css', tempStyleDir + '/raptor-front-end.min.css');
            packageFile(tempStyleDir + '/raptor-front-end.min.css');
        }
    });

    compileSCSS(tempStyleDir, 'raptor.scss', 'raptor.css', function(css) {
        css = cssContent + css;
        fs.writeFileSync(tempStyleDir + '/raptor.css', css);
        var cssJS = '\'<style type="text/css">' + css.replace(/\\/g, '\\\\').replace(/[\n\r]/g, '\\n\\\n').replace(/'/g, '\\') + '</style>\'';

        var cssJSMin;
        if (options.compress) {
            cssJSMin = compressCSS(tempStyleDir + '/raptor.css', tempStyleDir + '/raptor.min.css');
            cssJSMin = '\'<style type="text/css">' + cssJSMin.replace(/\\/g, '\\\\').replace(/[\n\r]/g, '\\n\\\n').replace(/'/g, '\\') + '</style>\'';
        }

        lib.writeDebug('Writing: ' + temp + '/raptor.js');
        if (options.mergeCSS) {
            fs.writeFileSync(temp + '/raptor.js', jsData + 'document.write(' + cssJS + ');');
        } else {
            fs.writeFileSync(temp + '/raptor.js', jsData);
        }
        lib.statFile(temp + '/raptor.js');
        packageFile(temp + '/raptor.js');
        packageFile(tempStyleDir + '/raptor.css');

        if (options.compress) {
            lib.writeDebug('Uglifying JS...');
            if (options.mergeCSS) {
                fs.writeFileSync(temp + '/raptor.min.js', jsData + 'document.write(' + cssJSMin + ');');
            } else {
                fs.writeFileSync(temp + '/raptor.min.js', jsData);
            }
            try {
                jsData = uglify.minify(temp + '/raptor.min.js', {
                    warnings: true,
                    mangle: {},
                    compress: {}
                }).code;
            } catch (e) {
                lib.writeDebug(e.toString());
                return;
            }
            lib.writeDebug('Writing: ' + temp + '/raptor.min.js');
            fs.writeFileSync(temp + '/raptor.min.js', jsData);
            lib.statFile(temp + '/raptor.min.js');
            packageFile(temp + '/raptor.min.js');
            lib.gzipFile(temp + '/raptor.min.js');
            packageFile(tempStyleDir + '/raptor.min.css');
        }

//        lib.writeDebug('Removing temp directory: ' + temp);
//        rimraf.sync(temp);
    });
};

function buildTemplates() {
    var added = getModules();
    _.each(added, function(added) {
        if (!options.includeLibraries && added.type == 'library') {
            lib.writeDebug('Ignored: ' + added.name);
            return;
        }
        lib.writeDebug('Adding: ' + added.name);
        var templates = [];
        _.each(added.files, function(file) {
            switch (path.extname(file)) {
                case '.html': {
                    var name = path.basename(file);
                    name = name.substring(0, name.length - 5);
                    var content = JSON.stringify(fs.readFileSync(file).toString().replace(/\s+/g, ' ').trim());
                    if (added.type == 'plugin') {
                        templates.push('templateRegister(' + JSON.stringify(lib.cleanString(added.name) + '.' + name) + ', ' + content + ');')
                    } else {
                        templates.push('templateRegister(' + JSON.stringify(name) + ', ' + content + ');')
                    }
                    break;
                }
            }
        });
        if (templates.length) {
            lib.writeDebug('Found ' + templates.length + ' template(s), writing: ' + added.root + '/templates.js');
            fs.writeFile(added.root + '/templates.js', templates.join("\n"));
        }
    });
};

function readBuildFile(file) {
    lib.writeDebug('Reading: ' + file);
    currentRoot = path.dirname(fs.realpathSync(file));
    require(file);
};

function compressJS() {

};

function compressCSS(inputFile, outputFile) {
    lib.writeDebug('Cleaning CSS: ' + inputFile);
    var css = fs.readFileSync(inputFile).toString();
    var cssMin = cleanCSS.process(css);
    fs.writeFileSync(outputFile, cssMin);
    lib.statFile(outputFile);
    return cssMin;
};

function compileSCSS(path, inputFile, outputFile, callback) {
    var loadPath = '';
    if (sassPaths.length > 0) {
        loadPath = '--load-path ' + sassPaths.join(' --load-path ');
    }
    lib.writeDebug('cd ' + path + ' && sass -l --style expanded --compass -r susy ' + loadPath + ' ' + inputFile + ' ' + outputFile);
    lib.exec('cd ' + path + ' && sass -l --style expanded --compass -r susy ' + loadPath + ' ' + inputFile + ' ' + outputFile, function (error, stdout, stderr) {
        lib.statFile(path + '/' + outputFile);
        fs.readFile(path + '/' + outputFile, function(error, css) {
            if (css) {
                callback(css.toString());
            }
        });
    });
};

function packageFile(file) {
    var packageDir = root + '/packages/';
    lib.copyFileSync(file, packageDir + path.basename(file));
    lib.writeDebug('Packaged file: ' + packageDir + path.basename(file))
};
