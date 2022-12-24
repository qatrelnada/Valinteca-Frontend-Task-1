import { Fragment, Component } from 'react';
import img from '../Image-Placeholders/Image Placeholder2.png'
import '../SignUp.css'
import Form from './Form';

class SignUp extends Component {
  state = {  }
  
  render() { 
    return (
      <Fragment>
        <div className='img'><img src={img} alt='' /></div>

          <section className='head-subhead-form'>
            <section className='head-subhead-sign-up'>
                <h1 className='head-sign-up'>Create Account</h1>
                <h2 className='subhead-sign-up'>Go ahead and sign up, let everyone know how awesome you are!</h2>
            </section>
            
            <Form />
          </section>
      </Fragment>
    );
  }
}
 
export default SignUp;