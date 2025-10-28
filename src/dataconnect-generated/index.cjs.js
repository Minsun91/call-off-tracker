const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'callofftracker',
  location: 'europe-central2'
};
exports.connectorConfig = connectorConfig;

const createUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser');
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dc) {
  return executeMutation(createUserRef(dc));
};

const getUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUser', inputVars);
}
getUserRef.operationName = 'GetUser';
exports.getUserRef = getUserRef;

exports.getUser = function getUser(dcOrVars, vars) {
  return executeQuery(getUserRef(dcOrVars, vars));
};

const updateAutomationRuleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAutomationRule', inputVars);
}
updateAutomationRuleRef.operationName = 'UpdateAutomationRule';
exports.updateAutomationRuleRef = updateAutomationRuleRef;

exports.updateAutomationRule = function updateAutomationRule(dcOrVars, vars) {
  return executeMutation(updateAutomationRuleRef(dcOrVars, vars));
};

const listActiveAutomationRulesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListActiveAutomationRules');
}
listActiveAutomationRulesRef.operationName = 'ListActiveAutomationRules';
exports.listActiveAutomationRulesRef = listActiveAutomationRulesRef;

exports.listActiveAutomationRules = function listActiveAutomationRules(dc) {
  return executeQuery(listActiveAutomationRulesRef(dc));
};
