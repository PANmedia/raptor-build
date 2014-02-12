var _ = require('lodash');
var lib = require('./raptor-builder-lib');
var argv = require('optimist')
        .demand('r')
        .alias('r', 'root')

        .demand('p')
        .alias('p', 'path')
        .describe('p', 'Include path to scan for build files.')

        .alias('i', 'include')
        .describe('i', 'Include the specified module.')

        .alias('z', 'ignore')
        .describe('z', 'Ignore.')

        .alias('x', 'exclude')
        .describe('x', 'Exclude the specified module.')

        .alias('s', 'strip')
        .describe('s', 'Strip pseudo XML blocks.')

        .boolean('c')
        .alias('c', 'compress')
        .describe('c', 'Compress/minify/ulglyfy CSS and JS output.')

        .alias('a', 'sass')
        .describe('a', 'SASS/SCSS libraries to include.')

        .alias('t', 'temp')
        .describe('t', 'Temp directory to put build files in.')

        .alias('l', 'no-libraries')
        .describe('l', 'Exclude libraries.')

        .default({
            r: '.',
            t: 'temp',
            s: [
                'debug',
                'strict'
            ],
            p: [
                'raptor-common',
                'raptor-locales',
                'raptor-dependencies',
                'raptor-editor',
                'raptor-file-manager',
                'raptor-image-editor',
                'raptor-premium',
                'raptor-section',
                'raptor-themes',
            ]
        })
        .argv;

if (argv._.length === 1) {
    switch (argv._[0]) {
        case 'build': {
            builder = require('./raptor-builder');
            builder.setRoot(argv.r);
            builder.setTemp(argv.t);
            builder.setOptions({
                noConflict: argv.n,
                compress: argv.c,
                includeLibraries: !argv.l,
                stripBlocks: argv.s
            });
            lib.args(argv.p, builder.addPath);
            lib.args(argv.a, builder.addSassPath);
            lib.args(argv.i, builder.includeModule);
            lib.args(argv.x, builder.excludeModule);
            builder.build();
            break;
        }
        case 'templates': {
            builder = require('./raptor-builder');
            builder.setRoot(argv.r);
            builder.setTemp(argv.t);
            lib.args(argv.p, builder.addPath);
            lib.args(argv.a, builder.addSassPath);
            lib.args(argv.i, builder.includeModule);
            lib.args(argv.x, builder.excludeModule);
            builder.buildTemplates();
            break;
        }
        case 'modules': {
            builder = require('./raptor-builder');
            builder.setRoot(argv.r);
            lib.args(argv.p, builder.addPath);
            builder.outputModuleNames();
            break;
        }
        case 'modules-json': {
            builder = require('./raptor-builder');
            builder.setRoot(argv.r);
            lib.args(argv.p, builder.addPath);
            builder.outputModules();
            break;
            break;
        }
        default: {
            lib.error('Unknown command: ' + argv._[0]);
        }
    }
}
