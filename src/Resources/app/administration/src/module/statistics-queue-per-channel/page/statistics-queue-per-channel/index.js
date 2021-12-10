import template from './statistics-queue-per-channel.html.twig';

const { Component } = Shopware;
const { Mixin } = Shopware;
const { Criteria } = Shopware.Data;

Component.register('statistics-queue-per-channel', {
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
                {
                    property: 'queue',
                    label: this.$tc('statistics-queue-per-channel.grid.column.name'),
                    allowResize: true,
                },
                {
                    property: 'count',
                    label: this.$tc('statistics-queue-per-channel.grid.column.count'),
                    allowResize: true,
                },
            ];
        },

        entityRepository() {
            return this.repositoryFactory.create('enqueue');
        },
    },

    methods: {
        getList() {
            this.isLoading = true;
            this.entityRepository = this.repositoryFactory.create('enqueue');
            const criteria = new Criteria();
            criteria.addGrouping('queue');
            criteria.addAggregation(
                Criteria.count('count', 'queue'),
            );

            this.entityRepository.search(criteria, Shopware.Context.api).then(result => {
                this.items = result;
                this.total = result.total;
                this.isLoading = false;
            });
        },
    },
});
