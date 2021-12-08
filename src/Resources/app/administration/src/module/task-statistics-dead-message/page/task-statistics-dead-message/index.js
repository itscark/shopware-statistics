import template from './task-statistics-dead-message.html.twig';

const {Component, Context} = Shopware;
const {Mixin} = Shopware;
const {Criteria} = Shopware.Data;

Component.register('task-statistics-dead-message', {
    template,
    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('listing'),
    ],

    data() {
        return {
            total: 0,
            items: null,
            repository: null,
            isLoading: false,
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
                {property: 'id', label: this.$tc('task-statistics-dead-message.grid.column.id')},
                {property: 'originalMessageClass', label: this.$tc('task-statistics-dead-message.grid.column.originalMessageClass')},
                {property: 'serializedOriginalMessage', label: this.$tc('task-statistics-dead-message.grid.column.serializedOriginalMessage')},
                {property: 'handlerClass', label: this.$tc('task-statistics-dead-message.grid.column.handlerClass')},
                {property: 'encrypted', label: this.$tc('task-statistics-dead-message.grid.column.encrypted')},
                {property: 'errorCount', label: this.$tc('task-statistics-dead-message.grid.column.errorCount')},
                {property: 'nextExecutionTime', label: this.$tc('task-statistics-dead-message.grid.column.nextExecutionTime')},
                {property: 'exception', label: this.$tc('task-statistics-dead-message.grid.column.exception')},
                {property: 'exceptionMessage', label: this.$tc('task-statistics-dead-message.grid.column.exceptionMessage')},
                {property: 'exceptionFile', label: this.$tc('task-statistics-dead-message.grid.column.exceptionFile')},
                {property: 'exceptionLine', label: this.$tc('task-statistics-dead-message.grid.column.exceptionLine')},
                {property: 'scheduledTaskId', label: this.$tc('task-statistics-dead-message.grid.column.scheduledTaskId')},
                {property: 'createdAt', label: this.$tc('task-statistics-dead-message.grid.column.createdAt')},
                {property: 'updatedAt', label: this.$tc('task-statistics-dead-message.grid.column.updatedAt')},
            ];
        },

        entityRepository() {
            return this.repositoryFactory.create('dead_message');
        },
    },

    methods: {
        getList() {
            this.isLoading = true;
            const criteria = new Criteria();
            criteria.addSorting(
                Criteria.sort('createdAt', 'DESC'),
            );

            this.entityRepository.search(criteria, Context.api).then(result => {
                this.items = result;
                this.total = result.total;
                this.isLoading = false;
            });
        },
    },
});
