import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import theme from '../theme';
import RepositoryView from './RepositoryView';
import CreateReview from './CreateReview';
import UserReviews from './UserReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.white
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route exact path='/' component={RepositoryList} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/createReview' component={CreateReview} />
        <Route path='/myReviews' component={UserReviews} />
        <Route path="/:id" component={RepositoryView} />
        <Redirect to='/' />
      </Switch>
    </View>
  );
};

export default Main;