import React, { Component } from "react"
import axios from "axios"
import util from "../utils"
import "./Detail.less"

class Detail extends Component {
  //state
  constructor(props) {
    super(props);
    this.state = {
      lyricHeight: 0,
      ids: [],
      timer: -1,
      isPaused: !0,
      line: 1e-3,
      duration: 0,
      currentTime: 0,
      song: {
        id: -1,
        name: null,
        artist: null,
        url: null,
        picUrl: require("../assets/disc_default.png"),
        lyric: ""
      }
    };
  }

  // lifecycle
  componentDidMount() {
    const height = window.screen.availHeight - document.body.offsetHeight - 146;
    this.setState({ lyricHeight: height >= 130 ? height : 130 });
    this.$_Init();
  }

  // methods
  $_GetDetail(id) {
    axios
      .get(`${util.baseUrl}/detail?id=${id}`)
      .then(res => {
        this.setState({ song: res.data });
        localStorage.history = this.state.ids.join(",");
      })
      .catch(err => {
        console.error(err);
      });
  }
  $_Init() {
    const id = this.props.match.params.id;
    if (id) {
      if (this.state.ids.join(",").indexOf(id) === -1) {
        this.setState({ line: 1e-3 });
      }
      this.setState({ ids: id.split(",") });
      this.$_GetDetail(id.split(",")[0]);
    }
  }

  render() {
    // computed
    let rangeTxt = () => {
      const currentTime = ~~this.state.currentTime;
      const duration = ~~this.state.duration;
      return `${util.fillZero(
        ~~((currentTime / 60) % 60)
      )}:${util.fillZero(currentTime % 60)}/${util.fillZero(
        ~~((duration / 60) % 60)
      )}:${util.fillZero(duration % 60)}`;
    }
    let formatLrc = () => {
      const lrc = this.state.song.lyric
        .replace(
        /(\[\d{2,}:\d{2}(?:\.\d{2,3})?]){2,}(.*)(\n)/g,
        (match, _, txt) => {
          return match
            .replace(`${txt}\n`, "")
            .replace(/(\[\d{2,}:\d{2}(?:\.\d{2,3})?])/g, `$1${txt}\n`);
        }
        )
        .split("\n");
      const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;
      const lines = [];
      for (let i = 0; i < lrc.length; i++) {
        const result = timeExp.exec(lrc[i]);
        const txt = lrc[i].replace(timeExp, "").trim();
        if (result && txt) {
          lines.push({
            time: result[1] * 60 * 1000 + result[2] * 1000 + (result[3] || 0) * 10,
            txt
          });
        }
      }
      lines.sort((a, b) => {
        return a.time - b.time;
      });
      return lines;
    }

    // template
    return (
      <div className="detail">
        <div className="song_wrap">
          <div className="song_disc song_needle">
            <div className="song_turn song_rotate song_paused">
              <img src={this.state.song.picUrl} alt="Song Cover" className="song_cover" />
            </div>
            <span className="song_play"></span>
          </div>
        </div>
        <div className="song_range">
          <small>{rangeTxt()}</small>
          <input type="range" max="100" />
        </div>
        <div className="lyric" style={{ height: `${this.state.lyricHeight}px` }}>
          <h3>{this.state.song.name} - {this.state.song.artist}</h3>
          <div className="lyric_txt">
            <ul style={{ marginTop: `-${~~this.state.line * 2}em` }}>
              {formatLrc().map((v, i) =>
                <li key={i} className="hover">{v.txt}</li>
              )}
            </ul>
          </div>
        </div>
        <audio ref="audio" src={this.state.song.url} autoPlay="!0" preload="!0"></audio>
        <div className="song_bg" style={{ backgroundImage: `url(${this.state.song.picUrl})` }}></div>
      </div >
    );
  }
}

export default Detail;
