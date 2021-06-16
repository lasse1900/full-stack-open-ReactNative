import React from "react";
import { View, StyleSheet } from "react-native";
import Text from './Text';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 8,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
  },
  rating: {
    color: 'blue',
    fontSize: 14,
    fontWeight: 'bold'
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 15,
    color: 'gray'
  },
  text: {
    fontSize: 15,
    paddingRight: 55,
    textAlign: 'left',
  },
});

const ReviewItem = ({ review }) => {

  return (
    <View style={styles.flexContainer}>
      <View>
        <Text style={styles.rating} >{review.node.rating}</Text>
      </View>
      <View style={styles.flexContainer}>
        <Text style={styles.name} >{review.node.repository.name}/{review.node.repository.ownerName}</Text>
        <Text style={styles.date}>{format(new Date(review.node.createdAt), 'dd.MM.yyyy')}</Text>
        <Text style={styles.text} >{review.node.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;