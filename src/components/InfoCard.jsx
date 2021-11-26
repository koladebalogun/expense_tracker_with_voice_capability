import React from 'react';

const isIncome = Math.round(Math.random()); // this will give us zero 50% of the time and one 50% of the time

const InfoCard = () => {
    return ( 
        <div style={{ textAlign: 'center', padding: '0 10px' }}>
            Try saying: <br />
            Add { isIncome ? 'Income ' : 'Expense '} 
            for { isIncome ? '$200 ' : '$100 '} 
            in category { isIncome ? 'Business ' : 'Shopping '} 
            for { isIncome ? 'Monday ' : 'Wednesday '}
        </div>
     );
}
 
export default InfoCard;