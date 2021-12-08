# Installation

```bash
composer config repositories.itscark-shopware-task-statistics '{"type": "vcs", "url": "git@github.com:itscark/shopware-task-statistics.git"}'
```

```bash
composer require itscark/shopware-task-statistics
```

```bash
bin/console plugin:refresh && bin/console plugin:install CarkTaskStatistics --activate
```
