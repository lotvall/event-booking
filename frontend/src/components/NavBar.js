import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';


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
    background: '#1F1300',
    padding: '0 1rem',
    display: 'flex',
  },
  appTitle:{
    color: '#FFC15E'
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
        color: '#FFC15E',
        '&:hover': {
            color: '#CC5803'
        },
        '&.active': {
            color: '#CC5803'
        },
    }
}

function SimpleAppBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.appTitle}>
            Event Booking
          </Typography>
          <nav className={classes.navigationItems}>
            <ul className={classes.ul}>
                <li className={classes.li}>
                <NavLink to="/auth" className={classes.link}>Authenticate</NavLink>
                </li>
                <li className={classes.li}>
                <NavLink to="/events" className={classes.link}>Events</NavLink>
                </li>
                <li className={classes.li}>
                <NavLink to="/bookings" className={classes.link}>Bookings</NavLink>
                </li>
            </ul>
        </nav>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);