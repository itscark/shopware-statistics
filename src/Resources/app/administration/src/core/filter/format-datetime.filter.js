const { Filter } = Shopware;

Filter.register('format_datetime', (value) => {
    const date = new Date(value);
    return date.toLocaleDateString(
        ['de-DE'],
        {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        },
    );
});
