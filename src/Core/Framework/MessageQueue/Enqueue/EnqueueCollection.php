<?php

declare(strict_types=1);

namespace ItsCark\Shopware\Statistics\Core\Framework\MessageQueue\Enqueue;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;

/**
 * @method void               add(EnqueueEntity $entity)
 * @method void               set(string $key, EnqueueEntity $entity)
 * @method EnqueueEntity[]    getIterator()
 * @method EnqueueEntity[]    getElements()
 * @method EnqueueEntity|null get(string $key)
 * @method EnqueueEntity|null first()
 * @method EnqueueEntity|null last()
 */
class EnqueueCollection extends EntityCollection
{
    protected function getExpectedClass(): string
    {
        return EnqueueEntity::class;
    }
}
