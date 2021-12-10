import template from './statistics-message-queue-stats.html.twig';

const { Component } = Shopware;
const { Mixin } = Shopware;
const { Criteria } = Shopware.Data;

Component.register('statistics-message-queue-stats', {
    template,

    inject: ['repositoryFactory', 'context'],

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
                { property: 'name', label: this.$tc('statistics-message-queue-stats.grid.column.name') },
                { property: 'size', label: this.$tc('statistics-message-queue-stats.grid.column.size') },
            ];
        },

        entityRepository() {
            return this.repositoryFactory.create('message_queue_stats');
        },
    },

    methods: {
        getList() {
            this.isLoading = true;
            this.entityRepository = this.repositoryFactory.create('message_queue_stats');
            const criteria = new Criteria();

            this.entityRepository.search(criteria, Shopware.Context.api).then(result => {
                this.items = result;
                this.total = result.total;
                this.isLoading = false;
            });
        },
    },
});
