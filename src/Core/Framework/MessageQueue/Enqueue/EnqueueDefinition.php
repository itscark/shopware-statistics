<?php

declare(strict_types=1);

namespace ItsCark\Shopware\Statistics\Core\Framework\MessageQueue\Enqueue;

use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IntField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;

class EnqueueDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'enqueue';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getCollectionClass(): string
    {
        return EnqueueCollection::class;
    }

    public function getEntityClass(): string
    {
        return EnqueueEntity::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection(
            [
                (new StringField('id', 'id'))->addFlags(new PrimaryKey(), new Required()),
                (new StringField('queue', 'queue'))->addFlags(new Required()),
                (new IntField('count', 'count'))->addFlags(new Required()),
            ]
        );
    }

    protected function defaultFields(): array
    {
        return [];
    }
}
