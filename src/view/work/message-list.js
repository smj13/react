import React,{Component} from 'react';

export default class MassageList extends Component {
  render(){
    let {data,loadEnd,loading} = this.props;
    return (
      <div className='message-list'>
        {
          data.length > 0 ? (
            <div>
              {
                data.map((item,index)=>{
                  return (
                    <aside key = {index}>
                      <div className='message-info'>
                        <span>{item.username}</span>
                        回复:
                      </div>
                      <div className='message-con'>{item.content}</div>
                    </aside>
                  )
                })
              }
              {
                loading ? 
                (<footer className={'loadMore ' + (loadEnd ? '':'longing')}>
                  <span>{loadEnd? '我是有底线的': '拼命加载中'}</span>
                </footer>) : ''
              }
              
            </div>
          ) : <p className='work-no-info'>抢个沙发吧！</p>
        }
      </div>
    );
  }
}