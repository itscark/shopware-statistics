import template from './statistics-scheduled-tasks.html.twig';
import './statistics-scheduled-tasks.scss';

const { Component } = Shopware;
const { Mixin } = Shopware;
const { Criteria } = Shopware.Data;

Component.register('statistics-scheduled-tasks', {
    template,

    inject: ['repositoryFactory', 'context'],

    mixins: [
        Mixin.getByName('listing'),
        Mixin.getByName('notification'),
        Mixin.getByName('placeholder'),
    ],

    data() {
        return {
            items: null,
            repository: null,
            isLoading: false,
            showDeleteModal: false,
            total: 0,
            statusStyle: {
                scheduled: 'success',
                queued: 'info',
                running: 'warning',
                failed: 'danger',
                inactive: 'done',
            },
            intervals: {
                0: this.$tc('statistics-scheduled-tasks.grid.column.intervalDetail.0'),
                20: this.$tc('statistics-scheduled-tasks.grid.column.intervalDetail.20'),
                120: this.$tc('statistics-scheduled-tasks.grid.column.intervalDetail.120'),
                300: this.$tc('statistics-scheduled-tasks.grid.column.intervalDetail.300'),
                600: this.$tc('statistics-scheduled-tasks.grid.column.intervalDetail.600'),
                900: this.$tc('statistics-scheduled-tasks.grid.column.intervalDetail.900'),
                1800: this.$tc('statistics-scheduled-tasks.grid.column.intervalDetail.1800'),
                3600: this.$tc('statistics-scheduled-tasks.grid.column.intervalDetail.3600'),
                7200: this.$tc('statistics-scheduled-tasks.grid.column.intervalDetail.7200'),
                14400: this.$tc('statistics-scheduled-tasks.grid.column.intervalDetail.14400'),
                28800: this.$tc('statistics-scheduled-tasks.grid.column.intervalDetail.28800'),
                43200: this.$tc('statistics-scheduled-tasks.grid.column.intervalDetail.43200'),
                86400: this.$tc('statistics-scheduled-tasks.grid.column.intervalDetail.86400'),
                172800: this.$tc('statistics-scheduled-tasks.grid.column.intervalDetail.172800'),
                604800: this.$tc('statistics-scheduled-tasks.grid.column.intervalDetail.604800'),
                2592000: this.$tc('statistics-scheduled-tasks.grid.column.intervalDetail.2592000'),
                seconds: this.$tc('statistics-scheduled-tasks.grid.column.intervalDetail.seconds'),
            },
        };
    },

    metaInfo() {
        return {
            title: this.$createTitle(),
        };
    },

    computed: {
        columns() {
            return [
                {
                    property: 'name',
                    label: this.$tc('statistics-scheduled-tasks.grid.column.name'),
                    allowResize: true,
                },
                {
                    property: 'scheduledTaskClass',
                    label: this.$tc('statistics-scheduled-tasks.grid.column.class'),
                    allowResize: true,
                    sortable: false,
                },
                {
                    property: 'runInterval',
                    label: this.$tc('statistics-scheduled-tasks.grid.column.interval'),
                    allowResize: true,
                },
                {
                    property: 'lastExecutionTime',
                    label: this.$tc('statistics-scheduled-tasks.grid.column.lastExecutionTime'),
                    allowResize: true,
                },
                {
                    property: 'nextExecutionTime',
                    label: this.$tc('statistics-scheduled-tasks.grid.column.nextExecutionTime'),
                    allowResize: true,
                },
                {
                    property: 'status',
                    label: this.$tc('statistics-scheduled-tasks.grid.column.status'),
                    allowResize: true,
                },
                {
                    property: 'deadMessages[0].exceptionMessage',
                    label: this.$tc('statistics-scheduled-tasks.grid.column.error'),
                    allowResize: true,
                },
            ];
        },

        entityRepository() {
            return this.repositoryFactory.create('scheduled_task');
        },
    },

    methods: {
        getList() {
            this.isLoading = true;
            const criteria = new Criteria(this.page, this.limit);
            if (this.term !== '') {
                criteria.setTerm(this.term);
            }

            return this.entityRepository.search(criteria, Shopware.Context.api).then((result) => {
                this.items = result;
                this.total = result.total;
                this.isLoading = false;
            });
        },

        getInterval(interval) {
            return this.intervals[interval] || (`${interval} ${this.intervals.seconds}`);
        },

        onDelete(id) {
            this.showDeleteModal = id;
        },

        onCloseDeleteModal() {
            this.showDeleteModal = false;
        },

        onConfirmDelete(id) {
            this.showDeleteModal = false;
            return this.entityRepository.delete(id, Shopware.Context.api).then(() => {
                this.getList();
            });
        },

        getStatusStyle(status) {
            if (this.statusStyle[status]) {
                return this.statusStyle[status];
            }

            return '';
        },

        isItemDeletable(item) {
            return !(item.scheduledTaskClass.lastIndexOf('Shopware', 0) === 0);
        },
    },
});
