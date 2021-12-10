import './page/statistics-scheduled-tasks';
import './page/statistics-scheduled-tasks-detail';

import deDE from './snippet/de-DE.json';
import enGB from './snippet/en-GB.json';

Shopware.Module.register('statistics-scheduled-tasks', {
    type: 'plugin',
    name: 'statistics-scheduled-tasks',
    title: 'statistics-scheduled-tasks.general.mainMenuItemGeneral',
    description: 'statistics-scheduled-tasks.general.description',
    version: '1.0.0',
    targetVersion: '1.0.0',
    color: '#333',
    icon: 'default-device-server',

    snippets: {
        'de-DE': deDE,
        'en-GB': enGB,
    },

    routes: {
        scheduledtasks: {
            component: 'statistics-scheduled-tasks',
            path: 'scheduled-tasks',
            icon: 'default-device-server',
            meta: {
                parentPath: 'statistics.index.index',
                privilege: 'system.system_config',
            },
        },
        detail: {
            component: 'statistics-scheduled-tasks-detail',
            path: 'detail/:id',
            meta: {
                parentPath: 'statistics.scheduled.tasks.scheduledtasks',
                privilege: 'system.system_config',
            },
        },
    },
});
