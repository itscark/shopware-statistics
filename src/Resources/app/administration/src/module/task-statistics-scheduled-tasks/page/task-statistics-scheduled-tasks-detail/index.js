import template from './task-statistics-scheduled-tasks-detail.html.twig';

const {Component} = Shopware;
const {Mixin} = Shopware;
const {Filter} = Shopware;

Component.register('task-statistics-scheduled-tasks-detail', {
    template,

    inject: ['repositoryFactory', 'context'],

    mixins: [
        Mixin.getByName('listing'),
        Mixin.getByName('notification'),
        Mixin.getByName('placeholder'),
    ],

    data() {
        return {
            item: null,
            isLoading: false,
            processSuccess: false,
            repository: null,
            lastExecutionTime: '',
        };
    },

    metaInfo() {
        return {
            title: this.$createTitle(),
        };
    },

    computed: {
        status() {
            return [
                {value: 'scheduled', label: 'scheduled'},
                {value: 'queued', label: 'queued'},
                {value: 'running', label: 'running'},
                {value: 'failed', label: 'failed'},
                {value: 'inactive', label: 'inactive'},
            ];
        },
        intervals() {
            return [
                {value: 0, label: this.$tc('task-statistics-scheduled-tasks.grid.column.intervalDetail.0')},
                {value: 20, label: this.$tc('task-statistics-scheduled-tasks.grid.column.intervalDetail.20')},
                {value: 120, label: this.$tc('task-statistics-scheduled-tasks.grid.column.intervalDetail.120')},
                {value: 300, label: this.$tc('task-statistics-scheduled-tasks.grid.column.intervalDetail.300')},
                {value: 600, label: this.$tc('task-statistics-scheduled-tasks.grid.column.intervalDetail.600')},
                {value: 900, label: this.$tc('task-statistics-scheduled-tasks.grid.column.intervalDetail.900')},
                {value: 1800, label: this.$tc('task-statistics-scheduled-tasks.grid.column.intervalDetail.1800')},
                {value: 3600, label: this.$tc('task-statistics-scheduled-tasks.grid.column.intervalDetail.3600')},
                {value: 7200, label: this.$tc('task-statistics-scheduled-tasks.grid.column.intervalDetail.7200')},
                {value: 14400, label: this.$tc('task-statistics-scheduled-tasks.grid.column.intervalDetail.14400')},
                {value: 28800, label: this.$tc('task-statistics-scheduled-tasks.grid.column.intervalDetail.28800')},
                {value: 43200, label: this.$tc('task-statistics-scheduled-tasks.grid.column.intervalDetail.43200')},
                {value: 86400, label: this.$tc('task-statistics-scheduled-tasks.grid.column.intervalDetail.86400')},
                {value: 172800, label: this.$tc('task-statistics-scheduled-tasks.grid.column.intervalDetail.172800')},
                {value: 604800, label: this.$tc('task-statistics-scheduled-tasks.grid.column.intervalDetail.604800')},
                {value: 2592000, label: this.$tc('task-statistics-scheduled-tasks.grid.column.intervalDetail.2592000')},
            ];
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        getItem() {
            this.repository.get(this.$route.params.id, Shopware.Context.api).then((entity) => {
                this.item = entity;
                this.lastExecutionTime = Filter.getByName('date')(entity.lastExecutionTime, {
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                });
            });
        },

        onClickSave() {
            this.isLoading = true;
            const titleSaveError = this.$tc('task-statistics-scheduled-tasks.detail.notificationSaveErrorMessageTitle');
            const messageSaveError = this.$tc(
                'task-statistics-scheduled-tasks.detail.notificationSaveErrorMessage',
                0,
                {title: this.item.title, description: this.item.description},
            );
            const titleSaveSuccess = this.$tc('task-statistics-scheduled-tasks.detail.notificationSaveSuccessMessageTitle');
            const messageSaveSuccess = this.$tc(
                'task-statistics-scheduled-tasks.detail.notificationSaveSuccessMessage',
                0,
                {title: this.item.title, description: this.item.description},
            );

            if (typeof this.item.runInterval === 'string') {
                this.item.runInterval = Number.parseInt(this.item.runInterval, 10);
            }

            this.repository.save(this.item, Shopware.Context.api).then(() => {
                this.getItem();
                this.isLoading = false;
                this.processSuccess = true;
                this.createNotificationSuccess({
                    title: titleSaveSuccess,
                    message: messageSaveSuccess,
                });
            }).catch(() => {
                this.isLoading = false;
                this.createNotificationError({
                    title: titleSaveError,
                    message: messageSaveError,
                });
            });
        },

        saveFinish() {
            this.processSuccess = false;
        },

        createdComponent() {
            this.repository = this.repositoryFactory.create('scheduled_task');
            this.getItem();
            this.isLoading = false;
        },
    },
});
