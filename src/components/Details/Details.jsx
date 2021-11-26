import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";

import useTransactions from "../../useTransactions";
import useStyles from "./styles";

const Details = ({ title }) => {
  const classes = useStyles();
  const { total, chartData } = useTransactions(title); // we are getting the total which we already calculated and the chartData from our custom hook and the use transaction hook takes in one parameter which is the title
  return (
    <Card className={title === "Income" ? classes.income : classes.expense}>
      <CardHeader title={title} />
      <CardContent>
        <Typography variant="h5">${total}</Typography>
        <Doughnut data={chartData} />
      </CardContent>
    </Card>
  );
};

export default Details;

//In speechly, everything we've wrapped in curly braces means it's optional we don't have to say it
//in speechly, {[for|of]} this means the user can either say 'for' or 'of'
