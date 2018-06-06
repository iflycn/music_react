import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { Listen } from "rectx"
import StoreController from "../store"
import util from "../utils"
import "./Home.less"
import Loading from "../components/Loading"

class HomeInner extends Component {
  // state
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0,
      history: null,
      slist: []
    };
    this.$_FixAutoplay = this.$_FixAutoplay.bind(this);
    this.$_SetScrollTop = this.$_SetScrollTop.bind(this);
  }

  // computed
  controlOrder = () => {
    return `/detail/${this.$_GetIds()}`;
  }
  controlRandom = () => {
    return `/detail/${util.arrShuffle(this.$_GetIds())}`;
  }
  controlHistory = () => {
    return `/detail/${this.state.history || ""}`;
  }

  // lifecycle
  componentDidMount() {
    this.props.store.state.song.url || window.addEventListener("touchend", this.$_FixAutoplay);
    window.addEventListener("scroll", this.$_SetScrollTop);
    this.setState({ history: localStorage.history });
    this.$_GetList();
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.$_SetScrollTop);
  }

  // methods
  $_FixAutoplay(store) {
    this.props.store.$_FixAutoplay();
    window.removeEventListener("touchend", this.$_FixAutoplay);
  }
  $_SetScrollTop() {
    this.setState({ scrollTop: window.scrollY });
  }
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
    sessionStorage.slist ?
      this.setState({ slist: JSON.parse(sessionStorage.slist) }) :
      axios.get(`${util.baseUrl}/slist`)
        .then(res => {
          this.setState({ slist: res.data });
          sessionStorage.slist = JSON.stringify(res.data);
        })
        .catch(err => {
          console.error(err);
        });
  }

  render() {
    // template
    return (
      <div className="home">
        {this.state.slist.length === 0 && <Loading />}
        <h1 className="songs_title">推荐歌单</h1>
        {!this.props.store.state.isPaused && <Link to={this.controlHistory()} className="songs_playing">Songs Playing</Link>}
        {this.state.slist.length > 1 && <ul className={`songs_control${this.state.history ? " songs_control_history" : ""}${this.state.scrollTop > 72 ? " songs_control_fixed" : ""}`}>
          <li><Link to={this.controlOrder()}>顺序播放</Link></li>
          <li><Link to={this.controlRandom()}>随机播放</Link></li>
          {this.state.history && <li><Link to={this.controlHistory()}>历史播放</Link></li>}
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

class Home extends Component {
  render() {
    return (
      <Listen to={[StoreController]}>
        {store => (
          <HomeInner store={store} />
        )}
      </Listen>
    );
  }
}

export default Home;
