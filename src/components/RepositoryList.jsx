import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RNPickerSelect from "react-native-picker-select";

import TouchableRepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = (props) => {
  const { repositories, sortOrder, setSortOrder } = props;
  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];
  const renderItem = ({ item }) => <TouchableRepositoryItem item={item} />;

  return (
    <FlatList
      ListHeaderComponent={
        <RNPickerSelect
          onValueChange={(value) => { setSortOrder(value); }}
          value={sortOrder}
          items={[
            {
              label: "Latest repositories",
              value: "CREATED_AT_DESC",
            },
            {
              label: "Highest rated repositories",
              value: "RATING_AVERAGE_DESC",
            },
            {
              label: "Lowest rated repositores",
              value: "RATING_AVERAGE_ASC",
            },
          ]}
        />
      }
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    />
  );
};

const RepositoryList = () => {
  const [sortOrder, setSortOrder] = useState("CREATED_AT_DESC");
  const repositories = useRepositories(sortOrder);

  return <RepositoryListContainer repositories={repositories} sortOrder={sortOrder} setSortOrder={setSortOrder} />;
};

export default RepositoryList;