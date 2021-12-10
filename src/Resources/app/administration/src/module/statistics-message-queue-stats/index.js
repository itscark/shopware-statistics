import './page/statistics-message-queue-stats';
import deDE from './snippet/de-DE.json';
import enGB from './snippet/en-GB.json';

Shopware.Module.register('statistics-message-queue-stats', {
    type: 'plugin',
    name: 'statistics-message-queue-stats',
    title: 'statistics-message-queue-stats.general.mainMenuItemGeneral',
    description: 'statistics-message-queue-stats.general.description',
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
            component: 'statistics-message-queue-stats',
            path: 'message-queue-stats',
            icon: 'default-device-server',
            meta: {
                parentPath: 'statistics.index.index',
                privilege: 'system.system_config',
            },
        },
    },
});
