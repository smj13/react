import React,{Component} from 'react';
import axios from 'axios';
import qs from 'qs';

export default class LoginForm extends Component {
  constructor(arg){
    super(arg);
    this.state = {
      verify: '',
      username: 'smj123',
      password: 'smj123',
      verifyImg: '/koocv/user/verify?' + Date.now(),
      verifyShow: false
    }
  }
  changeValue = (e,attr) => {
    let obj = {
      [attr]: e.target.value
    }
    this.setState(obj)
  }
  changeVerify = () => {
    this.setState({
      verifyImg: '/koocv/user/verify?' + Date.now()
    })
  }
  postLogin= () => {
    let {verify,username,password} = this.state;
    axios.post(
      '/koocv/user/login',
      qs.stringify({
        verify,
        username,
        password
      }),{
        withCredentials: true
      }
    ).then((res)=>{
      if(res.data.code === 0){
        alert('登录成功');
        // console.log(window.history);
        if(window.history.length > 1){
          window.history.back();
        } else {
          window.location.href = '/';
        }
      } else {
        alert(res.data.msg);
      }
      this.changeVerify();
    }).catch((error)=>{
      alert('网络故障，请稍后再试');
      this.changeVerify();
    })
  }
  render(){
    let {verify, username, password, verifyImg, verifyShow} = this.state;
    return (
      <div className='login-inner login-form'>
        <div className='login-ico iconfont icon-denglu'></div>
        <p className='login-info'>如有账号，请直接登录</p>
        <div className='input-txt'>
          <input
            type="text" 
            placeholder='用户名' 
            value={username}
            onChange={e=>{
              this.changeValue(e,'username')
            }}
          />
          <span className='input-txt-ico iconfont icon-yonghuming
'></span>
        </div>
        <div className='input-txt'>
          <input 
            type="password" 
            placeholder='密码'
            value={password}
            onChange={e=>{
              this.changeValue(e,'password')
            }}
          />
          <span className='input-txt-ico iconfont icon-mima'></span>
        </div>
        <div className='input-verify'>
          <div className='input-txt'>
            <input 
              type="text" 
              placeholder='验证码'
              value={verify}
              onChange={e=>{
                this.changeValue(e,'verify')
              }}
              onFocus={()=>{
                this.setState({
                  verifyShow: true
                })
              }}
            />
            <span className='input-txt-ico iconfont icon-yanzhengma'></span>
          </div>
          {
            verifyShow?  
            <img 
              className='input-verify-img' 
              src={verifyImg} 
              onTouchEnd={()=>{
                this.setState({
                  verifyImg: 'https://www.koocv.com/user/verify?' + Date.now()
                })
              }}
            />: ''
          }
          
        </div>
        <a 
          className='miaov-btn miaov-btn-md input-btn'
          onTouchEnd={this.postLogin}
        >登录</a>
        <p className='login-info'>
          没有账号？
          <a 
            href="javascript:;" 
            className='to-register' 
            onTouchEnd={()=>{
              this.props.changeDeg(-180)
            }}
          >立即注册</a>
        </p>
      </div>
    );
  }
}