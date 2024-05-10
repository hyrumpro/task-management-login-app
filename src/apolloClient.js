import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';

const httpLink = createHttpLink({
    uri: 'http://localhost:3050/graphql',
});

const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('token');

    if (token) {
        operation.setContext({
            headers: {
                Authorization: `${token}`,
            },
        });
    }

    return forward(operation);
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
