import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
};

export type ContentCategory = {
  __typename?: 'ContentCategory';
  id: Scalars['Int'];
};

export type Project = {
  __typename?: 'Project';
  content?: Maybe<ProjectFileSet>;
  contents?: Maybe<Array<Maybe<ProjectFileSet>>>;
  id: Scalars['Int'];
  name: Scalars['String'];
};


export type ProjectContentArgs = {
  id: Scalars['Int'];
};

export type ProjectFileEntry = {
  __typename?: 'ProjectFileEntry';
  _projectId?: Maybe<Scalars['Int']>;
  category: ContentCategory;
  fileContents?: Maybe<Scalars['JSON']>;
  key: Scalars['String'];
  name: Scalars['String'];
  project?: Maybe<Project>;
};

export type ProjectFileSet = {
  __typename?: 'ProjectFileSet';
  category: ContentCategory;
  entries: Array<Maybe<ProjectFileEntry>>;
  parentId: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  file?: Maybe<ProjectFileEntry>;
  project?: Maybe<Project>;
  projects?: Maybe<Array<Maybe<Project>>>;
};


export type QueryFileArgs = {
  key: Scalars['String'];
  projectId: Scalars['Int'];
};


export type QueryProjectArgs = {
  id: Scalars['Int'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ContentCategory: ResolverTypeWrapper<ContentCategory>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Project: ResolverTypeWrapper<Project>;
  ProjectFileEntry: ResolverTypeWrapper<ProjectFileEntry>;
  ProjectFileSet: ResolverTypeWrapper<ProjectFileSet>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  ContentCategory: ContentCategory;
  Int: Scalars['Int'];
  JSON: Scalars['JSON'];
  Project: Project;
  ProjectFileEntry: ProjectFileEntry;
  ProjectFileSet: ProjectFileSet;
  Query: {};
  String: Scalars['String'];
}>;

export type ContentCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContentCategory'] = ResolversParentTypes['ContentCategory']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = ResolversObject<{
  content?: Resolver<Maybe<ResolversTypes['ProjectFileSet']>, ParentType, ContextType, RequireFields<ProjectContentArgs, 'id'>>;
  contents?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProjectFileSet']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProjectFileEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectFileEntry'] = ResolversParentTypes['ProjectFileEntry']> = ResolversObject<{
  _projectId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  category?: Resolver<ResolversTypes['ContentCategory'], ParentType, ContextType>;
  fileContents?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProjectFileSetResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectFileSet'] = ResolversParentTypes['ProjectFileSet']> = ResolversObject<{
  category?: Resolver<ResolversTypes['ContentCategory'], ParentType, ContextType>;
  entries?: Resolver<Array<Maybe<ResolversTypes['ProjectFileEntry']>>, ParentType, ContextType>;
  parentId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  file?: Resolver<Maybe<ResolversTypes['ProjectFileEntry']>, ParentType, ContextType, RequireFields<QueryFileArgs, 'key' | 'projectId'>>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryProjectArgs, 'id'>>;
  projects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  ContentCategory?: ContentCategoryResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Project?: ProjectResolvers<ContextType>;
  ProjectFileEntry?: ProjectFileEntryResolvers<ContextType>;
  ProjectFileSet?: ProjectFileSetResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

