import React, { Component } from 'react';
import BScroll from 'better-scroll';
import axios from 'axios';
import qs from 'qs';

export default class PageScroll extends Component {
  state = {
    page: 1,
    data: [],
    loading: false,
    loadEnd: false,
    loadNub: 200
  }
  getData = () => {
    let { api, postData, rows } = this.props;
    let { page, loading } = this.state;
    if (loading) {
      return;
    }
    this.setState({
      loading: true
    })
    axios.post(
      `/koocv/lecturer/${api}?page=${page}&rows=${rows}`,
      qs.stringify(postData)
    ).then((res) => {
      if (res.data.length) {
        let { data } = this.state;
        data = data.concat(res.data);
        page++;
        this.setState({
          data,
          loading: false,
          page
        })
        window.scroll.finishPullUp();
      } else {
        this.setState({
          loadEnd: true
        })
        window.scroll.closePullUp();
      }
    })
  }
  scroll = () => {
    let y = window.scrollY;
    let winH = document.documentElement.clientHeight;// 可视区高度
    let pageH = document.documentElement.scrollHeight;// 页面高度
    let maxY = pageH - winH;
    if (maxY - y < this.state.loadNub) {
      this.getData();
    }
  }
  componentDidMount() {
    let wrap = this.refs.wrap;
    let a = wrap.querySelectorAll('a');
    let works = wrap.querySelector('.works');
    a.forEach((item) => {
      item.addEventListener('touchstart', function (e) {
        this.point = {
          x: e.changedTouches[0].pageX,
          y: e.changedTouches[0].pageY
        }
        this.classList.add('a-active');
      })
      item.addEventListener('touchend', function (e) {
        let newPoint = {
          x: e.changedTouches[0].pageX,
          y: e.changedTouches[0].pageY
        }
        this.classList.remove('a-active');
        if (this.href && (Math.abs(newPoint.x - this.point.x) + Math.abs(newPoint.y - this.point.y)) < 5) {
          window.location.href = this.href;
        }
      })
    })
    if (this.props.render) {
      window.scroll = new BScroll(wrap, {
        bounce: false,
        pullUpLoad: {
          threshold: 10
        }
      });
      this.getData();
      window.scroll.on('pullingUp', () => {
        this.getData();
      })
    } else {
      window.scroll = new BScroll(wrap, {
        bounce: false
      });
    }
    if (works) {
      works.addEventListener('touchstart', function (e) {
        this.point = {
          x: e.changedTouches[0].pageX,
          y: e.changedTouches[0].pageY
        };
        if(e.target.tagName === 'IMG' ||e.target.tagName === 'H4' || e.target.tagName === 'SPAN'){
          let a = e.target.parentNode;
          a.classList.add('a-active');
        }
      })
      works.addEventListener('touchend', function (e) {
        let newPoint = {
          x: e.changedTouches[0].pageX,
          y: e.changedTouches[0].pageY
        }
        // if ((Math.abs(newPoint.x - this.point.x) + Math.abs(newPoint.y - this.point.y)) > 5) {
        //   return;
        // }
        if (e.target.tagName === 'IMG' ||e.target.tagName === 'H4' || e.target.tagName === 'SPAN') {
          let a = e.target.parentNode;
          a.classList.remove('a-active');
          if((Math.abs(newPoint.x - this.point.x) + Math.abs(newPoint.y - this.point.y)) < 5){
            if (a.href) {
              window.location.href = a.href;
            }
          }
          
        }
      })
    }
  }
  componentWillUnmount() {
    window.scroll = null;
  }
  render() {
    let { children, render } = this.props;
    let List = render;
    let { data, loading, loadEnd } = this.state;
    return (
      <div className='wrap' ref='wrap'>
        <div className='scroll-con'>
          {children}
          {List ? <List
            data={data}
            loading={loading}
            loadEnd={loadEnd}
          /> : ''}
        </div>

      </div>
    )
  }
}
