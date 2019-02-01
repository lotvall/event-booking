import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '../components/Modal'
import Backdrop from '../components/Backdrop';

const styles= {
  events: {
    textAlign:'center',
    border:'1px solid #5101d1',
    padding: '2rem',
    margin: '2rem auto',
    marginTop: '6rem',
    width:'30rem',
    maxWidth:'80%',
  },
  button: {
    background: '#5101d1',
    font: 'inherit',
    color: 'white',
    border: '1px solid #5101d1',
    borderRadius: 3,
    padding: '0.5rem 1rem',
    boxShadow:'1px 1px 5px rgba(0, 0, 0, 0.26)',
    cursor: 'pointer',
    '&:hover': {
      color: '#6219d6'
    },
    '&.active': {
      color: '#6219d6'
    },
  }
}
class EventsComponent extends Component { 
  state = {
    creating:false,
  }
  openCreateEvent = () => {
    this.setState({
      creating:true,
    })
  }
  cancelCreateEvent = () => {
    this.setState({
      creating:false,
    })
  }
  submitCreateEvent = () => {
    this.setState({
      creating:false,
    })
  }
  render() {
    const { classes } = this.props;
    return (
      <>
        {this.state.creating && <Backdrop />}
        {this.state.creating && (
          <Modal title="Add Event" canCancel canCreate onCancel={this.cancelCreateEvent} onSubmit={this.submitCreateEvent}>
            <p>The modal</p>
          </Modal>
        )}
      <div className={classes.events}>
        <button className={classes.button} onClick={this.openCreateEvent}>Create Event</button>
      </div>

      </>
    )
  }
}

export default withStyles(styles)(EventsComponent)
