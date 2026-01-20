"use client";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import {setContext} from "@apollo/client/link/context";

const backendUri = process.env.NEXT_PUBLIC_BACKEND_HASURA_URL;
const productUri = `${backendUri}`;

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_URL,
  headers: {
    "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET || "",
  },
});

const auth = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: auth.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function Provider({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
