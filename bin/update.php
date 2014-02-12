<?php
if (version_compare(PHP_VERSION, '5.5.0') < 0) {
    echo 'PHP 5.5.0+ is required';
    exit(1);
}

require_once __DIR__ . '/../scripts/functions.php';

checkTool('git');
checkTool('node');
checkTool('npm');
checkTool('sass');

@mkdir(path('temp'));
@mkdir(path('packages'));

gitUpdate('Raptor Builder', 'http://github.com/PANmedia/raptor-build.git', path('.'));
gitUpdate('Raptor Editor', 'http://github.com/PANmedia/raptor-editor.git', path('raptor-editor'));
gitUpdate('Raptor Examples', 'http://github.com/PANmedia/raptor-example.git', path('raptor-example'));
gitUpdate('Raptor Locales', 'http://github.com/PANmedia/raptor-locales.git', path('raptor-locales'));
gitUpdate('Raptor Dependencies', 'http://github.com/PANmedia/raptor-dependencies.git', path('raptor-dependencies'));
gitUpdate('Raptor Common', 'http://github.com/PANmedia/raptor-common.git', path('raptor-common'));
gitUpdate('Raptor Themes', 'http://github.com/PANmedia/raptor-themes.git', path('raptor-themes'));
