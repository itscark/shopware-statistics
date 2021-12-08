const {Component} = Shopware;

Component.extend('cark-datepicker', 'sw-datepicker', {
    methods: {
        createdComponent() {
            this.$super('createdComponent');
            this.defaultConfig.dateFormat = 'Z';
            this.defaultConfig.altFormat = 'd.m.Y, H:i';
        },
    },
});
