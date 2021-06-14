import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORY_BY_ID } from '../graphql/queries';

const useRepository = (id) => {
  const { data, ...result } = useQuery(GET_REPOSITORY_BY_ID, {
    variables: { id },
    fetchPolicy: 'cache-and-network'
  });

  return {
    repository: data ? data.repository : undefined, ...result
  };
};

export default useRepository;