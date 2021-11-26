import React, { useContext } from "react";
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@material-ui/core';
import { ExpenseTrackerContext } from '../../context/context'
import useStyles from './styles'
import Form from './Form/Form';
import List from './List/List';
import InfoCard from "../InfoCard";

const Main = () => {
    const classes = useStyles();
    const { balance } = useContext(ExpenseTrackerContext);

    return ( 
        <Card className={classes.root}>
            <CardHeader title="Expense Tracker" subheader="Powered by Speechly" />
            <CardContent>
                <Typography align="center" variant="h5">Total Balance ${balance }</Typography>
                <Typography variant="subtitle1" style={{ lineHeight: "1.5em", marginTop: "20px"}}>
                    {/* Info card, what you'll say to get information out of speechly */}
                    <InfoCard/>
                </Typography>
                <Divider className={classes.divider} />
                {/* Form component*/}
                <Form/>
            </CardContent>
            <CardContent className={classes.cardContent}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {/* List  component*/}
                        <List />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
     );
}
 
export default Main;