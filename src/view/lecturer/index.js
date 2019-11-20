import React, { Component } from 'react';
import Footer from '../../common/component/footer';
import MenuPage from '../../common/component/menuPage';
import '../../common/css/lecturer.css';
import Tab from '../../common/component/tab';
import JoinUs from './join-us';
import Job from './job';
import Popup from './popup';
import axios from 'axios';
import qs from 'qs';

export default class Lecturer extends Component {
  state = {
    data: [],
    openPopup: false,
    popupData: {}
  }
  getData = () => {
    axios.post(
      '/koocv/lecturer/lists?page=1&rows=100',
      qs.stringify({
        order: 'desc',
        sort: 'id',
        category_id: 2
      })
    ).then((res) => {
      let data = [];
      for (let i = 0; i < res.data.length; i += 3) {
        let dataChild = [];
        for (let j = 0; j < 3; j++) {
          res.data[i + j] && dataChild.push(res.data[i + j])
        }
        data.push(dataChild);
      }
      this.setState({
        data
      })
    })
  }
  getPopupData=(id)=>{
    let popupDatas = [];
    let {data} = this.state;
    data.forEach((item)=>{
      popupDatas = popupDatas.concat(item);
    })
    let popupData = popupDatas.filter((item)=>{
      return item.id == id;
    });
    this.setState({
      openPopup: true,
      popupData: popupData[0]
    })
  }
  componentDidMount() {
    this.getData();
  }
  closePopup=()=>{
    this.setState({
      openPopup: false
    })
  }
  getTab = () => {
    return (
      <Tab
        className='lecturer-tab tab'
        data={this.state.data}
        renderItem={
          (item) => {
            return (
              <ul className='lecturer-list'>
                {item.map((item) => {
                  return (
                    <li 
                      key={item.id}
                      data-id={item.id}
                      onTouchStart={(e)=>{
                        e.currentTarget.point = {
                          x: e.changedTouches[0].pageX,
                          y: e.changedTouches[0].pageY
                        }
                      }}
                      onTouchEnd={(e)=>{
                        let newPoint = {
                          x: e.changedTouches[0].pageX,
                          y: e.changedTouches[0].pageY
                        }
                        if((Math.abs(newPoint.x - e.currentTarget.point.x) + Math.abs(newPoint.y - e.currentTarget.point.y)) < 5){
                          this.getPopupData(e.currentTarget.dataset.id);
                        }
                      }}
                    >
                      <a>
                        <div className='lecturer-thumbnail' style={
                          {
                            backgroundImage: `url(${item.icon})`
                          }
                        }></div>
                        <p className='lecturer-name'>{item.title}</p>
                      </a>
                    </li>
                  )
                })}
              </ul>
            )
          }
        }
      />
    )
  }
  render() {
    return (
      <div>
        <MenuPage className='lecturer-page'>
          <section className='lecturer-item'>
            <h2 className='lecturer-item-title'>
              <img src={require('../../common/img/lecturer-title.png')} />
            </h2>
            {this.state.data.length > 0 ? this.getTab() : ''}
          </section>
          <JoinUs />
          <Job />
          <Footer />
        </MenuPage>
        {this.state.openPopup? <Popup 
          data={this.state.popupData} 
          close={this.closePopup}
        />: ''}
      </div>
    );
  }

}