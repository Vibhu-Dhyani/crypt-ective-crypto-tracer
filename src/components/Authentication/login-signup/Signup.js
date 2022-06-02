import { Box, Button, TextField } from "@material-ui/core";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../../Config/firebase";
import { CryptoState } from "../../../CryptoContext";

const Signup = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrimPassword, setConfrimPassword] = useState("");

  const { setAlert } = CryptoState();

  const handleSubmit = async() => {
    if (password !== confrimPassword) {
      setAlert({
        open: true,
        message: "Passwords ain't matching",
        type: "error",
      });
      return;
    }
    try {
        const result = await createUserWithEmailAndPassword(auth,email,password);
        setAlert({
          open: true,
          message: `Sign Up Successfull Welcome ${result.user.email.split('@')[0]}`,
          type: "success",
        });
        handleClose();
    } catch (error) {
        setAlert({
          open: true,
          message: `Error : ${error.messsage}`,
          type: "error",
        });
        return;
    }
  };
  return (
    <Box
      p={3}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        size="small"
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        size="small"
      />
      <TextField
        variant="outlined"
        type="password"
        label="Confirm Password"
        value={confrimPassword}
        onChange={(e) => setConfrimPassword(e.target.value)}
        fullWidth
        size="small"
      />
      <Button
        variant="contained"
        size="small"
        style={{
          backgroundColor: "#45A29E",
          color: "white",
          fontWeight: "bold",
        }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;
