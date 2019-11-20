import React, { Component } from 'react';
import MenuPage from '../../common/component/menuPage';
import Tab from '../../common/component/tab';
import Course from './course';
import Vip from './vip';
import Miaov from './miaov';
import '../../common/css/home.css';
import WorkList from './workList';

let tabImg = [
  require('../../common/img/tab/img1.png'),
  require('../../common/img/tab/img2.png'),
  require('../../common/img/tab/img3.png'),
  require('../../common/img/tab/img4.png'),
];

export default class Home extends Component {

  render() {
    return (
      <MenuPage
        className=''
        render={WorkList}
        api='lists'
        postData={{
          order: 'desc',
          sort: 'id',
          category_id: 1,
          recommend: 1
        }}
        rows={6}
      >
        <Tab
          data={tabImg}
          className='banner'
          renderItem={
            (item) => {
              return (
                <img src={item} />
              )
            }
          }
        />
        <Course />
        <Vip />
        <Miaov />
      </MenuPage>
    );
  }

}