# Installation

```bash
composer config repositories.itscark-shopware-statistics '{"type": "vcs", "url": "git@github.com:itscark/shopware-statistics.git"}'
```

```bash
composer require itscark/shopware-statistics
```

```bash
bin/console plugin:refresh && bin/console plugin:install CarkStatistics --activate
```
