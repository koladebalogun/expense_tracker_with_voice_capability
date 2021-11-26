// This is a custom hook which we are using to get the Data for our chart.js
import { useContext } from 'react';
import { ExpenseTrackerContext } from './context/context';
import { incomeCategories, expenseCategories, resetCategories } from './constants/categories';


const useTransactions = (title) => { // This custom hook will accept one parameter, title and based on the title we'll know if we are on the income or expense category

    resetCategories(); //As soon as the use transaction runs, we'll call the reset categories, because we have to reset the amounts to zero

    const { transactions } = useContext(ExpenseTrackerContext); // we'll get the transactions from the context

    //Now we want to filter out the transaction for a specific type. to know if it will be income or expense
    //we'll filter the transactions and keep only the one where transaction.type === title
    //so we are basically filtering out only the one we need. e.g if the title is income, we'll keep only the income
    const transactionsPerType = transactions.filter((transaction) => transaction.type === title);

    const total = transactionsPerType.reduce((acc, currVal) => acc += currVal.amount, 0 ); //reduce is used when you want to sum up an array of values

    const categories = title === 'Income' ? incomeCategories : expenseCategories;

    console.log({transactionsPerType, total, categories});

    transactionsPerType.forEach(transaction =>{ //here, we are mapping through transactionspertype and for each transaction, we need to find a category it belongs to
        const category = categories.find((categories) => categories.type === transaction.category);

        if(category) {
            category.amount += transaction.amount
        }
    })

    //Removing categories with amount less than or equal to zero will
    const filteredCategories = categories.filter((category) => category.amount > 0);

    const chartData = {
        datasets: [{
            data: filteredCategories.map((category) => category.amount),
            backgroundColor: filteredCategories.map((category) => category.color)
        }],
        labels: filteredCategories.map((category) => category.type)
    }

    return { total, chartData }

}

export default useTransactions;