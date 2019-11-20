import React from 'react';
import {Link} from 'react-router-dom';

export default function Menu() {
  return (
    <nav id='menu'>
      <Link to='/' className='iconfont icon-home'>
        首页
      </Link>
      <Link to='/course' className='iconfont icon-kechenghuaxiang'>
        课程安排
      </Link>
      <Link to='/lecturer' className='iconfont icon-jiangshi'>
        讲师团队
      </Link>
    </nav>
  )
}