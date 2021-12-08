import './page/task-statistics-dead-message';
import deDE from './snippet/de-DE.json';
import enGB from './snippet/en-GB.json';

Shopware.Module.register('task-statistics-dead-message', {
    type: 'plugin',
    name: 'task-statistics-dead-message',
    title: 'task-statistics-dead-message.general.mainMenuItemGeneral',
    description: 'task-statistics-dead-message.general.description',
    version: '1.0.0',
    targetVersion: '1.0.0',
    color: '#333',
    icon: 'default-action-settings',

    snippets: {
        'de-DE': deDE,
        'en-GB': enGB,
    },

    routes: {
        deadmessage: {
            component: 'task-statistics-dead-message',
            path: 'dead-message',
            icon: 'default-device-server',
            meta: {
                parentPath: 'task.statistics.index.index',
            },
        },
    },
});
