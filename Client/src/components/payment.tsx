import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const CreditCard = () => {

  const handleCardNumberChange = (e: any) => {
    const input = e.target.value.length;

    if (input == 4 || input == 9 || input == 14) {
      if (!(e.nativeEvent.inputType === 'deleteContentBackward'))
        e.target.value += " ";
    }
  }

  const handleExpirationDateChange = (e: any) => {


    if (e.target.value.length == 2) {
      if (!(e.nativeEvent.inputType === 'deleteContentBackward'))
        e.target.value += " / ";

    }

  }


  return (
    <Card>

      <CardContent>
        <Typography variant="h5" component="h2">
          פרטי כרטיס אשראי
        </Typography>
        
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="מספר אשראי"
              variant="outlined"
              inputProps={{
                maxLength: 19,
                inputMode: 'numeric',
                pattern: '[0-9]*',
              }}
              onChange={handleCardNumberChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="תאריך תפוגה"
              variant="outlined"
              inputProps={{
                maxLength: 7,
                inputMode: 'numeric',
                pattern: '[0-9]*',
              }}
              onChange={handleExpirationDateChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="CVV"
              variant="outlined"
              inputProps={{
                maxLength: 3,
                inputMode: 'numeric',
                pattern: '[0-9]*',
              }}
            />
          </Grid>
          
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CreditCard;
