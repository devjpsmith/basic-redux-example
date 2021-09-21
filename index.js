const redux = require('redux');

// actions
const createPolicy = (name, amount) => {
  return {
    type: 'CREATE_POLICY',
    payload: {
      name,
      amount
    }
  };
};

const deletePolicy = (name) => {
  return {
    type: 'DELETE_POLICY',
    payload: { 
      name
     }
  };
};

const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    type: 'CREATE_CLAIM',
    payload : {
      name,
      amountOfMoneyToCollect
    }
  };
};

// reducers
const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === 'CREATE_CLAIM') {
    return [...oldListOfClaims, action.payload];
  }
  return oldListOfClaims;
};

const accounting = (bagOfMoney = 100, action) => {
  if (action.type === 'CREATE_CLAIM') {
    return bagOfMoney - action.payload.amountOfMoneyToCollect;
  }
  if (action.type === 'CREATE_POLICY') {
    return bagOfMoney + action.payload.amount;
  }
  return bagOfMoney;
};

const policies = (oldListOfPolicies = [], action) => {
  if (action.type === 'CREATE_POLICY') {
    return [...oldListOfPolicies, action.payload.name];
  }
  if (action.type === 'DELETE_POLICY') {
    return oldListOfPolicies.filter(name => name !== action.payload.name);
  }
  return oldListOfPolicies;
};

// Redux!!
const { createStore, combineReducers } = redux;

const ourDepartments = combineReducers({
  accounting,
  claimsHistory,
  policies
});  

const store = createStore(ourDepartments);

store.dispatch(createPolicy('Alex', 20));
store.dispatch(createPolicy('Jim', 30));
store.dispatch(createPolicy('Bob', 40));

store.dispatch(createClaim('Alex', 120));
store.dispatch(createClaim('Jim', 50));

store.dispatch(deletePolicy('Bob'));

console.log(store.getState());