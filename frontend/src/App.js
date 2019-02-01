import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import AuthComponent from './pages/Auth'
import EventsComponent from './pages/Events'
import BookingsComponent from './pages/Bookings'
import NavBar from './components/NavBar'
import AuthContext from './context/AuthContext'

// import ApolloClient from 'apollo-client';
// import { ApolloProvider } from 'react-apollo'
// import { HttpLink } from 'apollo-link-http';
// import { InMemoryCache } from "apollo-cache-inmemory";



// const client = new ApolloClient({
//   link: new HttpLink({ uri: 'https://localhost:8000/graphql' }),
//   cache: new InMemoryCache()
// })

class App extends Component {

  state = {
    token: null,
    userId: null,
  }
  login = (token, userId, tokenExpiration) => {
    this.setState({
      token,
      userId
    })
  }
  logout = ( ) => {
    this.setState({
      token: null,
      userId: null,
    })
  }
  
  render() {
    return (
      // <ApolloProvider client={client}>
        <BrowserRouter>
          <>
            <AuthContext.Provider value={{token: this.state.token, userId: this.state.userId, login: this.login, logout: this.logout}}>
            <NavBar></NavBar>
            <main style={ { margin: '5rem 2.5rem' } }>
            <Switch>
              {!this.state.token && <Redirect from="/" to="/auth" exact/>}
              {!this.state.token && <Redirect from="/bookings" to="/auth" exact/>}
              {this.state.token && <Redirect from="/" to="/events" exact/>}
              {this.state.token && <Redirect from="/auth" to="/events" exact/>}


              {!this.state.token &&<Route path ="/auth" component={AuthComponent} />}
              <Route path ="/events" component={EventsComponent} />
              {this.state.token && <Route path ="/bookings" component={BookingsComponent} />}
            </Switch>
            </main>
            </AuthContext.Provider>
          </>
        </BrowserRouter>
      // </ApolloProvider>
    );
  }
}


export default App;
