import { Container, makeStyles, Typography} from '@material-ui/core'
import React from 'react'
import './Banner.css'
import Carousel from './Carousel';
const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage:
      "url('../../Resources/Banner_Background/banner_background.jpg')",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
    
  },
  tagLine:{
display:"flex",
height:"40%",
flexDirection:"column",
justifyContent:"center",
textAlign:"center",
  },
}));


const Banner = () => {
    const classes = useStyles();
  return (
    <div className="banner">
      <Container className={classes.bannerContent}>
        <div className={classes.tagLine}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
              color: "black",
            }}
          >
            Crypt-Ective
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "#1F2833",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Track All About Your Favourite Crypto
          </Typography>
        </div>
        <Carousel/>
      </Container>
    </div>
  );
}

export default Banner