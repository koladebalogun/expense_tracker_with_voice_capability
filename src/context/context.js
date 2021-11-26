//FOR THE REACT CONTEXT API //
import React, { useReducer, createContext} from 'react';

import contextReducer from './contextReducer';

const initialState = JSON.parse(localStorage.getItem('transactions')) || [{"amount":400,"category":"Shopping","type":"Expense","date":"2021-11-20","id":"e2dbd2a8-d67f-495e-ace"}]; //At the start, we set our initialState to be an empty array because there aren't any transactions at the start, then if we have transactions we pull it from local storage and if there aren't any we won't be greeting our users with no display

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
    const [ transactions, dispatch ] = useReducer(contextReducer, initialState );

    //Action Creators//
    const deleteTransaction = (id) => { // so here we are saying once you delete the transaction, call this function with the provided id and dispatch an action {('DELETE_TRANSACTION') with this id (payload : id)} 
        dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    }

    const addTransaction = (transaction) => { // here we need to pass in the tranaction when adding, we can't use the id because it doesn't exist yet
        dispatch({ type: 'ADD_TRANSACTION', payload: transaction });

    }

    const balance = transactions.reduce((acc, currVal) => {
        return (currVal.type === 'Expense' ? acc -currVal.amount : acc + currVal.amount)
    }, 0)

    console.log(transactions)

    return (
        // Everything that us wrapped in this component will have access to the context
        //passing the transactions that have been added by the user so we'll be able to use it in other components
        <ExpenseTrackerContext.Provider value={{ deleteTransaction, addTransaction, transactions, balance }}>  
            { children }
        </ExpenseTrackerContext.Provider>
    )
};

//From here, we move to our index.js to wrap our whole application in our context and in here, now that we know how our actions will look like with the ({ type and payload }), we move to the reducers to form our reducer

// export const Provider = ({ children }) => {
//     const [ state, dispatch ] = useReducer(contextReducer, initialState );
//      our state represents all the transactions 