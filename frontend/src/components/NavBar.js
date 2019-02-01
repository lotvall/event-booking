import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';

import AuthContext from '../context/AuthContext'


const styles = {
  root: {
    flexGrow: 1,
  },
  toolbar: {
    alignItems: 'center',
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100%',
    height: '3.5rem',
    background: '#5101d1',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
  },
  appTitle:{
    color: 'white'
  },
  ul: {  
    display: 'flex',
    listStyle: 'none',
    padding: 0,
    margin: 0
    },
    navigationItems: {
        marginLeft: '1.5rem'
    },
    li: {
        margin: '0 1rem'
    },
    link: {
        textDecoration: 'none',
        color: 'white',
        padding: '0.25rem 0.5rem',
        '&:hover': {
            color: '#5101d1',
            background: '#ffffff',
            borderRadius: 5,
        },
        '&.active': {
            color: '#5101d1',
            background: '#ffffff',
            borderRadius: 5,
        },
    }
}

function SimpleAppBar(props) {
  const { classes } = props;

  return (
    <AuthContext.Consumer>
    {(context) => {
      return (
        <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.appTitle}>
            Event Booking
          </Typography>
          <nav className={classes.navigationItems}>
            <ul className={classes.ul}>
                {!context.token && <li className={classes.li}>
                <NavLink to="/auth" className={classes.link}>Authenticate</NavLink>
                </li>}
                <li className={classes.li}>
                <NavLink to="/events" className={classes.link}>Events</NavLink>
                </li>
                {context.token && <li className={classes.li}>
                <NavLink to="/bookings" className={classes.link}>Bookings</NavLink>
                </li>}
                {context.token && <button>Logout</button> }
            </ul>
        </nav>
        </Toolbar>
      </AppBar>
    </div>
      )
    }}
    
    </AuthContext.Consumer>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);