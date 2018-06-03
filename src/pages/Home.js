import React, { Component } from "react";
import {Link} from "react-router-dom"
import "./Home.less";

class Home extends Component {
  render() {
    return (
      <div className="home">
        <h1 className="songs_title">推荐歌单</h1>
        <a className="songs_playing">正在播放</a>
        <ul className="songs_control songs_control_history">
          <li><Link to="/detail">顺序播放</Link></li>
          <li><Link to="/detail">随机播放</Link></li>
          <li><Link to="/detail">历史播放</Link></li>
        </ul>
        <ul className="songs_list">
          <li><Link to="/detail">
            <span>01</span>
            <h4>我爱歌曲</h4>
            <small>歌手 - 专辑</small>
          </Link></li>
          <li><Link to="/detail">
            <span>02</span>
            <h4>我爱歌曲</h4>
            <small>歌手 - 专辑</small>
          </Link></li>
          <li><Link to="/detail">
            <span>03</span>
            <h4>我爱歌曲</h4>
            <small>歌手 - 专辑</small>
          </Link></li>
          <li><Link to="/detail">
            <span>04</span>
            <h4>我爱歌曲</h4>
            <small>歌手 - 专辑</small>
          </Link></li>
        </ul>
        <a href="https://github.com/iflycn/music_react" className="copyright">Gito Player @ Github.com</a>
      </div>
    );
  }
}

export default Home;
