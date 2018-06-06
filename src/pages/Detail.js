import React, { Component } from "react"
import { Listen } from "rectx"
import StoreController from "../store"
import util from "../utils"
import "./Detail.less"
import Loading from "../components/Loading"

class DetailInner extends Component {
  //state
  constructor(props) {
    super(props);
    this.state = {
      lyricHeight: 0
    };
  }

  // computed
  rangeStyle = () => {
    const percent = ~~(this.props.store.state.currentTime / this.props.store.state.duration * 100) + 1;
    const color = "rgba(255, 255, 255, 0.2)";
    return `linear-gradient(to right, ${color}, #fff ${percent}%, ${color} ${percent}%, ${color})`;
  }
  rangeTxt = () => {
    const currentTime = ~~this.props.store.state.currentTime;
    const duration = ~~this.props.store.state.duration;
    return `${util.fillZero(
      ~~((currentTime / 60) % 60)
    )}:${util.fillZero(currentTime % 60)}/${util.fillZero(
      ~~((duration / 60) % 60)
    )}:${util.fillZero(duration % 60)}`;
  }

  // lifecycle
  componentDidMount() {
    let height = window.screen.availHeight / 2 - 128;
    height = ~~((height - 43) / 32) * 32 + 43; // LH 32 PT 43
    this.setState({ lyricHeight: height > 139 ? height : 139 });
    this.props.store.$_Init(this.props.id);
  }

  render() {
    // template
    return (
      <div className="detail">
        {this.props.store.state.duration === 0 && <Loading />}
        <div className="song_wrap">
          <div className={`song_disc${this.props.store.state.isPaused ? " song_needle" : ""}`} onClick={() => this.props.store.$_SongToggle()}>
            <div className={`song_turn song_rotate${this.props.store.state.isPaused ? " song_paused" : ""}`}>
              <img src={this.props.store.state.song.picUrl} alt="Song Cover" className="song_cover" />
            </div>
            <span className={`song_play${!this.props.store.state.isPaused || this.props.store.state.duration === 0 ? " song_pause" : ""}`}></span>
          </div>
        </div>
        {this.props.store.state.song.name && this.props.store.state.song.artist && <div className="song_range">
          <small>{this.rangeTxt()}</small>
          <input ref="range" type="range" value={this.props.store.state.currentTime} max={this.props.store.state.duration} style={{ background: this.rangeStyle() }} onChange={() => this.props.store.$_SongJump(this.refs.range.value)} />
        </div>}
        {this.props.store.state.song.name && this.props.store.state.song.artist && this.state.lyricHeight > 0 && <div className="lyric" style={{ height: `${this.state.lyricHeight}px` }}>
          <h3>{this.props.store.state.song.name} - {this.props.store.state.song.artist}</h3>
          <div className="lyric_txt">
            <ul style={{ marginTop: `-${~~this.props.store.state.line * 2}em` }}>
              {this.props.store.formatLrc().map((v, i) =>
                <li key={i} className={this.props.store.state.line === i ? "hover" : ""}>{v.txt}</li>
              )}
            </ul>
          </div>
        </div>}
        <div className="song_bg" style={{ backgroundImage: `url(${this.props.store.state.song.picUrl})` }}></div>
      </div >
    );
  }
}

class Detail extends Component {
  render() {
    return (
      <Listen to={[StoreController]}>
        {store => (
          <DetailInner store={store} id={this.props.match.params.id} />
        )}
      </Listen>
    );
  }
}

export default Detail;
