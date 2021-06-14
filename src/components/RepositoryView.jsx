import React from 'react';
import { useParams } from 'react-router-dom';
import { FlatList, StyleSheet, View } from 'react-native';
import RepositoryItem from "./RepositoryItem";
import useSingleRepository from '../hooks/useSingleRepository';
import { format } from 'date-fns';
import Text from './Text';

const styles = StyleSheet.create({
  reviewRating: {
    color: 'blue',
    fontSize: 14,
    fontWeight: 'bold'
  },
  mainInfoContainer: {
    flexShrink: 1,
    paddingHorizontal: 30
  },
  reviewDate: {
    flexGrow: 1
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  return (
    <RepositoryItem item={repository} singleView={true} />
  );
};

const ReviewItem = ({ review }) => {
  return (
    <View>
      <View>
        <Text style={styles.reviewRating}>{review.rating}</Text>
      </View>
      <View style={styles.mainInfoContainer}>
        <Text fontWeight='bold'>{review.user.username}</Text>
        <Text style={styles.reviewDate}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
        <View>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

const RepositoryView = () => {
  const id = useParams().id;
  const { repository } = useSingleRepository(id);

  const singleRepo = repository
    ? repository
    : [];

  const reviews = repository
    ? singleRepo.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() =>
        <View>
          <RepositoryInfo repository={singleRepo} />
          <View style={styles.separator}></View>
        </View>
      }
    />
  );
};

export default RepositoryView;