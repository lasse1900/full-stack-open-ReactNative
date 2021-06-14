import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import theme from '../theme';
import numeral from 'numeral';

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 8,
    backgroundColor: theme.colors.backgroundColor,
  },
  flexContainerTop: {
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    marginLeft: 4,
  },
  flexContainerLow: {
    display: 'flex',
    flexGrow: 0,
    flexDirection: 'row',
    marginLeft: 4,
    justifyContent: 'space-evenly'
  },
  flexContainerImage: {
    flexGrow: 0,
    flexDirection: 'column',
  },
  languageText: {
    color: 'blue',
    fontWeight: theme.fontWeights.bold,
  },
  image: {
    flexGrow: 0,
    padding: 5,
    borderRadius: 5,
    width: 40,
    height: 40,
    marginRight: 20,
  },
  nameText: {
    flexGrow: 0,
    display: 'flex',
    fontWeight: theme.fontWeights.bold,
  },
  statisticText: {
    flexGrow: 0,
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center'
  },
  detailsStyle: {
    justifyContent: 'center',
  }
});

const RepositoryItem = ({ item, singleView }) => {
  return (
    <View style={styles.flexContainer}>
      <View style={styles.flexContainerTop}>
        <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.flexContainerImage}>
          <Text testID='fullName' style={styles.nameText}>{item.fullName}</Text>
          <Text testID='repoDescription'>{item.description}</Text>
          <Text testID='repoLanguage' style={styles.languageText}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.flexContainerLow}>
        <View style={styles.detailsStyle}>
          <Text testID='stargazersCount' style={styles.statisticText}>
            {numeral(item.stargazersCount).format('0.0a')}
          </Text>
          <Text>{'Stars'}</Text>
        </View>
        <View style={styles.detailsStyle}>
          <Text testID='forksCount' style={styles.statisticText}>
            {numeral(item.forksCount).format('0.0a')}
          </Text>
          <Text>{'Forks'}</Text>
        </View>
        <View testID='reviewCount' style={styles.detailsStyle}>
          <Text style={styles.statisticText}>{item.reviewCount}</Text>
          <Text>{'Reviews'}</Text>
        </View>
        <View testID='ratingAverage' style={styles.detailsStyle}>
          <Text style={styles.statisticText}>{item.ratingAverage}</Text>
          <Text>{'Rating'}</Text>
        </View>
      </View>
      {singleView &&
        <View style={styles.flexContainer}>
          <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
            <Text style={styles.languageText}>Open in GitHub</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  );
};

export default RepositoryItem;