import React, { Component } from 'react';
export default class Tab extends Component {
  getNav = () => {
    let { data } = this.props;
    if (data.length > 1) {
      return (
        <nav className='picNav'>
          {data.map((item, index) => {
            return (
              <span
                key={index}
                className={index === 0 ? 'active' : ''}
              />
            );
          })}
        </nav>
      );
    }
    return '';
  }
  componentDidMount(){
    if(this.props.data.length > 1){
      this.tabMove();
    }
  }
  tabMove = () => {
    let {tab} = this.refs;
    let picList = tab.querySelector('.picList');
    let picNav = tab.querySelector('.picNav');
    let picNavs = picNav.querySelectorAll('span');
    let now = 0; //当前显示第几张
    let x = 0;
    let startPoint = {};
    let startX = 0;
    let isMove = false; // 判断滑屏方向
    let isFirst = true;
    let timer = 0;
    // picList.innerHTML += picList.innerHTML;  // 复制一组元素
    picList.style.width = picList.children.length + '00vw';
    tab.addEventListener('touchstart',function(e){
      clearInterval(timer);
      picList.style.transition = 'none';
      startPoint = {
        x: e.changedTouches[0].pageX,
        y: e.changedTouches[0].pageY
      }
      // 处理无缝 第0张和最后一张有划出边界的风险
      if(now === 0){
        now = picNavs.length;
      }
      if(now === picNavs.length * 2 - 1){
        now = picNavs.length - 1;
      }
      isMove = false;
      isFirst = true;
      x = -now * tab.clientWidth;
      picList.style.WebkitTransform = picList.style.transform = `translate3d(${x}px,0,0)`;
      startX = x;
    });
    tab.addEventListener('touchmove',function(e){
      let nowPoint = {
        x: e.changedTouches[0].pageX,
        y: e.changedTouches[0].pageY
      };
      let dis = {
        x: nowPoint.x - startPoint.x,
        y: nowPoint.y - startPoint.y,
      };
      if(isFirst 
         && Math.abs(dis.x - dis.y) > 3){
        if(Math.abs(dis.x) > Math.abs(dis.y)){
          isMove = true;
        }
        isFirst = false;
      }
      if(isMove){
        x = startX + dis.x;
        picList.style.WebkitTransform = picList.style.transform = `translate3d(${x}px,0,0)`;
        e.preventDefault();
      }
      
    });
    tab.addEventListener('touchend',function(e){
      if(isMove){
        let nowPoint = e.changedTouches[0].pageX;
        let dis = nowPoint - startPoint.x;
        if(Math.abs(dis) > 100){
          now -= dis/Math.abs(dis)
        }
        // console.log(now);
        x = -now * tab.clientWidth;
        picList.style.transition = '.3s';
        picList.style.WebkitTransform = picList.style.transform = `translate3d(${x}px,0,0)`;
        setNav();
      }
      autoPlay();
    });
    function setNav() {
      picNavs.forEach((nav)=>{
        nav.classList.remove('active');
      });
      picNavs[now%picNavs.length].classList.add('active');
    }
    function toNext(){
      if(now === picNavs.length * 2 - 1){
        now = picNavs.length - 1;
        x = -now * tab.clientWidth;
      picList.style.transition = 'none';
      picList.style.WebkitTransform = picList.style.transform = `translate3d(${x}px,0,0)`;
      }
      setTimeout(function(){
        now ++;
        x = -now * tab.clientWidth;
        picList.style.transition = '.3s';
        picList.style.WebkitTransform = picList.style.transform = `translate3d(${x}px,0,0)`;
        setNav();
      });
    }
    autoPlay();
    function autoPlay(){
      timer = setInterval(toNext, 3000);
    }
  }
  render() {
    let { data, className, renderItem } = this.props;
    let data2 = data.concat(data.filter(()=>true));
    return (
      <div className={'tab ' + className} ref='tab'>
        <ul className='picList'>
          {data2.map((item, index) => {
            return (
              <li key={index}>
                {renderItem(item)}
              </li>
            );
          })}
        </ul>
        {this.getNav()}
      </div>
    );
  }
}