"use client";
import { useState, useEffect } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const backendUri = process.env.NEXT_PUBLIC_BACKEND_URL;
const productUri = `${backendUri}/api/product`;
const client = new ApolloClient({
  link: new HttpLink({ uri: productUri }),
  cache: new InMemoryCache(),
});

export default function ProductManagerGraph() {
  return (
      <ApolloProvider client={client} children={undefined}></ApolloProvider>
  );
}
