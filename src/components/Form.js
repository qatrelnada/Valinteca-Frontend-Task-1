import { Component } from "react";
import '../Form.css';
import { Navigate } from "react-router-dom";

// Icons
import user from '../icons/User.png'
import email from '../icons/EnvelopeSimple.png'
import password from '../icons/LockKey.png'
import divider from '../icons/Divider.png'

class Form extends Component {
  state = { 
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    formErrors: {usernameLength: '', usernameChars: '', usernameNums: '', email: '', password: '', confirmPassword: ''},
    usernameValid: false,
    emailValid: false,
    passwordValid: false,
    confirmPasswordValid: false,
    formValid: false,
    redirect: false
  } 
  
  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, 
      () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let formErrors = this.state.formErrors;
    let usernameValid = this.state.usernameValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let confirmPasswordValid = this.state.confirmPasswordValid;
  
    switch(fieldName) {
      case 'username':
        const usernameLengthValid = value.length >= 5 && value.length <= 15;
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        const containsSpecialChars = specialChars.test(value);
        const numRegex = /\d/;
        const lastCharIndex = value.length-1;
        const containsNums = numRegex.test(value[0]) || numRegex.test(value[lastCharIndex]); 
        usernameValid = usernameLengthValid && !containsSpecialChars;
        formErrors.usernameLength = usernameLengthValid ? '' : 'Username must consist of 5 to 15 characters.';
        formErrors.usernameChars = !containsSpecialChars ? '' : ' Only letters and numbers are allowed.';
        formErrors.usernameNums = !containsNums ? '' : ' No numbers at the beginning or at the end.';
        break;
      case 'email':
        const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
        emailValid = emailRegex.test(value);
        if (emailValid) {
          formErrors.email = '';
          localStorage.setItem('email', value)
        }
        else {
          formErrors.email = 'Invalid e-mail address.';
        }
        break;
      case 'password':
        passwordValid = value.length >= 8;
        formErrors.password = passwordValid ? '': 'Password must be at least 8 characters.';
        break;
      case 'confirmPassword':
        confirmPasswordValid = value === this.state.password;
        formErrors.confirmPassword = confirmPasswordValid ? '' : 'Password doesn\'t match.';
        break;
      default:
        break;
    }

    this.setState({formErrors,
      usernameValid,
      emailValid,
      passwordValid,
      confirmPasswordValid,
    }, this.validateForm);
  }
  
  validateForm() {
    this.setState({formValid: this.state.usernameValid && this.state.emailValid && this.state.passwordValid});
  }

  handleSubmit (e) {
    e.preventDefault();

    const data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };

    console.log(data);

    fetch('https://goldblv.com/api/hiring/tasks/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .then(this.setState({ redirect: true }))
    .catch((err) => {
      console.error(err);
    });
  }

  render() { 
    const { redirect } = this.state;

    return (
      redirect ? <Navigate to="/succeed" /> : 
        <form onSubmit={(event) => this.handleSubmit(event)}>
            <section className='form-items'>
              <div>
                <div className='form-item'>
                  <div className='icon'>
                    <img src={user} alt='user-logo' />
                    <img src={divider} alt='divider' />
                  </div>
                  <input  
                    name='username' 
                    placeholder='Username' 
                    value={this.state.username} 
                    className='form-input'
                    onChange={(event) => this.handleUserInput(event)} />
                </div>
                
                {Object.keys(this.state.formErrors).map((keyName) => {
                  if(this.state.formErrors[keyName].length > 0 && ['usernameLength', 'usernameChars', 'usernameNums'].includes(keyName)) {
                    return <span id='username-err' key={keyName} style={{color: 'red', fontSize: 'small', fontWeight: 'bold'}}>
                      {this.state.formErrors[keyName]}
                  </span>
                  } else {
                    return '';
                  }
                })}
              </div>

              <div>
                <div className='form-item'>
                  <div className='icon'>
                    <img src={email} alt='email-logo' />
                    <img src={divider} alt='divider' />
                  </div>
                  <input 
                    type='email' 
                    name='email' 
                    placeholder='Email' 
                    value={this.state.email} 
                    className='form-input' 
                    onChange={(event) => this.handleUserInput(event)} />
                </div>

                {Object.keys(this.state.formErrors).map((keyName) => {
                  if(this.state.formErrors[keyName].length > 0 && keyName === 'email'){
                    return <span id='email-err' key={keyName} style={{color: 'red', fontSize: 'small', fontWeight: 'bold'}}>
                      {this.state.formErrors[keyName]}
                  </span>
                  } else {
                    return '';
                  }
                })}
              </div>

              <div>
                <div className='form-item'>
                  <div className='icon'>
                    <img src={password} alt='password-logo' />
                    <img src={divider} alt='divider' />
                  </div>
                  <input 
                    type='password' 
                    name='password'
                    placeholder='Password' 
                    value={this.state.password} 
                    className='form-input' 
                    onChange={(event) => this.handleUserInput(event)} />
                </div>

                {Object.keys(this.state.formErrors).map((keyName) => {
                  if(this.state.formErrors[keyName].length > 0 && keyName === 'password'){
                    return <span id='pass-err' key={keyName} style={{color: 'red', fontSize: 'small', fontWeight: 'bold'}}>
                      {this.state.formErrors[keyName]}
                  </span>
                  } else {
                    return '';
                  }
                })}
              </div>

              <div>
                <div className='form-item'>
                  <div className='icon'>
                    <img src={password} alt='password-logo' />
                    <img src={divider} alt='divider' />
                  </div>
                  <input 
                    type='password' 
                    name='confirmPassword'
                    placeholder='Confirm password' 
                    value={this.state.confirmPassword} 
                    className='form-input' 
                    onChange={(event) => this.handleUserInput(event)} />
                </div>

                {Object.keys(this.state.formErrors).map((keyName) => {
                  if(this.state.formErrors[keyName].length > 0 && keyName === 'confirmPassword'){
                    return <span id='confirm-pass-err' key={keyName} style={{color: 'red', fontSize: 'small', fontWeight: 'bold'}}>
                      {this.state.formErrors[keyName]}
                  </span>
                  } else {
                    return '';
                  }
                })}
              </div>
            </section>

            <input type='submit' 
              className='btn'
              disabled={!this.state.formValid} 
              value='Create Account'/>
        </form>
    );
  }
}
 
export default Form;