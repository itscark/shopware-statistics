import './page/statistics-index';

import deDE from './snippet/de-DE.json';
import enGB from './snippet/en-GB.json';

Shopware.Module.register('statistics-index', {
    type: 'plugin',
    name: 'statistics-index',
    title: 'statistics-index.general.mainMenuItemGeneral',
    description: 'statistics-index.general.descriptionTextmodule',
    version: '1.0.0',
    targetVersion: '1.0.0',
    color: '#333',
    icon: 'default-device-server',

    snippets: {
        'de-DE': deDE,
        'en-GB': enGB,
    },

    routes: {
        index: {
            component: 'statistics-index',
            path: 'index',
            icon: 'default-device-server',
            privilege: 'system.system_config',
        },
    },
    navigation: [{
        label: 'statistics-index.general.mainMenuItemGeneral',
        color: '#ff3d58',
        path: 'statistics.index.index',
        icon: 'default-device-server',
        parent: 'sw-extension',
        position: 100,
        privilege: 'system.system_config',
    }],
});
