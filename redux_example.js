// copy and paste into codepen.io & enable redux

console.clear();

// Simple Example of Redux

// 1. People dropping off a form (action creators);
const createPolicy = (name, amount) => {
  return {
    type: 'CREATE_POLICY',
    payload: {
      name: name,
      amount: amount
    }
  };
};

const deletePolicy = (name) => {
  return {
    type: 'DELETE_POLICY',
    payload: {
      name: name
    }
  };
};

const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    type: 'CREATE_CLAIM',
    payload: {
      name: name,
      amountOfMoneyToCollect, amountOfMoneyToCollect
    }
  };
};


// 2. Reducers (Department)
const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === 'CREATE_CLAIM') {
    // we care about this action (FORM!)
    return [...oldListOfClaims, action.payload]
  }
  return oldListOfClaims;
  // We don't care about the action (FORM!)
}

const accounting = (bagOfMoney = 100, action) => {
  if (action.type === 'CREATE_CLAIM') {
    return bagOfMoney - action.payload.amountOfMoneyToCollect;
  } else if (action.type === 'CREATE_POLICY') {
    return bagOfMoney + action.payload.amount;
  }
  return bagOfMoney;
} 

const policies = (listOfPolicies = [], action) => {
  if (action.type === 'CREATE_POLICY') {
     return [...listOfPolicies, action.payload.name]
  } else if (action.type === 'DELETE_POLICY') {
    return listOfPolicies.filter(name => name !== action.payload.name)
  }
  return listOfPolicies;
}

// 3. Build Redux store
const {createStore, combineReducers } = Redux;

const ourDepartments = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies
});

const store = createStore(ourDepartments);

store.dispatch(createPolicy('Ken', 20));
store.dispatch(createPolicy('Bob', 10));
store.dispatch(createPolicy('Jim', 30));
store.dispatch(createPolicy('Teddy', 45));
console.log(store.getState());

store.dispatch(createClaim('John', 125));
store.dispatch(createClaim('Bob', 25));
console.log(store.getState());

store.dispatch(deletePolicy('Teddy'));

console.log(store.getState());

