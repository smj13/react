import React,{Component} from 'react';
import Header from '../../common/component/header';
import '../../common/css/login.css';
import LoginForm from './login';
import RegisterForm from './register';


export default class Login extends Component{
  constructor(arg){
    super(arg);
    this.state = {
      deg: 0
    }
  }
  changeDeg = (deg) => {
    this.setState({
      deg
    })
  }
  componentDidMount() {
    let { page } = this.refs;
    page.style.height = window.innerHeight + 'px';
    
  }
  render(){
    let {deg} = this.state;
    return (
      <div>
        <Header back={true} />
        <div className='page loginPage' ref='page'>
          <h2 className='loginTitle'>
            <img src={require('../../common/img/loginTitle.png')} />
          </h2>
          <div className='loginWrap'>
            <div className='login3d' style={{
              transform: `rotateY(${deg}deg)`
            }}>
              <LoginForm 
                changeDeg={this.changeDeg}
              />
              <RegisterForm 
                changeDeg={this.changeDeg}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

}