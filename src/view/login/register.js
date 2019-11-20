import React,{Component} from 'react';
import axios from 'axios';
import qs from 'qs';

export default class RegisterForm extends Component {
  constructor(arg){
    super(arg);
    this.state = {
      verify: '',
      username: '',
      password: '',
      repassword: '',
      verifyImg: 'https://www.koocv.com/user/verify?' + Date.now(),
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
  postRegister = () => {
    let {verify, username, password, repassword} = this.state;
    if(!verify
      ||!username
      ||!password
      ||!repassword
    ){
      alert('请输入完整内容')
      return;
    }
    if(password !== repassword){
      alert('两次密码不一致');
      return;
    }
    if(password.length < 6 || password > 16){
      alert('请输入6-16位的密码')
    }
    axios.post(
      '/koocv/user/register',
      qs.stringify({
        verify,
        username,
        password,
        repassword
      }),
      {
        withCredentials: true
      }
    ).then((res)=>{
      if(res.data.code === 0){
        alert('注册成功');
        this.props.changeDeg(0);
      }else{
        alert(res.data.msg);
      }
      this.changeVerify();
    }).catch((error)=>{
      this.changeVerify();
      alert('网络连接失败，请稍后再试');
    })
  }
  render(){
    let {verify, username, password, repassword, verifyImg, verifyShow} = this.state;
    return (
      <div className='login-inner register-form'>
        <p className='register-info'>注册账号</p>
        <div className='input-txt'>
          <input 
            type="text" 
            placeholder='用户名'
            value={username}
            onChange={e=>{
              this.changeValue(e,'username')
            }}
          />
          <span className='input-txt-ico iconfont icon-yonghuming'></span>
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
        <div className='input-txt'>
          <input 
            type="password" 
            placeholder='确认密码'
            value={repassword}
            onChange={e=>{
              this.changeValue(e,'repassword')
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
              onTouchEnd={this.changeVerify}
            />: ''
          }
        </div>
        <a 
          className='miaov-btn miaov-btn-md input-btn'
          onTouchEnd={this.postRegister}
        >马上注册</a>
        <p className='login-info'>
          已有账号？
          <a 
            href="javascript:;" 
            className='to-login' 
            onTouchEnd={()=>{
              this.props.changeDeg(0)
            }}
          >立即登录</a>
        </p>
      </div>
    );
  }
}