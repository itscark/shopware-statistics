# Installation

```bash
composer config repositories.iwaves-shopware-task-statistics '{"type": "vcs", "url": "git@bitbucket.org:iwaves/shopware-task-statistics.git"}'
```

```bash
composer require iwaves/shopware-task-statistics
```

```bash
bin/console plugin:refresh && bin/console plugin:install IwvsTaskStatistics --activate
```
