import React from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import useRepositories from '../hooks/useRepositories';

import RepositoryItem from './RepositoryItem';
import { useHistory } from 'react-router-dom';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const RepositoryListContainer = ({ repositories }) => {
  const history = useHistory();
  const repositoryNodes = repositories.edges
    ? repositories.edges.map(edge => edge.node)
    : [];

  const ItemSeparator = () => <View style={styles.separator} />;

  const onSelect = (id) => {
    history.push(`/${id}`);
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) =>
        <TouchableOpacity onPress={() => onSelect(item.id)}>
          <RepositoryItem item={item} />
        </TouchableOpacity>
      }
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;