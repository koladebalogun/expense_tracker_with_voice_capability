// Redcuer is a function that takes in the old state and action and returns a new state

const contextReducer = ( state, action ) => {
    let transactions; // we can't have two variables with the same name

    switch (action.type) {
        case 'DELETE_TRANSACTION':
            transactions = state.filter((transaction) => transaction.id !== action.payload ); //the payload is our id for delete that we set in the context

            localStorage.setItem('transactions', JSON.stringify(transactions));

            return transactions;    
        case 'ADD_TRANSACTION':
            transactions = [action.payload, ...state]; // transactions would be equal to an array and inside here, we'll put our new transactions.
            //so we have a new array, add the action.payload which is the new transaction and then spread the other transactions. this will make sure our new transactions pop up and the other transactions are still stored there.

            localStorage.setItem('transactions', JSON.stringify(transactions));

            
            return transactions;
        default:
            return state; 
    }
    
}

export default contextReducer;

//with the switch statement, we are saying based on the action type, if the action is something, do something and if it is something different, do something else

// our state is the transactions, as we set it in the context.js file

//We'll store all our transactions in the local storage