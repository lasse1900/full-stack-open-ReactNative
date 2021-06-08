import React from 'react';
import { render } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // Add your test code here

      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);

      expect(getAllByTestId('fullName')[0]).toHaveTextContent('jaredpalmer/formik');
      expect(getAllByTestId('fullName')[1]).toHaveTextContent('async-library/react-async');
      expect(getAllByTestId('repoDescription')[0]).toHaveTextContent(repositories.edges[0].node.description);
      expect(getAllByTestId('repoDescription')[1]).toHaveTextContent(repositories.edges[1].node.description);
      expect(getAllByTestId('repoLanguage')[0]).toHaveTextContent(repositories.edges[0].node.language);
      expect(getAllByTestId('repoLanguage')[1]).toHaveTextContent(repositories.edges[1].node.language);
      expect(getAllByTestId('forksCount')[0]).toHaveTextContent('1.6k');
      expect(getAllByTestId('forksCount')[1]).toHaveTextContent('69');
      expect(getAllByTestId('stargazersCount')[0]).toHaveTextContent('21.9k');
      expect(getAllByTestId('stargazersCount')[1]).toHaveTextContent('1.8k');
      expect(getAllByTestId('ratingAverage')[0]).toHaveTextContent(repositories.edges[0].node.ratingAverage);
      expect(getAllByTestId('ratingAverage')[1]).toHaveTextContent(repositories.edges[1].node.ratingAverage);
      expect(getAllByTestId('reviewCount')[0]).toHaveTextContent('3');
      expect(getAllByTestId('reviewCount')[1]).toHaveTextContent('3');
    });
  });
});