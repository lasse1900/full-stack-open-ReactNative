import { useQuery } from "@apollo/react-hooks";
import { AUTHORIZED_USER } from '../graphql/queries';

const useUserReviews = (variables) => {

  const { data, loading, fetch } = useQuery(AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetch = () => {
    const canFetchNext = !loading && data && data.authorizedUser.reviews.pageInfo.hasNextPage;

    if (!canFetchNext) {
      return;
    }

    fetch({
      query: AUTHORIZED_USER,
      variables: {
        after: data.authorizedUser.reviews.pageInfo.endCursor,
        ...variables
      },
      updateQuery: (previousResult, { fetchResult }) => {
        const nextResult = {
          authorizedUser: {
            ...previousResult.authorizedUser,
            reviews: {
              ...fetchResult.authorizedUser.reviews,
              edges: [
                ...previousResult.authorizedUser.reviews.edges,
                ...fetchResult.authorizedUser.reviews.edges,
              ],
            },
          },
        };
        return nextResult;
      },
    });
  };

  return {
    reviews: data ? data.authorizedUser.reviews.edges : [],
    fetc: handleFetch,
    loading,
  };
};

export default useUserReviews;