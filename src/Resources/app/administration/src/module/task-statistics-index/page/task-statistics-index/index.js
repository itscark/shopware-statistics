import template from './task-statistics-index.html.twig';

const { Component } = Shopware;

Component.register('task-statistics-index', {
    template,

    inject: ['systemConfigApiService'],

    data() {
        return {
            actualConfigData: {
                'CarkTaskStatistics.config.showScheduledTasks': false,
                'CarkTaskStatistics.config.showMessageQueueStats': false,
                'CarkTaskStatistics.config.showQueuePerChannel': false,
                'CarkTaskStatistics.config.showDeadMessage': false,
            },
            isLoading: false,
        };
    },

    created() {
        return this.systemConfigApiService.getValues('CarkTaskStatistics.config', null).then(values => {
            this.actualConfigData = values;
        }).finally(() => {
            this.isLoading = false;
        });
    },
});
