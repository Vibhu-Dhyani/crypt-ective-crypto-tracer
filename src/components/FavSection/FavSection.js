import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CoinInfo from "../CoinInfo/CoinInfo";
import CoinInfoCard from "../CoinInfoCard/CoinInfoCard";
import { CryptoState } from "../../CryptoContext";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import DeleteForever from "@material-ui/icons/DeleteForever";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useHistory } from "react-router-dom";
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const useStyles = makeStyles({
  root: {
    minWidth: 290
    ,
    margin:"20px",
    overflow:"auto",
    transition: "0.3s",
    backgroundColor:"rgba(255,255,255,0.2)",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.5)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.5)",
    },
  },
  media: {
    height: 140,
  },
});
export default function FavSection({coin}) {
  const history = useHistory();
   let profit = coin?.price_change_percentage_24h >= 0;
  const classes = useStyles();
  const {
    currency,
    symbol,
    user,
    watchList,
    addToWatchlist,
    removeFromWatchlist,
  } = CryptoState();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CoinInfoCard coin={coin} />
        <CardContent>
          <span>
            <img src={coin.image} style={{ height: 30, float: "left" }} />
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              style={{ marginTop: "0px" }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  color: "white",
                  marginLeft: "10px",
                }}
              >
                {" "}
                {coin.name}{" "}
                <span
                  style={{
                    color: profit > 0 ? "rgb(14,203,129)" : "red",
                    fontWeight:'light',
                    fontSize:'15px'
                  }}
                >
                  {profit && "+"}
                  {coin?.price_change_percentage_24h?.toFixed(2)}%
                  {profit > 0 ? (
                    <ArrowUpwardIcon
                      style={{ color: "rgb(14,203,129)", fontSize: "small" }}
                    />
                  ) : (
                    <ArrowDownwardIcon
                      style={{ color: "red", fontSize: "small" }}
                    />
                  )}
                </span>
              </span>
            </Typography>
          </span>
          <span>
            <Typography style={{ fontWeight: "bold", color: "white" }}>
              Rank : {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>
          <span>
            <Typography style={{ fontWeight: "bold", color: "white" }}>
              Market Cap : {symbol + " "}
              {numberWithCommas(coin?.market_cap).toString().slice(0, -8)}M
            </Typography>
          </span>
          <span>
            <Typography style={{ fontWeight: "bold", color: "white" }}>
              Current Price : {symbol + " "}
              {numberWithCommas(coin?.current_price).toString()}
            </Typography>
          </span>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" style = {{color:'red'}} onClick={() => removeFromWatchlist(coin)}>
          <DeleteForever />
        </Button>
        <Button  size="small" style={{color:"white" }} onClick = { () => history.push(`/coins/${coin.id}`) } >
          <VisibilityIcon/>
        </Button>
      </CardActions>
    </Card>
  );
}
