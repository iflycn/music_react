import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import util from "../utils"
import "./Home.less"

class Home extends Component {
  // state
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0,
      history: null,
      slist: []
    };
    this.$_SetScrollTop = this.$_SetScrollTop.bind(this);
  }

  // lifecycle
  componentDidMount() {
    window.addEventListener("scroll", this.$_SetScrollTop);
    this.setState({ history: localStorage.history });
    this.$_GetList();
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.$_SetScrollTop);
  }

  // methods
  $_CompleteNum(i) {
    i += 1;
    return util.fillZero(i);
  }
  $_GetIds() {
    const ids = [];
    for (let i = 0; i < this.state.slist.length; i++) {
      ids.push(this.state.slist[i].id);
    }
    return ids;
  }
  $_GetList() {
    axios
      .get(`${util.baseUrl}/slist`)
      .then(res => {
        this.setState({ slist: res.data });
      })
      .catch(err => {
        console.error(err);
      });
  }
  $_SetScrollTop() {
    this.setState({ scrollTop: window.scrollY });
  }

  render() {
    // computed
    const controlOrder = () => {
      return `/detail/${this.$_GetIds()}`;
    }
    const controlRandom = () => {
      return `/detail/${util.arrShuffle(this.$_GetIds())}`;
    }
    const controlHistory = () => {
      return `/detail/${this.state.history || ""}`;
    }

    // template
    return (
      <div className="home">
        <h1 className="songs_title">推荐歌单</h1>
        {false && <Link to={controlHistory()} className="songs_playing">Songs Playing</Link>}
        {this.state.slist.length > 1 && <ul className={`songs_control${this.state.history ? " songs_control_history" : ""}${this.state.scrollTop > 72 ? " songs_control_fixed" : ""}`}>
          <li><Link to={controlOrder()}>顺序播放</Link></li>
          <li><Link to={controlRandom()}>随机播放</Link></li>
          {this.state.history && <li><Link to={controlHistory()}>历史播放</Link></li>}
        </ul>}
        <ul className="songs_list">
          {this.state.slist.map((v, i) =>
            <li key={i}><Link to={`/detail/${v.id}`}>
              <span>{this.$_CompleteNum(i)}</span>
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
