import './page/statistics-queue-per-channel';
import deDE from './snippet/de-DE.json';
import enGB from './snippet/en-GB.json';

Shopware.Module.register('statistics-queue-per-channel', {
    type: 'plugin',
    name: 'statistics-queue-per-channel',
    title: 'statistics-queue-per-channel.general.mainMenuItemGeneral',
    description: 'statistics-queue-per-channel.general.description',
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
            component: 'statistics-queue-per-channel',
            path: 'queue-per-channel',
            icon: 'default-device-server',
            meta: {
                parentPath: 'statistics.index.index',
                privilege: 'system.system_config',
            },
        },
    },
});
