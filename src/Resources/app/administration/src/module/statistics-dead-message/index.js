import './page/statistics-dead-message';
import deDE from './snippet/de-DE.json';
import enGB from './snippet/en-GB.json';

Shopware.Module.register('statistics-dead-message', {
    type: 'plugin',
    name: 'statistics-dead-message',
    title: 'statistics-dead-message.general.mainMenuItemGeneral',
    description: 'statistics-dead-message.general.description',
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
            component: 'statistics-dead-message',
            path: 'dead-message',
            icon: 'default-device-server',
            meta: {
                parentPath: 'statistics.index.index',
                privilege: 'system.system_config',
            },
        },
    },
});
