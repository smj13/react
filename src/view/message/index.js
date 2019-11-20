import React,{Component} from 'react';
import Header from '../../common/component/header';
import '../../common/css/message.css';
import axios from 'axios';
import qs from 'qs';

export default class Message extends Component{
  state = {
    content: '',
    article_id: this.props.match.params.id
  }
  postMessage = () => {
    let {content,article_id} = this.state;
    if(!content.trim()){
      alert('请输入评论内容~~');
      return;
    }
    axios.post(
      "/koocv/lecturer/addcomment",
      qs.stringify({
        content,
        article_id
      }),{
        withCredentials: true
      }
    ).then((res)=>{
      if(res.data.code===0){
        alert('评论成功~');
        window.history.back();
      }
    })
  }

  render(){
    let {content} = this.state;
    return (
      <div>
        <Header back={true} />
        <div className='page'>
          <div className='scroll-con'>
            <textarea 
              className='message' 
              value = {content}
              onChange = {(e)=>{
                this.setState({
                  content: e.target.value
                })
              }}
            ></textarea>
            <a 
              className='miaov-btn miaov-btn-md message-btn'
              onTouchEnd={this.postMessage}
            >
              提交留言
            </a>
          </div>
        </div>
      </div>
    );
  }

}