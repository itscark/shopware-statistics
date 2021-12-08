import './page/task-statistics-scheduled-tasks';
import './page/task-statistics-scheduled-tasks-detail';

import deDE from './snippet/de-DE.json';
import enGB from './snippet/en-GB.json';

Shopware.Module.register('task-statistics-scheduled-tasks', {
    type: 'plugin',
    name: 'task-statistics-scheduled-tasks',
    title: 'task-statistics-scheduled-tasks.general.mainMenuItemGeneral',
    description: 'task-statistics-scheduled-tasks.general.description',
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
            component: 'task-statistics-scheduled-tasks',
            path: 'scheduled-tasks',
            icon: 'default-device-server',
            meta: {
                parentPath: 'task.statistics.index.index',
            },
        },
        detail: {
            component: 'task-statistics-scheduled-tasks-detail',
            path: 'detail/:id',
            meta: {
                parentPath: 'task.statistics.scheduled.tasks.scheduledtasks',
            },
        },
    },
});
