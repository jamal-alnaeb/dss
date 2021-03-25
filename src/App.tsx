import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignInPage from "./Pages/SignInPage/SignInPage";
import "./Fonts.css";
import SidebarItem from "./Components/SidebarItem";
import BookingView from "./Pages/BookingView/BookingView";
import AccountView from "./Pages/AccountView/AccountView";
import { useSelector } from "./index";
import { useHistory } from "react-router-dom";

function App() {
  const state = useSelector((state) => state.userData);
  const history = useHistory();
  useEffect(() => {}, [state.loggedIn]);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SignInPage></SignInPage>
        </Route>
        <Route path="/booking-view">
          <BookingView></BookingView>
        </Route>
        <Route path="/account-view">
          <AccountView></AccountView>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
