<?php

declare(strict_types=1);

namespace ItsCark\Shopware\TaskStatistics\Administration\Repository;

use Doctrine\DBAL\Exception;
use function ceil;
use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Query\QueryBuilder;
use Iwaves\Shopware\TaskStatistics\Administration\Custom\EnqueueCollection;
use Iwaves\Shopware\TaskStatistics\Administration\Custom\EnqueueEntity;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\Dbal\EntityHydrator;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Read\EntityReaderInterface;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\EntityAggregatorInterface;
use Shopware\Core\Framework\DataAbstractionLayer\Search\EntitySearcherInterface;
use Shopware\Core\Framework\DataAbstractionLayer\Search\EntitySearchResult;
use Shopware\Core\Framework\DataAbstractionLayer\VersionManager;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use function count;

class EnqueueRepository extends EntityRepository
{
    private Connection $connection;

    private EntityHydrator $entityHydrator;

    public function __construct(
        EntityDefinition $definition,
        EntityReaderInterface $reader,
        VersionManager $versionManager,
        EntitySearcherInterface $searcher,
        EntityAggregatorInterface $aggregator,
        EventDispatcherInterface $eventDispatcher,
        Connection $connection,
        EntityHydrator $entityHydrator
    ) {
        $this->connection = $connection;
        $this->entityHydrator = $entityHydrator;

        parent::__construct(
            $definition,
            $reader,
            $versionManager,
            $searcher,
            $aggregator,
            $eventDispatcher
        );
    }

    /**
     * @throws Exception
     */
    public function search(Criteria $criteria, Context $context): EntitySearchResult
    {
        if (null === $criteria->getAggregation('count')) {
            return parent::search($criteria, $context);
        }

        $query = $this->createSearchQuery($criteria);

        return $this->getSearchResult($query, $context, $criteria);
    }

    private function createSearchQuery(Criteria $criteria): QueryBuilder
    {
        $query = $this->connection->createQueryBuilder();
        $subQuery = clone $query;
        $subQuery
            ->select('enq.id')
            ->from('enqueue', 'enq')
            ->where($subQuery->expr()->eq('enq.queue', 'enqueue.queue'))
            ->setMaxResults(1);

        $query
            ->select('queue as `enqueue.queue`')
            ->addSelect('COUNT(queue) AS `enqueue.count`')
            ->addSelect('(' . $subQuery->getSQL() . ') AS `enqueue.id`')
            ->from('enqueue')
            ->groupBy('queue');

        $selects = $query->getQueryPart('select');
        $selects[0] = 'SQL_CALC_FOUND_ROWS ' . $selects[0];
        $query->select($selects);

        $this->addLimitAndOffset($criteria, $query);

        $this->addSorting($criteria, $query);

        return $query;
    }

    private function addLimitAndOffset(Criteria $criteria, QueryBuilder $query): void
    {
        if (null !== $criteria->getOffset()) {
            $query->setFirstResult($criteria->getOffset());
        }
        if (null !== $criteria->getLimit()) {
            $query->setMaxResults($criteria->getLimit());
        }
    }

    private function addSorting(Criteria $criteria, QueryBuilder $query): void
    {
        if (\count($criteria->getSorting())) {
            foreach ($criteria->getSorting() as $sorting) {
                $field = $sorting->getField();
                if ('enqueue.count' === $field) {
                    $field = 'COUNT(queue)';
                }
                $query->addOrderBy($field, $sorting->getDirection());
            }
        }
    }

    /**
     * @throws Exception
     */
    private function getSearchResult(
        QueryBuilder $query,
        Context $context,
        Criteria $criteria
    ): EntitySearchResult {
        $entities = $this->entityHydrator->hydrate(
            new EnqueueCollection(),
            EnqueueEntity::class,
            $this->getDefinition(),
            $this->connection->fetchAllAssociative($query->getSQL()),
            $this->getDefinition()->getEntityName(),
            $context
        );

        return new EntitySearchResult(
            $this->getDefinition()->getEntityName(),
            (int) $this->connection->fetchOne('SELECT FOUND_ROWS()'),
            $entities,
            null,
            $criteria,
            $context,
        );
    }
}
