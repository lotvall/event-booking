import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import AuthComponent from './pages/Auth'
import EventsComponent from './pages/Events'
import BookingsComponent from './pages/Bookings'
import NavBar from './components/NavBar'

class App extends Component {
  
  render() {
    return (
        <BrowserRouter>
          <>
            <NavBar></NavBar>
            <main style={ { margin: '4rem 2.5rem' } }>
            <Switch>
              <Redirect from="/" to="/auth" exact/>
              <Route path ="/auth" component={AuthComponent} />
              <Route path ="/events" component={EventsComponent} />
              <Route path ="/bookings" component={BookingsComponent} />
            </Switch>
            </main>
          </>
        </BrowserRouter>
    );
  }
}


export default App;
