const { Filter } = Shopware;

Filter.register('scheduled_task_class_short', (value) => {
    return value.substring(value.lastIndexOf('\\') + 1);
});
