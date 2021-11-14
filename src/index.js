import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://neutral-lacewing-21.hasura.app/v1/graphql/",
  headers: {
    "x-hasura-admin-secret":
      "cll3bAIxXUKC6r9mND16K1shsxnOPf75QWq3vjuw3o6RMrEzoJIBr86PmWNTSPVh",
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
