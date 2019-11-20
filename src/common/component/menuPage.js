import React, { Component } from 'react';
import Header from '../../common/component/header';
import Menu from '../../common/component/menu';
import PageScroll from './page-scroll';

export default class MenuPage extends Component {
  constructor(arg) {
    super(arg);
    this.state = {
      open: false
    }
  }
  changeOpen = () => {
    this.setState({
      open: !this.state.open
    })
  }
  componentDidMount() {
    let { view, page } = this.refs;
    let _this = this;
    page.style.height = window.innerHeight + 'px';
    // let menuA = [...(view.querySelectorAll('#menu a'))];
    // let headerA = [...(view.querySelectorAll('#header a'))];
    // let a = menuA.concat(headerA);
    // console.log(a)
    view.addEventListener('touchmove', (e) => {
      if (_this.state.open) {
        e.preventDefault();
      }
    });
    // a.forEach((item)=>{
    //   item.addEventListener('touchstart',function(e){
    //     this.point = {
    //       x: e.changedTouches[0].pageX,
    //       y: e.changedTouches[0].pageY,
    //     }
    //   })
    //   item.addEventListener('touchend',function(e){
    //     let nowPoint = {
    //       x: e.changedTouches[0].pageX,
    //       y: e.changedTouches[0].pageY,
    //     }
    //     if(this.href 
    //       && _this.state.open
    //       && (Math.abs(nowPoint.x - this.point.x) + Math.abs(nowPoint.y - this.point.y)) < 2){
    //       window.location.href = this.href;
    //     }
    //   })
    // })
  }
  render() {
    // console.log(this.props)
    let { className, children, render, api, postData, rows } = this.props;
    let { open } = this.state;
    return (
      <div
        ref='view'
        onTouchEnd={() => {
          if (open) {
            this.changeOpen();
          }
        }}
      >
        <Header
          login={true}
          menu={true}
          changeOpen={this.changeOpen}
        />
        <Menu />
        <div
          className={'page ' + className}
          style={{
            transition: open ? '.3s cubic-bezier(.2,.85,.23,1.27)' : '.2s',
            transform: open ? 'translate3d(4.5rem,0,0)' : 'translate3d(0,0,0)'
          }}
          ref = 'page'
        >
          <PageScroll
            render={render}
            api={api}
            postData={postData}
            rows={rows}
          >
            {children}
          </PageScroll>
        </div>
      </div>

    );
  }
}