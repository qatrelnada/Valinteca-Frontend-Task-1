import { Fragment, Component } from 'react'
import img from '../Image-Placeholders/Image Placeholder3.png'
import '../Succeed.css'

class Succeed extends Component {
     
    render() { 
      const email = localStorage.getItem('email')

        return (
        <Fragment>
            <div className='img'><img src={img} alt='' /></div>
            <div className='head-subhead-succeed'>
              <div className='empty'></div>
              <h1 className='head-succeed'>Successfully logged in</h1>
              <h2 className='subhead-succeed'>{email}</h2>
            </div>
            
        </Fragment>
        );
    }
}
 
export default Succeed;