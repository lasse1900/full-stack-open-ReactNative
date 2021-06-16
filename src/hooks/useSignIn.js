import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { SIGN_IN } from '../graphql/mutations';
import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useHistory } from 'react-router-native';

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);
  const authStorage = useContext(AuthStorageContext);
  const history = useHistory();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    try {
      const { data } = await mutate({
        variables: { username: username, password: password },
      });
      // console.log('ACCESS TOKEN (useSignIn)---> ', data.authorize.accessToken);
      await authStorage.setAccessToken(data.authorize.accessToken);
      apolloClient.resetStore();
      history.push('/');
      return { data };
    } catch (error) {
      console.log(error);
    }

  };

  return [signIn, result];
};

export default useSignIn;