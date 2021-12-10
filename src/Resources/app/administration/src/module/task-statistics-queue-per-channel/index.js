import './page/task-statistics-queue-per-channel';
import deDE from './snippet/de-DE.json';
import enGB from './snippet/en-GB.json';

Shopware.Module.register('task-statistics-queue-per-channel', {
    type: 'plugin',
    name: 'task-statistics-queue-per-channel',
    title: 'task-statistics-queue-per-channel.general.mainMenuItemGeneral',
    description: 'task-statistics-queue-per-channel.general.description',
    version: '1.0.0',
    targetVersion: '1.0.0',
    color: '#333',
    icon: 'default-device-server',

    snippets: {
        'de-DE': deDE,
        'en-GB': enGB,
    },

    routes: {
        queueperchannel: {
            component: 'task-statistics-queue-per-channel',
            path: 'queue-per-channel',
            icon: 'default-device-server',
            meta: {
                parentPath: 'task.statistics.index.index',
                privilege: 'system.system_config',
            },
        },
    },
});
