import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Action_Key {
  id: UUIDString;
  __typename?: 'Action_Key';
}

export interface AutomationRule_Key {
  id: UUIDString;
  __typename?: 'AutomationRule_Key';
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface GetUserData {
  user?: {
    id: UUIDString;
    displayName: string;
    email: string;
  } & User_Key;
}

export interface GetUserVariables {
  id: UUIDString;
}

export interface Integration_Key {
  id: UUIDString;
  __typename?: 'Integration_Key';
}

export interface ListActiveAutomationRulesData {
  automationRules: ({
    id: UUIDString;
    name: string;
    description?: string | null;
  } & AutomationRule_Key)[];
}

export interface Trigger_Key {
  id: UUIDString;
  __typename?: 'Trigger_Key';
}

export interface UpdateAutomationRuleData {
  automationRule_update?: AutomationRule_Key | null;
}

export interface UpdateAutomationRuleVariables {
  id: UUIDString;
  isActive: boolean;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(): MutationPromise<CreateUserData, undefined>;
export function createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface GetUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
  operationName: string;
}
export const getUserRef: GetUserRef;

export function getUser(vars: GetUserVariables): QueryPromise<GetUserData, GetUserVariables>;
export function getUser(dc: DataConnect, vars: GetUserVariables): QueryPromise<GetUserData, GetUserVariables>;

interface UpdateAutomationRuleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAutomationRuleVariables): MutationRef<UpdateAutomationRuleData, UpdateAutomationRuleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateAutomationRuleVariables): MutationRef<UpdateAutomationRuleData, UpdateAutomationRuleVariables>;
  operationName: string;
}
export const updateAutomationRuleRef: UpdateAutomationRuleRef;

export function updateAutomationRule(vars: UpdateAutomationRuleVariables): MutationPromise<UpdateAutomationRuleData, UpdateAutomationRuleVariables>;
export function updateAutomationRule(dc: DataConnect, vars: UpdateAutomationRuleVariables): MutationPromise<UpdateAutomationRuleData, UpdateAutomationRuleVariables>;

interface ListActiveAutomationRulesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListActiveAutomationRulesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListActiveAutomationRulesData, undefined>;
  operationName: string;
}
export const listActiveAutomationRulesRef: ListActiveAutomationRulesRef;

export function listActiveAutomationRules(): QueryPromise<ListActiveAutomationRulesData, undefined>;
export function listActiveAutomationRules(dc: DataConnect): QueryPromise<ListActiveAutomationRulesData, undefined>;

