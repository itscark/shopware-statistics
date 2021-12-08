<?php

$finder = (new PhpCsFixer\Finder())
    ->in(__DIR__)
    ->exclude(
        [
            // Exclude folders which don't contain application logic
            // 'vendor' is excluded by default
        ]
    );

return (new PhpCsFixer\Config())
    ->setRules([
                   '@Symfony'               => true,
                   '@Symfony:risky'         => true,
                   '@PSR12'                 => true,
                   '@PSR12:risky'           => true,
                   'binary_operator_spaces' => [
                       'operators' => [
                           '=>' => 'align',
                       ],
                   ],
                   'single_line_throw'      => false,
                   'fopen_flags'            => [
                       'b_mode' => true,
                   ],
                   'ordered_imports'        => [
                       'sort_algorithm' => 'alpha',
                   ],
               ])
    ->setFinder($finder);
