
var manifest = {
    libraries: {
        'rangy': {
            'name': 'Rangy',
            'description': '<a href="http://code.google.com/p/rangy/">http://code.google.com/p/rangy/</a>',
            'files': [
                '// Rangy',
                'src/dependencies/rangy/rangy-core.js',
                'src/dependencies/rangy/rangy-applier.js',
                'src/dependencies/rangy/rangy-cssclassapplier.js',
                'src/dependencies/rangy/rangy-selectionsaverestore.js',
                'src/dependencies/rangy/rangy-serializer.js',
                'src/dependencies/rangy/rangy-textrange.js'
            ]
        },
        'jquery': {
            'name': 'jQuery',
            'description': '<a href="http://jquery.com/">http://jquery.com/</a>',
            'files': [
                '// jQuery',
                'src/dependencies/jquery.js'
            ]
        },
        'jquery-ui': {
            'name': 'jQuery UI',
            'description': '<a href="http://jqueryui.com/">http://jqueryui.com/</a>',
            'files': [
                'src/dependencies/jquery-ui.js'
            ]
        },
        'jquery-hotkeys': {
            'name': 'jQuery Hotkeys',
            'description': '<a href="https://github.com/jeresig/jquery.hotkeys/">https://github.com/jeresig/jquery.hotkeys/</a>',
            'files': [
                'src/dependencies/jquery-hotkeys.js'
            ]
        }
    },
    'plugins': {
        'cancel': {
            'name': 'Cancel editing',
            'group': 'Other plugins',
            'description': 'Button to promt the user to disable editing and revert all changes back to their original state.',
            'files': [
                'src/plugins/cancel/cancel.js',
                'src/plugins/cancel/cross.png',
                'src/plugins/cancel/cancel.scss'
            ]
        },
        'class-menu': {
            'name': 'Class menu',
            'group': 'Advanced editing plugins',
            'description': 'Drop down menu to allow selecting a class to be applied to a block level element.',
            'files': [
                'src/plugins/class-menu/class-menu.js',
                'src/plugins/class-menu/palette-paint-brush.png',
                'src/plugins/class-menu/class-menu.scss',
                'src/plugins/class-menu/templates/item.html'
            ]
        },
        'clear-formatting': {
            'name': 'Clear formatting',
            'group': 'Text styling',
            'description': 'Button that removes all formatting from the selected text.',
            'files': [
                'src/plugins/clear-formatting/clear-formatting.js',
                'src/plugins/clear-formatting/clear-formatting.png',
                'src/plugins/clear-formatting/clear-formatting.scss'
            ]
        },
        'click-to-edit-button': {
            'name': 'Click to edit button',
            'group': 'Other plugins',
            'description': 'Button that appears over an editable block when the mouse hovers it that when clicked enables Raptor.',
            'files': [
                'src/plugins/click-button-to-edit/click-button-to-edit.js',
                'src/plugins/click-button-to-edit/pencil.png',
                'src/plugins/click-button-to-edit/click-button-to-edit.scss',
                'src/plugins/click-button-to-edit/templates/button.html'
            ]
        },
        'color-menu': {
            'name': 'Color menu',
            'group': 'Advanced editing plugins',
            'description': 'Drop down menu to allow changing text color.',
            'files': [
                'src/plugins/color-menu-basic/color-menu-basic.js',
                'src/plugins/color-menu-basic/color-menu-basic-front-end.scss',
                'src/plugins/color-menu-basic/color-menu-basic.scss',
                'src/plugins/color-menu-basic/templates/menu.html'
            ]
        },
        'dock-to-element': {
            'name': 'Dock to element',
            'group': 'Other plugins',
            'description': 'Enables Raptor to be able to be docked to an element, such as for making rich text comment forms.',
            'files': [
                'src/plugins/dock/dock-to-element.js',
                'src/plugins/dock/application-dock-tab.png',
                'src/plugins/dock/dock-to-element.scss'
            ],
            'dependencies': [
                'src/plugins/dock/dock-plugin.js',
                'src/plugins/dock/dock.scss'
            ]
        },
        'dock-to-screen': {
            'name': 'Dock to screen',
            'group': 'Other plugins',
            'description': 'Enables Raptor to be able to be docked to the top of the browser window.',
            'files': [
                'src/plugins/dock/dock-to-screen.js',
                'src/plugins/dock/application-dock-090.png',
                'src/plugins/dock/dock-to-screen.scss'
            ],
            'dependencies': [
                'src/plugins/dock/dock-plugin.js',
                'src/plugins/dock/dock.scss'
            ]
        },
        'embed': {
            'name': 'Embed',
            'group': 'Advanced editing plugins',
            'description': 'Allows embedding of video, flash, and other widgets.',
            'files': [
                'src/plugins/embed/embed.js',
                'src/plugins/embed/youtube.png',
                'src/plugins/embed/embed.scss',
                'src/plugins/embed/templates/dialog.html'
            ]
        },
        'float': {
            'name': 'Align (float) images',
            'group': 'Text styling',
            'description': 'Allows aligning (floating) images.',
            'files': [
                'src/plugins/float/float-left.js',
                'src/plugins/float/float-none.js',
                'src/plugins/float/float-right.js',
                'src/plugins/float/edit-image-none.png',
                'src/plugins/float/edit-image-right.png',
                'src/plugins/float/edit-image.png',
                'src/plugins/float/float-front-end.scss',
                'src/plugins/float/float.scss'
            ]
        },
        'guides': {
            'name': 'Guides',
            'group': 'Other plugins',
            'description': 'Toggle guides (outlines) around block elements inside an editable region.',
            'files': [
                'src/plugins/guides/guides.js',
                'src/plugins/guides/guide.png',
                'src/plugins/guides/guides.scss'
            ]
        },
        'history': {
            'name': 'History',
            'group': 'Other plugins',
            'description': 'Adds undo and redo buttons.',
            'files': [
                'src/plugins/history/history-redo.js',
                'src/plugins/history/history-undo.js',
                'src/plugins/history/arrow-curve-180-left.png',
                'src/plugins/history/arrow-curve.png',
                'src/plugins/history/history.scss'
            ]
        },
        'hr': {
            'name': 'Insert horizontal rule',
            'group': 'Text styling',
            'description': 'Button to insert horizontal rule elements',
            'files': [
                'src/plugins/hr/hr-create.js',
                'src/plugins/hr/edit-rule.png',
                'src/plugins/hr/hr.scss'
            ]
        },
        'image-resize-button': {
            'name': 'Image resize button',
            'group': 'Other plugins',
            'description': 'Allows resizing images by hovering over them and clicking a button to open a resize dialog.',
            'files': [
                'src/plugins/image-resize-button/image-resize-button.js',
                'src/plugins/image-resize-button/image-resize.png',
                'src/plugins/image-resize-button/image-resize-button.scss',
                'src/plugins/image-resize-button/templates/button.html',
                'src/plugins/image-resize-button/templates/dialog.html'
            ]
        },
        'insert-file-button': {
            'name': 'Insert file button',
            'group': 'Advanced editing plugins',
            'description': 'Allows simple insertion of images etc.',
            'files': [
                'src/plugins/insert-file/insert-file.js',
                'src/plugins/insert-file/image.png',
                'src/plugins/insert-file/insert-file.scss',
                'src/plugins/insert-file/templates/dialog.html'
            ]
        },
        'linking': {
            'name': 'Linking',
            'group': 'Advanced editing plugins',
            'description': 'Allows links to be creates and removed including email, internal, external and file/document links.',
            'files': [
                'src/plugins/link/link-create.js',
                'src/plugins/link/link-remove.js',
                'src/plugins/link/link-type-document.js',
                'src/plugins/link/link-type-email.js',
                'src/plugins/link/link-type-external.js',
                'src/plugins/link/link-type-internal.js',
                'src/plugins/link/chain-unchain.png',
                'src/plugins/link/chain.png',
                'src/plugins/link/link.scss',
                'src/plugins/link/templates/dialog.html',
                'src/plugins/link/templates/document.html',
                'src/plugins/link/templates/email.html',
                'src/plugins/link/templates/error.html',
                'src/plugins/link/templates/external.html',
                'src/plugins/link/templates/file-url.html',
                'src/plugins/link/templates/internal.html',
                'src/plugins/link/templates/label.html'
            ]
        },
        'list': {
            'name': 'List',
            'group': 'Advanced editing plugins',
            'description': 'Allows orders and unordered lists to be inserted.',
            'files': [
                'src/plugins/list/list-ordered.js',
                'src/plugins/list/list-unordered.js',
                'src/plugins/list/edit-list-order.png',
                'src/plugins/list/edit-list.png',
                'src/plugins/list/list.scss'
            ]
        },
        'advanced-paste': {
            'name': 'Advanced paste',
            'group': 'Other plugins',
            'description': 'Enables triggering a dialog input on a paste event to clean pasted content.',
            'files': [
                'src/plugins/paste/paste.js',
                'src/plugins/paste/paste.scss',
                'src/plugins/paste/templates/dialog.html'
            ]
        },
        'save-json': {
            'name': 'Save JSON',
            'group': 'Other plugins',
            'description': 'Save JSON interface (sends mutliple content block in 1 request, encoded as JSON).',
            'files': [
                'src/plugins/save/save-json.js'
            ],
            'dependencies': [
                'src/plugins/save/save.js',
                'src/plugins/save/disk-black.png',
                'src/plugins/save/save.scss'
            ]
        },
        'save-rest': {
            'name': 'Save REST',
            'group': 'Other plugins',
            'description': 'Save REST interface (sends each content block in its own request).',
            'files': [
                'src/plugins/save/save-rest.js'
            ],
            'dependencies': [
                'src/plugins/save/save.js',
                'src/plugins/save/disk-black.png',
                'src/plugins/save/save.scss'
            ]
        },
        'snippet-menu': {
            'name': 'Snippet menu',
            'group': 'Advanced editing plugins',
            'description': 'Menu of customised HTML snippets that can be inserted.',
            'files': [
                'src/plugins/snippet-menu/snippet-menu.js',
                'src/plugins/snippet-menu/document-snippet.png',
                'src/plugins/snippet-menu/snippet-menu.scss',
                'src/plugins/snippet-menu/templates/item.html'
            ]
        },
        'statistics': {
            'name': 'Statistics',
            'group': 'Other plugins',
            'description': 'Enables usage statistics on contents blocks such as word counts. Can warn the user if the content is too long.',
            'files': [
                'src/plugins/statistics/statistics.js',
                'src/plugins/statistics/dashboard.png',
                'src/plugins/statistics/statistics.scss',
                'src/plugins/statistics/templates/dialog.html'
            ]
        },
        'table': {
            'name': 'Table',
            'group': 'Advanced editing plugins',
            'description': 'Enables table insertion and modification, as well as extended support for dealing with selection inside table cells.',
            'files': [
                'src/plugins/table/table-cell-button.js',
                'src/plugins/table/table-create.js',
                'src/plugins/table/table-delete-column.js',
                'src/plugins/table/table-delete-row.js',
                'src/plugins/table/table-insert-column.js',
                'src/plugins/table/table-insert-row.js',
                'src/plugins/table/table-support.js',
                'src/plugins/table/style/table-support.scss',
                'src/plugins/table/style/table.scss',
                'src/plugins/table/style/images/table-delete-column.png',
                'src/plugins/table/style/images/table-delete-row.png',
                'src/plugins/table/style/images/table-insert-column.png',
                'src/plugins/table/style/images/table-insert-row.png',
                'src/plugins/table/style/images/table-join.png',
                'src/plugins/table/style/images/table-split.png',
                'src/plugins/table/style/images/table.png',
                'src/plugins/table/templates/create-menu.html'
            ],
            'dependencies': [
                'src/dependencies/goog-table.js',
                'src/dependencies/resizetable.js'
            ]
        },
        'tag-menu': {
            'name': 'Tag menu',
            'group': 'Advanced editing plugins',
            'description': 'Menu of block elements (H1, H2, P, etc) that can be set.',
            'files': [
                'src/plugins/tag-menu/tag-menu.js',
                'src/plugins/tag-menu/edit.png',
                'src/plugins/tag-menu/tag-menu.scss',
                'src/plugins/tag-menu/templates/menu.html'
            ]
        },
        'text-align': {
            'name': 'Text align',
            'group': 'Text styling',
            'description': 'Text alignment buttons (left, right, center, justify)',
            'files': [
                'src/plugins/text-align/text-align-button.js',
                'src/plugins/text-align/center.js',
                'src/plugins/text-align/justify.js',
                'src/plugins/text-align/left.js',
                'src/plugins/text-align/right.js',
                'src/plugins/text-align/style/text-align-front-end.scss',
                'src/plugins/text-align/style/text-align.scss',
                'src/plugins/text-align/style/images/edit-alignment-center.png',
                'src/plugins/text-align/style/images/edit-alignment-justify.png',
                'src/plugins/text-align/style/images/edit-alignment-right.png',
                'src/plugins/text-align/style/images/edit-alignment.png'
            ]
        },
        'block-quote': {
            'name': 'Block quote',
            'group': 'Text styling',
            'description': 'Button to toggle the &lt;blockquote&gt; element',
            'files': [
                'src/plugins/text-style/block-quote.js',
                'src/plugins/text-style/style/block-quote.scss',
                'src/plugins/text-style/style/images/edit-quotation.png'
            ]
        },
        'bold': {
            'name': 'Bold',
            'group': 'Text styling',
            'description': 'Buttons for toggling bold text.',
            'files': [
                'src/plugins/text-style/bold.js',
                'src/plugins/text-style/style/bold-front-end.scss',
                'src/plugins/text-style/style/bold.scss',
                'src/plugins/text-style/style/images/edit-bold.png'
            ]
        },
        'italic': {
            'name': 'Italic',
            'group': 'Text styling',
            'description': 'Button for toggling italic text.',
            'files': [
                'src/plugins/text-style/italic.js',
                'src/plugins/text-style/style/italic-front-end.scss',
                'src/plugins/text-style/style/italic.scss',
                'src/plugins/text-style/style/images/edit-italic.png'
            ]
        },
        'underline': {
            'name': 'Underline',
            'group': 'Text styling',
            'description': 'Button for toggling underlined text.',
            'files': [
                'src/plugins/text-style/underline.js',
                'src/plugins/text-style/style/underline-front-end.scss',
                'src/plugins/text-style/style/underline.scss',
                'src/plugins/text-style/style/images/edit-underline.png'
            ]
        },
        'strike': {
            'name': 'Strike through',
            'group': 'Text styling',
            'description': 'Button for toggling striked out text.',
            'files': [
                'src/plugins/text-style/strike.js',
                'src/plugins/text-style/style/strike-front-end.scss',
                'src/plugins/text-style/style/strike.scss',
                'src/plugins/text-style/style/images/edit-strike.png'
            ]
        },
        'text-size': {
            'name': 'Text size buttons',
            'group': 'Text styling',
            'description': 'Buttons for increasing and descreasing the text size.',
            'files': [
                'src/plugins/text-style/size-decrease.js',
                'src/plugins/text-style/size-increase.js',
                'src/plugins/text-style/style/text-size.scss',
                'src/plugins/text-style/style/images/edit-size-down.png',
                'src/plugins/text-style/style/images/edit-size-up.png'
            ]
        },
        'sub-sup': {
            'name': 'Sub/super script',
            'group': 'Text styling',
            'description': 'Buttons for toggling sub and super scripts elements.',
            'files': [
                'src/plugins/text-style/sub.js',
                'src/plugins/text-style/super.js',
                'src/plugins/text-style/style/sub.scss',
                'src/plugins/text-style/style/super.scss',
                'src/plugins/text-style/style/images/edit-subscript.png',
                'src/plugins/text-style/style/images/edit-superscript.png'
            ]
        },
        'tool-tips': {
            'name': 'Stylised tool tips',
            'group': 'Other plugins',
            'description': 'Makes tool tips prettier.',
            'files': [
                'src/plugins/tool-tip/tool-tip.js',
                'src/plugins/tool-tip/tip.png',
                'src/plugins/tool-tip/tool-tip.scss'
            ]
        },
        'unsaved-edit': {
            'name': 'Unsaved edit warning',
            'group': 'Other plugins',
            'description': 'Displays a message in the corent of the browser when there is unsaved changes to an editable block on the page.',
            'files': [
                'src/plugins/unsaved-edit-warning/unsaved-edit-warning.js',
                'src/plugins/unsaved-edit-warning/unsaved-edit-warning.scss',
                'src/plugins/unsaved-edit-warning/templates/warning.html'
            ]
        },
        'view-source': {
            'name': 'View source',
            'group': 'Advanced editing plugins',
            'description': 'Allows the user to view and edit the source code for a editable block.',
            'files': [
                'src/plugins/view-source/view-source.js',
                'src/plugins/view-source/edit-code.png',
                'src/plugins/view-source/view-source.scss',
                'src/plugins/view-source/templates/dialog.html'
            ]
        },
        'spec-chars': {
            'name': 'Special characters dialog',
            'group': 'Advanced editing plugins',
            'description': 'Allows insertion of special characters.',
            'files': [
                'src/plugins/special-characters/special-characters.js',
                'src/plugins/special-characters/edit-symbol.png',
                'src/plugins/special-characters/special-characters.scss',
                'src/plugins/special-characters/templates/dialog.html',
                'src/plugins/special-characters/templates/tab-li.html',
                'src/plugins/special-characters/templates/tab-content.html',
                'src/plugins/special-characters/templates/tab-button.html'
            ]
        }
    },
    'locales': {
        'en': {
            'name': 'English',
            'description': '',
            'files': [
                'src/locales/en.js'
            ]
        },
        'de': {
            'name': 'German',
            'description': '',
            'files': [
                'src/locales/de.js'
            ]
        },
        'es': {
            'name': 'Spanish',
            'description': '',
            'files': [
                'src/locales/es.js'
            ]
        },
        'fr': {
            'name': 'French',
            'description': '',
            'files': [
                'src/locales/fr.js'
            ]
        },
        'nl': {
            'name': 'Dutch',
            'description': '',
            'files': [
                'src/locales/nl.js'
            ]
        },
        'sv': {
            'name': 'Swedish',
            'description': '',
            'files': [
                'src/locales/sv.js'
            ]
        },
        'zh-cn': {
            'name': 'Simplified Chinese',
            'description': '',
            'files': [
                'src/locales/zh-CN.js'
            ]
        }
    },
    'themes': {
        'mammoth': {
            'name': 'Mammoth',
            'files': [
                'src/dependencies/themes/mammoth/theme.css',
                'src/dependencies/themes/mammoth/theme-icons.css',
                'src/dependencies/themes/mammoth/theme-icons.png',
                'src/dependencies/themes/mammoth/theme-icons-hover.png'
            ]
        },
        'aristo': {
            'name': 'Aristo',
            'files': [
                'src/dependencies/themes/aristo/jquery-ui.css',
                'src/dependencies/themes/aristo/images/bg_fallback.png',
                'src/dependencies/themes/aristo/images/icon_sprite.png',
                'src/dependencies/themes/aristo/images/progress_bar.gif',
                'src/dependencies/themes/aristo/images/slider_handles.png',
                'src/dependencies/themes/aristo/images/ui-icons_222222_256x240.png',
                'src/dependencies/themes/aristo/images/ui-icons_454545_256x240.png'
            ]
        },
        'redmond': {
            'name': 'Redmond',
            'files': [
                'src/dependencies/themes/redmond/jquery-ui.css',
                'src/dependencies/themes/redmond/images/ui-bg_flat_0_aaaaaa_40x100.png',
                'src/dependencies/themes/redmond/images/ui-bg_flat_55_fbec88_40x100.png',
                'src/dependencies/themes/redmond/images/ui-bg_glass_75_d0e5f5_1x400.png',
                'src/dependencies/themes/redmond/images/ui-bg_glass_85_dfeffc_1x400.png',
                'src/dependencies/themes/redmond/images/ui-bg_glass_95_fef1ec_1x400.png',
                'src/dependencies/themes/redmond/images/ui-bg_gloss-wave_55_5c9ccc_500x100.png',
                'src/dependencies/themes/redmond/images/ui-bg_inset-hard_100_f5f8f9_1x100.png',
                'src/dependencies/themes/redmond/images/ui-bg_inset-hard_100_fcfdfd_1x100.png',
                'src/dependencies/themes/redmond/images/ui-icons_217bc0_256x240.png',
                'src/dependencies/themes/redmond/images/ui-icons_2e83ff_256x240.png',
                'src/dependencies/themes/redmond/images/ui-icons_469bdd_256x240.png',
                'src/dependencies/themes/redmond/images/ui-icons_6da8d5_256x240.png',
                'src/dependencies/themes/redmond/images/ui-icons_cd0a0a_256x240.png',
                'src/dependencies/themes/redmond/images/ui-icons_d8e7f3_256x240.png',
                'src/dependencies/themes/redmond/images/ui-icons_f9bd01_256x240.png'
            ]
        },
        'smoothness': {
            'name': 'Smoothness',
            'files': [
                'src/dependencies/themes/smoothness/jquery-ui.css',
                'src/dependencies/themes/smoothness/images/ui-bg_flat_0_aaaaaa_40x100.png',
                'src/dependencies/themes/smoothness/images/ui-bg_flat_75_ffffff_40x100.png',
                'src/dependencies/themes/smoothness/images/ui-bg_glass_55_fbf9ee_1x400.png',
                'src/dependencies/themes/smoothness/images/ui-bg_glass_65_ffffff_1x400.png',
                'src/dependencies/themes/smoothness/images/ui-bg_glass_75_dadada_1x400.png',
                'src/dependencies/themes/smoothness/images/ui-bg_glass_75_e6e6e6_1x400.png',
                'src/dependencies/themes/smoothness/images/ui-bg_glass_95_fef1ec_1x400.png',
                'src/dependencies/themes/smoothness/images/ui-bg_highlight-soft_75_cccccc_1x100.png',
                'src/dependencies/themes/smoothness/images/ui-icons_222222_256x240.png',
                'src/dependencies/themes/smoothness/images/ui-icons_2e83ff_256x240.png',
                'src/dependencies/themes/smoothness/images/ui-icons_454545_256x240.png',
                'src/dependencies/themes/smoothness/images/ui-icons_888888_256x240.png',
                'src/dependencies/themes/smoothness/images/ui-icons_cd0a0a_256x240.png'
            ]
        },
        'none': {
            'name': 'None'
        }
    }
};
