import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import AppBarTab from './AppBarTab';
import theme from "../theme";
import { useQuery } from '@apollo/react-hooks';
import { AUTHORIZED_USER } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'row',
    alignItems: "flex-end",
    backgroundColor: theme.appBar.backgroundColor
  },
  scrollView: {
    marginHorizontal: 0,
  },
  text: {
    color: 'white',
    marginRight: 10,
  }
});

const AppBar = () => {
  const { data } = useQuery(AUTHORIZED_USER, {
    fetchPolicy: "cache-and-network",
  });

  let authorizedUser = data ? data.authorizedUser : null;
  const signOut = useSignOut();

  console.log('from ---> AppBar - authorizedUser', authorizedUser);


  return (
    <View style={styles.container}>
      <ScrollView style={styles.tabsContainer} horizontal >
        <AppBarTab link='/' label='Repositories' />
        {!authorizedUser && <AppBarTab link='/signIn' label='Sign in' />}
        {!authorizedUser && <AppBarTab link='/signUp' label='Sign up' />}
        {authorizedUser && <AppBarTab link='/createReview' label='Create a review' />}
        {authorizedUser && <AppBarTab label='Sign out' onPress={() => signOut()} />}
      </ScrollView>
    </View>
  );
};

export default AppBar;