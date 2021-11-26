//COMPONENT WHERE OUR CREATED TRANSACTIONS ARE RENDERED
import React, { useContext } from 'react';
import { List as MUIList, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Slide } from '@material-ui/core';
import { Delete, MoneyOff } from '@material-ui/icons';

import { ExpenseTrackerContext } from '../../../context/context';

import useStyles from './styles';


const List = () => {
    const classes = useStyles();
    const { deleteTransaction, transactions } = useContext(ExpenseTrackerContext); //calling the context as a hook and destructuring the function from the contextReducer because we'll be using it in our delete function //        //passing the transactions that have been added by the user so we'll be able to use it here.


    // console.log (globalState)

    // const transactions = [ // creating a mock transaction
    //     { id: 1, type: 'Income', category: 'Salary', amount: 50, date: 'Thu Nov 18 2021' },
    //     { id: 2, type: 'Expense', category: 'pets', amount: 50, date: 'Thu Nov 19 2021' },
    //     { id: 3, type: 'Income', category: 'Business', amount: 150, date: 'Thu Nov 15 2021' },
    
    
    // ] 
        

    return ( 
        <MUIList dense={false} className={classes.list}>
            {/* Mapping over our transactions */}
            {transactions.map((transaction) =>(
                <Slide direction="down" in mountOnEnter unmountOnExit key={transaction.id}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={transaction.type === 'Income' ? classes.avatarIncome : classes.avatarExpense}>
                                <MoneyOff />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={transaction.category} secondary={`$${transaction.amount} - ${transaction.date}`}/>
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => deleteTransaction(transaction.id)}>
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </Slide>
            ))}
        </MUIList>
     );
}
 
export default List;

//To get access to get the context, we'll import { useContext} and import { ExpenseTrackerContext } created inn the context
