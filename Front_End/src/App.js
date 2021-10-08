// import { createTheme, ThemeProvider } from '@material-ui/core';
// import { Suspense } from 'react';
// import 'react-toastify/dist/ReactToastify.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Category from './pages/Category';
import PageNotFound from './pages/404NotFound';
import HomePage from './pages/Home';
import HistoryBidSeller from './pages/seller/HistoryBid';
import HistoryBidBidder from './pages/bidder/HistoryBid';

//authentication route
// ...rest = path = "link"
//children = page -------  example : <Category />
function PrivateRouter({children, ...rest}) {
  let auth = {
    user:true
  }
  return (
    <Route {...rest} render={() => {
      //check whether user authenticated or not, if not return to homepage
      if(auth.user){
        return children; 
      }else{
        return <Redirect to={{ pathname: '/'}} />
      }
    }} />
  );
};
//the main component of ReactJS is App component
function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" render = {() =>{return <HomePage />}} />

        <Route exact path="/seller/History-bid" render = {() =>{return <HistoryBidSeller />}} />
        <Route exact path="/bidder/History-bid" render = {() =>{return <HistoryBidBidder />}} />

        <PrivateRouter path="/category">
          <Category />
        </PrivateRouter>

        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
