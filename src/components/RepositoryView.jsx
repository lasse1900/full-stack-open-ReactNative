import React from 'react';
import { useParams } from 'react-router-dom';
import { FlatList, Text } from 'react-native';
import RepositoryItem from "./RepositoryItem";
import useSingleRepository from '../hooks/useSingleRepository';

const RepositoryInfo = ({ repository }) => {
  return (
    <RepositoryItem item={repository} singleView={true} />
  );
};

const SigleItem = () => {
  return (
    <Text></Text>
  );
};

const RepositoryView = () => {
  const id = useParams().id;
  const { repository } = useSingleRepository(id);

  const singleRepo = repository
    ? repository
    : [];

  return (
    <FlatList
      renderItem={({ item }) => <SigleItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={singleRepo} />}
    />
  );
};

export default RepositoryView;