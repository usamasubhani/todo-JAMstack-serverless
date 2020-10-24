const React = require("react");
const { ApolloClient, HttpLink, ApolloProvider, InMemoryCache } = require("@apollo/client")
const wrapRootElement = require("./wrap-root-element");

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: "https://todo-jamstack-serverless.netlify.app/.netlify/functions/graphql"
    })
})

exports.wrapRootElement = ({ element }) => (
    <ApolloProvider client={client}>
        {wrapRootElement({element})}
    </ApolloProvider>
)
// exports.wrapRootElement = wrapRootElement;