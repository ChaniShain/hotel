import './App.css'
import { AppRoutes } from './appRoutes'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/material"


function App() {
  const theme = createTheme({
    typography: {
      fontFamily: 'Rubik, sans-serif',
    },

    components: {

      MuiInputLabel: {

        styleOverrides: {

          root: {


            // color: "lightgray",
            // "&.Mui-focused": {
            //   borderColor: 'black',

            //   color: "orange"
            // },
            //   '&.Mui-selected': {
            //     color: "black"
            //   },
            // "&$focused": { // increase the specificity for the pseudo class
            //   color: "black"
            // }
          },

        }
      },
      MuiSelect: {
        styleOverrides: {

          select: {
            "&.Mui-focused": {
              borderColor: 'black',

              color: "orange"
            },
            '&.MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select ': {

              borderColor: 'black',

            },
            '&.MuiOutlinedSelect-root.Mui-focused fieldset': {
              borderColor: 'black',
            },
            '&.MuiOutlinedInput-notchedOutline.Mui-focused': {
              borderColor: 'black',
            },


            "&.MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "red"
              },
              "&:hover fieldset": {
                borderColor: "yellow"
              },
              "&.Mui-focused fieldset": {
                borderColor: "green"
              }
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "green"

            },
            "& .Mui-focused": {
              color: "black"
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "black"
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "black"
              },
              "&:hover fieldset": {
                borderColor: "black"
              },
              "&.Mui-focused fieldset": {
                borderColor: "black"
              }
            }
          },

        }
      },


      MuiTextField: {
        styleOverrides: {
          root: {
            '&.Mui-focused fieldset': {
              borderColor: '#131054',
            },

            '& label.Mui-focused': {
              color: '#131054', // Change the border color when focused
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: '#131054', // Change the border color when focused
            },
            '& .MuiOutlinedInput-root.Mui-focused fieldset': {
              borderColor: '#131054',
            },

          },
        },
      },
    },
  });
  return (
    // <div className='App'>
    <ThemeProvider theme={theme}>
      <AppRoutes />

    </ThemeProvider>
  );
}

export default App