"use client";

import {ApolloClient, HttpLink, InMemoryCache, split} from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { setContext } from "@apollo/client/link/context";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {createClient} from "graphql-ws";
import {getMainDefinition} from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_BACKEND_HASURA_URL,
  headers: {
    "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET || "",
  },
});

const auth = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: (process.env.NEXT_PUBLIC_BACKEND_HASURA_URL || "").replace(
            /^http/,
            "ws",
          ),
          connectionParams: () => {
            const token = localStorage.getItem("token");
            return {
              headers: {
                "x-hasura-admin-secret":
                  process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET || "",
                authorization: token ? `Bearer ${token}` : "",
              },
            };
          },
        }),
      )
    : null;

const splitLink =
  wsLink != null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        auth.concat(httpLink),
      )
    : auth.concat(httpLink);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default function Provider({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
