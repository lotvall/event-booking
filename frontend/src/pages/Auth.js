import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  authform: {
    width: '40rem',
    maxWidth: '80%',
    margin: '5rem auto',

  },
  formcontrol: {
    marginBottom: '1rem'
  },
  label: {
    width: '100%',
    marginBottom: '0.5rem',
    display: 'block'
  },
  input: {
    width: '100%',
    display: 'block'
  },
  button: {
    background: '#1F1300',
    font: 'inherit',
    color: '#FFC15E',
    border: '1px solid #1F1300',
    borderRadius: 3,
    padding: '0.5rem 1rem',
    marginRight: '1rem',
    boxShadow:'1px 1px 5px rgba(0, 0, 0, 0.26)',
    cursor: 'pointer',
    '&:hover': {
      color: '#CC5803'
    },
    '&.active': {
      color: '#CC5803'
    },


  }
}

class AuthComponent extends Component {

  state= {
    isLoginMode: false
  }
  constructor(props) {
    super(props)
    this.emailEl = React.createRef()
    this.passwordEl = React.createRef()
  }
  handleModeSwitch = () => {
    this.setState(prevState => ({
      isLoginMode: !prevState.isLoginMode
    }))
  }
  handleSubmit = (event) => {
    event.preventDefault()

    this.state.isLoginMode ? this.handleLoginUser(event) : this.handleCreateUser(event)

  }
  handleLoginUser = async (event) => {
    console.log('handle login user was called', event)
    const email = this.emailEl.current.value
    const password = this.passwordEl.current.value

    if(email.trim().length===0 || password.trim().length===0) {
      return
    }

    const request = {
      query: ` 
        query {
          login(email:"${email}", password:"${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    }
    try {
      const res = await fetch('http://localhost:8000/graphql', {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json' 
        }
      })
      if(res.status !== 200 && res.status !== 201) {
        throw new Error ('Failed')
      }
      const data = await res.json()
      console.log(data)
    } catch(err) {
      console.log(err)
      throw err
    }
  

  }
  handleCreateUser = async (event) => {
    console.log('handle create user was called')
    const email = this.emailEl.current.value
    const password = this.passwordEl.current.value

    if(email.trim().length===0 || password.trim().length===0) {
      return
    }
    const request = {
      query: ` 
        mutation {
          createUser(userInput: {email:"${email}", password:"${password}"}) {
            _id
            email
          }
        }
      `
    }
    try {
      const res = await fetch('http://localhost:8000/graphql', {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json' 
        }
      })
      if(res.status !== 200 && res.status !== 201) {
        throw new Error ('Failed')
      }
      const data = await res.json()
      console.log(data)
    } catch(err) {
      console.log(err)
      throw err
    }
  } 

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.authform} onSubmit={this.handleSubmit}>
        <div className={classes.formcontrol}> 
          <label className={classes.label} htmlFor="email">E-Mail</label>
          <input className={classes.input} type="email" id="email" ref={this.emailEl}/>
        </div>
        <div className={classes.formcontrol}> 
          <label className={classes.label} htmlFor="password">Password</label>
          <input className={classes.input} type="password" id="password" ref={this.passwordEl}/>
        </div>
        <div className={classes.formaction}>
          <button className={classes.button} type="submit">{this.state.isLoginMode ? "Login" : "Sign Up"}</button>  
          <button className={classes.button} type="button" onClick={this.handleModeSwitch}>{this.state.isLoginMode ? "Switch to Sign Up": "Switch to Login"}</button>
        </div>
      </form>
    )
  }
}

export default withStyles(styles)(AuthComponent)