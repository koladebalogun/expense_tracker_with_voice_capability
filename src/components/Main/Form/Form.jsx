//COMPONENT WHERE OUR TRANSACTIONS ARE CREATED
import React, { useState, useEffect, useContext} from 'react';
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { ExpenseTrackerContext  } from '../../../context/context';
import { v4 as uuidv4 } from 'uuid';
import { incomeCategories, expenseCategories} from '../../../constants/categories';
import { useSpeechContext } from '@speechly/react-client';

import formatDate from '../../../utils/formatDate';
import useStyles from './styles';
import CustomizedSnackbar from '../../Snackbar/Snackbar';

const initialState = { //putting all our inputs into a state so we can create a transaction
    amount: '',
    category: '',
    type: 'Income',
    date: formatDate(new Date())
}

const Form = () => {
    const classes = useStyles();
    const [ formData, setFormData ] = useState(initialState);
    const { addTransaction } = useContext(ExpenseTrackerContext); 
    const { segment } = useSpeechContext();
    const [ open, setOpen ] = useState(false);

    const createTransaction = () => {
        if(Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return; // if either one of these things is true our transaction won't be created
        const transaction = { ...formData, amount: Number(formData.amount), id: uuidv4() }; //modifying the amount of the formData to a Number and adding an id to the formdata

        setOpen(true);
        addTransaction(transaction);
        setFormData(initialState); //resetting all the state fields so the user can add a new transaction
    }

    //making speechly carry out actions
    useEffect(() => {
        if(segment){
            if(segment.intent.intent === 'add_expense') {
                setFormData({ ...formData, type: 'Expense'});
            } else if(segment.intent.intent === 'add_income') {
                setFormData({ ...formData, type: 'Income'});
            } else if(segment.isFinal && segment.intent.intent === 'create_transaction') {
                return createTransaction();
            } else if(segment.isFinal && segment.intent.intent === 'cancel_transaction') {
                return  setFormData(initialState);
            }

            segment.entities.forEach((e) => { //the entity.type are the categories, amount, date e.t.c
                const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`
                console.log(e.value) 
                switch (e.type) {
                    case 'amount':
                        setFormData({ ...formData, amount: e.value})
                        break;
                    case 'category':
                        if(incomeCategories.map((income) => income.type).includes(category)){
                            setFormData({ ...formData, type: 'Income', category});
                        } else if(expenseCategories.map((income)  => income.type).includes(category)){
                            setFormData({ ...formData, type: 'Expense', category});
                        }
                        break;
                    case 'date':
                        setFormData({ ...formData, date: e.value})
                        break;
                    default:
                    break;
                }
            });

            if(segment.isFinal && formData.amount && formData.category && formData.type && formData.date) {
                createTransaction();
            } // if all the form datas exist, then it will create a transaction automatically with speech

        }
    }, [segment]);

    const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories; //Our categories would be rendered based on the form data type. so if income is selected, show categories for income and vice versa for expense. 

    return ( 
        <Grid container spacing={2}>
            <CustomizedSnackbar open={open} setOpen={setOpen} />
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                    {/* displaying Words we speak as we interact with speechly */}
                    {segment && (
                        <>
                            {segment.words.map((word) => word.value).join(" ")}
                        </>
                    )}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    {/* For the onChange function, we call the setFormData and put an object in it and we first spread the formData, and only after we spread everything, then we change the type and this will populate our type with either the value of income or expense */}
                    <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value})}> 
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value})}>
                        {/* We loop over the selected Categories */}
                        {selectedCategories.map((category) => <MenuItem key={category.type} value={category.type }>{category.type}</MenuItem> )}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type="number" label="Amount" fullWidth value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value})}/>
            </Grid>
            <Grid item xs={6}>
                <TextField type="date" label="Date" fullWidth value={formData.date} onChange={(e) => setFormData({ ...formData, date: formatDate(e.target.value) })}/>
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
        </Grid>
     );
}
 
export default Form;