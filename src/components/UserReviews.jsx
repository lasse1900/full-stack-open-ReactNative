import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import useUserReviews from '../hooks/useUserReviews';
import ReviewItem from '../components/ReviewItem';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
    marginBottom: 80,
  },
  flexContainerInfo: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'grey',
  },
  separator: {
    height: 15,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {

  const { reviews } = useUserReviews({ first: 2, includeReviews: true });

  return (
    <View style={styles.container} >
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={item => item.node.id}
        ListHeaderComponent={ItemSeparator}
        ItemSeparatorComponent={ItemSeparator}
        ListFooterComponent={ItemSeparator}
      />
    </View>

  );
};

export default UserReviews;