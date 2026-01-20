"use client";
import { useState, useEffect } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const backendUri = process.env.NEXT_PUBLIC_BACKEND_HASURA_URL;
const productUri = `${backendUri}`;
const client = new ApolloClient({
  link: new HttpLink({ uri: productUri, headers: {
      "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET || "",
    } }),
  cache: new InMemoryCache(),
});

export default function Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
