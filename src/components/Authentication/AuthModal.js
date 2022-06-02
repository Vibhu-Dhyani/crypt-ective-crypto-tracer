import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { AppBar, Box, Button, Tab, Tabs } from "@material-ui/core";
import Login from "./login-signup/Login";
import Signup from "./login-signup/Signup";
import GoogleButton from 'react-google-button'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../Config/firebase";
import { CryptoState } from "../../CryptoContext";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    color: "white",
    borderRadius: 10,
  },
  google: {
    padding: 24,
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 20,
    fontSize: 20,
    
  },
}));

export default function AuthModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
const {setAlert} = CryptoState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

const  googleProvider = new GoogleAuthProvider()

  const signInWithGoogle = () => {
    signInWithPopup(auth,googleProvider).then((res)=>{
      setAlert({
        open:true,
        message : `LogIn Successful`,
        type : "success"
      })
      handleClose()
      
    }).catch(error => {setAlert({

      open:true,
      message:`Erro : ${error}`,
      type:"error"
    }) 
  return;
  } )
    
  }
  return (
    <div>
      <Button
        variant="contained"
        style={{
          backgroundColor: "#45A29E",
          height: "30px",
          fontWeight: "bold",
          color: "white",
        }}
        onClick={handleOpen}
      >
        Login{" "}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar
              position="static"
              style={{ backgroundColor: "transparent", color: "white" }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                style={{ borderRadius: 10 }}
              >
                <Tab label="LogIn" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <Signup handleClose={handleClose} />}
            <Box className={classes.google}>
              <span>OR</span>
              
                <GoogleButton
                  style={{
                    width: "100%",
                    outline: "none",
                  }}
                  onClick={signInWithGoogle}
                />
              
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

