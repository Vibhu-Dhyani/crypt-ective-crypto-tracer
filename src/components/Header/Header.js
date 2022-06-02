import './Header.css'

import React from 'react'
import { AppBar, Container, MenuItem, Select, Toolbar, Tooltip, Typography } from '@material-ui/core'
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom'
import { CryptoState } from '../../CryptoContext';
import AuthModal from '../Authentication/AuthModal';
import UserSidebar from '../UserSidebar/UserSidebar';
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "#66FCF1",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));
const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

const Header = () => {



const classes = useStyles();
const history = useHistory();
const { currency , setCurrency,user} = CryptoState();
console.log(currency)


  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static" />
      <Container>
        <Toolbar>
          <Typography
            onClick={() => history.push("/")}
            className={classes.title}
            variant="h5"
           
          >
            Crypt-Ective
          </Typography>
          <Select
            variant="outlined"
            style={{
              width: 100,
              height: 30,
              marginRight: 15,
            }}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
          {user && (
            <Tooltip title="View Favourites">
              
              <FavoriteIcon
                style={{ cursor: "pointer", marginRight: "10px" }}
                onClick={() => history.push("/fav")}
              />
            </Tooltip>
          )}
          {user ? <UserSidebar /> : <AuthModal />}
        </Toolbar>
      </Container>
    </ThemeProvider>
  );
}

export default Header