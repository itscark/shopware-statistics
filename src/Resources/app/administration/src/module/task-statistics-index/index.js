import './page/task-statistics-index';

import deDE from './snippet/de-DE.json';
import enGB from './snippet/en-GB.json';

Shopware.Module.register('task-statistics-index', {
    type: 'plugin',
    name: 'task-statistics-index',
    title: 'task-statistics-index.general.mainMenuItemGeneral',
    description: 'task-statistics-index.general.descriptionTextmodule',
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
            component: 'task-statistics-index',
            path: 'index',
            icon: 'default-device-server',
            meta: {
                parentPath: 'sw.settings.index',
            },
        },
    },
    settingsItem: {
        name: 'task-statistics-index',
        group: 'plugins',
        label: 'task-statistics-index.general.mainMenuItemGeneral',
        to: 'task.statistics.index.index',
        icon: 'default-device-server',
    },
});
