<?php

declare(strict_types=1);

namespace ItsCark\Shopware\Statistics\Core\Framework\MessageQueue\Enqueue;

use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;

class EnqueueEntity extends Entity
{
    use EntityIdTrait;

    protected string $queue = '';

    protected int $count = 0;
}
