import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import {CryptoState} from '../../CryptoContext'
import { Avatar, IconButton } from "@material-ui/core";
import { signOut } from "firebase/auth";
import { auth } from "../../Config/firebase";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const useStyles = makeStyles({
  container: {
    width: 350,
    padding: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "montserrat",
  },
  profile: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "92%",
    marginBottom: "-150px",
  },

  photo: {
    width: 110,
    height: 110,
    cursor: "pointer",
    backgroundColor: "#66FCF1",
    objectFit: "contain",
  },
  watchlist: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0B0C10",
    borderRadius: 10,
    padding: 15,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    overflowY: "auto",

  },
  coin: {
    padding: 10,
    borderRadius: 5,
    color: "black",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#66FCF1",
    boxShadow: "0 0 3px black",
    height: "30px",
    boxShadow: "0 0 5px white",
  },
});

export default function UserSidebar() {
  const { user, setAlert, coins, symbol,watchList,removeFromWatchlist } = CryptoState();
  const classes = useStyles();
  const [state, setState] = React.useState({
    
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      
      <Divider />
      
    </div>
  );


  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successfull !",
    });

    toggleDrawer();
  };

console.log(user.uid)

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            onClick={toggleDrawer(anchor, true)}
            style={{ height: "40px", width: "40px" }}
          >
            <Avatar
              style={{
                height: "40px",
                width: "40px",
                backgroundColor: "#66FCF1",
                cursor: "pointer",
              }}
              src={user.photoURL}
              alt={user.displayName || user.email}
            />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className={classes.container}>
              <div className={classes.profile}>
                <IconButton>
                  <Avatar
                    className={classes.photo}
                    src={user.photoURL}
                    alt={user.displayName || user.email}
                  />
                </IconButton>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    width: "100%",
                    textAlign: "center",
                  }}
                >{`@${user.email || user.displayName}`}</span>
              </div>
              <div className={classes.watchlist}>
                <span style={{ fontSize: 15, textShadow: "0 0 5px white" ,fontWeight:"bold" }}>
                  Favourites
                </span>
                {coins.map((coin) => {
                  if (watchList.includes(coin.id))
                    return (
                      <div className={classes.coin}>
                        <FavoriteIcon
                          style={{ color: "black", fontSize: "20px" ,}}
                        />
                        <span>{coin.name}</span>
                        <span style={{ display: "flex", gap: 8 }}>
                          {symbol}{" "}
                          {numberWithCommas(coin.current_price.toFixed(2))}
                          <DeleteForeverIcon
                            style={{ cursor: "pointer" }}
                            fontSize="16"
                            onClick={() => removeFromWatchlist(coin)}
                          />
                        </span>
                      </div>
                    );
                  else return <></>;
                })}
              </div>

              <div>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#45A29E",
                    width: "100%",

                    color: "white",
                    marginTop: "20%",
                    fontWeight: "bold",
                  }}
                  onClick={logOut}
                >
                  Log Out
                </Button>
              </div>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
