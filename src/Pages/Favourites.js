import { Box } from '@material-ui/core'
import React from 'react'
import { CryptoState } from '../CryptoContext'
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import FavSection from '../components/FavSection/FavSection';






const Favourites = () => {
  const { user, watchList, coins, symbol } = CryptoState();

  return (
    <Box  style={{
        padding: "30px",
        fontStyle: "Montserrat",
        backgroundColor: "transparent",
        display:"flex",
        alignItems:"center",
        flexWrap:"wrap",
        justifyContent:"center",
        height:"100vh"
      }}>
      {coins.map((coin) => {
        if (watchList.includes(coin.id))
          return (
            <div style={{ overflow: "auto" }}>
              <FavSection coin={coin} />
            </div>
          );
        else return <></>;
      })}
    </Box>
  );
  /*return (
    <Box
      style={{
        padding: "30px",
        fontStyle: "Montserrat",
        backgroundColor: "transparent",
      }}
    >
      <FavSection style={{ margin: "20px" }} coin={coins[0]} />
    </Box>
  );*/
}

export default Favourites