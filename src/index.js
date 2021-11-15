import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://yoga-project-india.herokuapp.com/v1/graphql",
  headers: {
    "x-hasura-admin-secret": "flexMoney-yoga-classes",
    "content-type": "application/json",
  },
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
