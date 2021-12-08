import './page/task-statistics-message-queue-stats';
import deDE from './snippet/de-DE.json';
import enGB from './snippet/en-GB.json';

Shopware.Module.register('task-statistics-message-queue-stats', {
    type: 'plugin',
    name: 'task-statistics-message-queue-stats',
    title: 'task-statistics-message-queue-stats.general.mainMenuItemGeneral',
    description: 'task-statistics-message-queue-stats.general.description',
    version: '1.0.0',
    targetVersion: '1.0.0',
    color: '#333',
    icon: 'default-action-settings',

    snippets: {
        'de-DE': deDE,
        'en-GB': enGB,
    },

    routes: {
        messagequeuestats: {
            component: 'task-statistics-message-queue-stats',
            path: 'message-queue-stats',
            icon: 'default-device-server',
            meta: {
                parentPath: 'task.statistics.index.index',
            },
        },
    },
});
