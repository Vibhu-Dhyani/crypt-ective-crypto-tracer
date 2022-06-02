
import './App.css';
import {BrowserRouter, Route} from "react-router-dom"
import Header from './components/Header/Header';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
import {makeStyles} from '@material-ui/core'
import Alert from './components/Alert/Alert';
import Favourites from './Pages/Favourites';

function App() {

  const useStyles = makeStyles (() =>( {
    App:{
      backgroundColor:'#1F2833',
      color: 'white',
      minHeight:'100vh',
      
    }
  }));
  const classes = useStyles()



  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Route path="/" component={Homepage} exact />
        <Route path="/coins/:id" component={CoinPage} exact />
        <Route path="/fav" component={Favourites} exact />
      </div>
      <Alert />
    </BrowserRouter>
  );
}

export default App;
