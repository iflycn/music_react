import React, { Component } from "react";
import {Link} from "react-router-dom"
import "./Home.less";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0,
      history: null,
      slist: [{
        id: 65766,
        name: "富士山下",
        artist: "陈奕迅",
        album: "What'S Going On...? "
      },
      {
        id: 67570,
        name: "不装饰你的梦",
        artist: "蔡国权",
        album: "蔡国权同名专辑"
      },
      {
        id: 93053,
        name: "男人KTV",
        artist: "胡彦斌",
        album: "男人歌"
      },
      {
        id: 153815,
        name: "讲不出再见",
        artist: "谭咏麟",
        album: "梦幻的笑容"
      },
      {
        id: 188798,
        name: "她来听我的演唱会",
        artist: "张学友",
        album: "走过1999"
      },
      {
        id: 188881,
        name: "沉默是金",
        artist: "张国荣",
        album: "Hot Summer"
      },
      {
        id: 287749,
        name: "天黑黑",
        artist: "孙燕姿",
        album: "孙燕姿同名专辑"
      },
      {
        id: 347760,
        name: "喜欢你",
        artist: "Beyond",
        album: "秘密警察"
      },
      {
        id: 2117030,
        name: "Someone Like You",
        artist: "Adele",
        album: "21"
      },
      {
        id: 29723043,
        name: "17岁",
        artist: "刘德华",
        album: "如果有一天"
      },
      {
        id: 33162226,
        name: "悟空",
        artist: "戴荃",
        album: "奇幻游乐园"
      },
      {
        id: 417250673,
        name: "父亲写的散文诗",
        artist: "许飞",
        album: "父亲写的散文诗"
      }]
    };
  }
  
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
          {this.state.slist.map((v, i) =>
            <li key={i}><Link to={`/detail/${v.id}`}>
              <span>{i + 1}</span>
              <h4>{v.name}</h4>
              <small>{v.artist} - {v.album}</small>
            </Link></li>
          )}
        </ul>
        <a href="https://github.com/iflycn/music_react" className="copyright">Gito Player @ Github.com</a>
      </div>
    );
  }
}

export default Home;
