import { CreateUserData, GetUserData, GetUserVariables, UpdateAutomationRuleData, UpdateAutomationRuleVariables, ListActiveAutomationRulesData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;

export function useGetUser(vars: GetUserVariables, options?: useDataConnectQueryOptions<GetUserData>): UseDataConnectQueryResult<GetUserData, GetUserVariables>;
export function useGetUser(dc: DataConnect, vars: GetUserVariables, options?: useDataConnectQueryOptions<GetUserData>): UseDataConnectQueryResult<GetUserData, GetUserVariables>;

export function useUpdateAutomationRule(options?: useDataConnectMutationOptions<UpdateAutomationRuleData, FirebaseError, UpdateAutomationRuleVariables>): UseDataConnectMutationResult<UpdateAutomationRuleData, UpdateAutomationRuleVariables>;
export function useUpdateAutomationRule(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateAutomationRuleData, FirebaseError, UpdateAutomationRuleVariables>): UseDataConnectMutationResult<UpdateAutomationRuleData, UpdateAutomationRuleVariables>;

export function useListActiveAutomationRules(options?: useDataConnectQueryOptions<ListActiveAutomationRulesData>): UseDataConnectQueryResult<ListActiveAutomationRulesData, undefined>;
export function useListActiveAutomationRules(dc: DataConnect, options?: useDataConnectQueryOptions<ListActiveAutomationRulesData>): UseDataConnectQueryResult<ListActiveAutomationRulesData, undefined>;
