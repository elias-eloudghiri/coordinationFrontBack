import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** columns and relationships of "company" */
export type Company = {
  __typename?: 'company';
  /** An array relationship */
  products: Array<Product>;
};


/** columns and relationships of "company" */
export type CompanyProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Product_Order_By>>;
  where?: InputMaybe<Product_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "company". All fields are combined with a logical 'AND'. */
export type Company_Bool_Exp = {
  _and?: InputMaybe<Array<Company_Bool_Exp>>;
  _not?: InputMaybe<Company_Bool_Exp>;
  _or?: InputMaybe<Array<Company_Bool_Exp>>;
  products?: InputMaybe<Product_Bool_Exp>;
};

/** Ordering options when selecting data from "company". */
export type Company_Order_By = {
  products_aggregate?: InputMaybe<Product_Aggregate_Order_By>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "product" */
export type Product = {
  __typename?: 'product';
  /** An object relationship */
  company: Company;
};

/** order by aggregate values of table "product" */
export type Product_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "product". All fields are combined with a logical 'AND'. */
export type Product_Bool_Exp = {
  _and?: InputMaybe<Array<Product_Bool_Exp>>;
  _not?: InputMaybe<Product_Bool_Exp>;
  _or?: InputMaybe<Array<Product_Bool_Exp>>;
  company?: InputMaybe<Company_Bool_Exp>;
};

/** Ordering options when selecting data from "product". */
export type Product_Order_By = {
  company?: InputMaybe<Company_Order_By>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "company" */
  company: Array<Company>;
  /** fetch data from the table: "product" */
  product: Array<Product>;
};


export type Query_RootCompanyArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Company_Order_By>>;
  where?: InputMaybe<Company_Bool_Exp>;
};


export type Query_RootProductArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Product_Order_By>>;
  where?: InputMaybe<Product_Bool_Exp>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "company" */
  company: Array<Company>;
  /** fetch data from the table: "product" */
  product: Array<Product>;
};


export type Subscription_RootCompanyArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Company_Order_By>>;
  where?: InputMaybe<Company_Bool_Exp>;
};


export type Subscription_RootProductArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Product_Order_By>>;
  where?: InputMaybe<Product_Bool_Exp>;
};
