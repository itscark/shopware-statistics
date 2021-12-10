import template from './statistics-scheduled-tasks-detail.html.twig';
import './statistics-scheduled-tasks-detail.scss';
import {Intervals} from "../../helper/scheduled-task.helper";

const { Component } = Shopware;
const { Mixin } = Shopware;
const { Filter } = Shopware;

Component.register('statistics-scheduled-tasks-detail', {
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
                {
                    value: 'scheduled',
                    label: 'scheduled',
                },
                {
                    value: 'queued',
                    label: 'queued',
                },
                {
                    value: 'running',
                    label: 'running',
                },
                {
                    value: 'failed',
                    label: 'failed',
                },
                {
                    value: 'inactive',
                    label: 'inactive',
                },
            ];
        },
        intervals() {
            return Intervals;
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
            const titleSaveError = this.$tc('statistics-scheduled-tasks.detail.notificationSaveErrorMessageTitle');
            const messageSaveError = this.$tc(
                'statistics-scheduled-tasks.detail.notificationSaveErrorMessage',
                0,
                { title: this.item.title, description: this.item.description },
            );
            const titleSaveSuccess = this.$tc('statistics-scheduled-tasks.detail.notificationSaveSuccessMessageTitle');
            const messageSaveSuccess = this.$tc(
                'statistics-scheduled-tasks.detail.notificationSaveSuccessMessage',
                0,
                { title: this.item.title, description: this.item.description },
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
