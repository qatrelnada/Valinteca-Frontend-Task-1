import { Fragment, Component } from 'react'
import img from '../Image-Placeholders/Image Placeholder1.png';
import '../WelcomeScreen.css'
import { Link } from "react-router-dom";

class WelcomeScreen extends Component {
  state = {  } 
  render() { 
    return (
      <Fragment>
        <div className='img'><img src={img} alt='' /></div>

        <section className='head-subhead-btn'>
          <section className='head-subhead-wlc-scr'>
            <h1 className='head-wlc-scr'>Welcome</h1>
            <h2 className='subhead-wlc-scr'>We’re glad you’re here! Sign up to start browsing the website.</h2>
          </section>

          <button className='btn'>
            <Link to='/signup' className='link'>
              Get Started
            </Link>
          </button>
        </section>
      </Fragment>
    );
  }
}
 
export default WelcomeScreen;