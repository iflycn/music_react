import React, { Component } from "react"
import axios from "axios"
import util from "../utils"
import "./Detail.less"

class Detail extends Component {
  //state
  constructor(props) {
    super(props);
    this.state = {
      autoPlay: !0,
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
    this.$_SongToggle = this.$_SongToggle.bind(this);
    this.$_SongJump = this.$_SongJump.bind(this);
  }

  // lifecycle
  componentDidMount() {
    let height = window.screen.availHeight / 2 - 128;
    height = ~~((height - 43) / 32) * 32 + 43; // LH 32 PT 43
    this.setState({ lyricHeight: height > 139 ? height : 139 });
    this.$_Init();
    clearInterval(this.state.timer);
    this.setState({
      timer: setInterval(() => {
        this.setState({ line: this.$_StartTimer() });
      }, 1e3)
    });
  }
  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  // methods
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
  $_StartTimer() {
    const duration = this.refs.audio.duration;
    const currentTime = this.refs.audio.currentTime;
    this.setState({ duration: duration });
    this.setState({ currentTime: currentTime });
    if (this.state.currentTime >= this.state.duration) {
      this.$_SongPause();
      this.state.ids.length > 1 && this.$_SongNext();
    }
    if (this.state.duration > 0 && this.state.autoPlay) {
      this.setState({ autoPlay: !1 });
      this.$_SongPlay();
    }
    const lrc = this.$_FormatLrc(this.state.song.lyric);
    lrc.push({ time: duration * 1e3 });
    if (currentTime < lrc[0].time / 1e3) {
      return 1e-3;
    }
    for (let i = 0; i < lrc.length - 1; i++) {
      if (
        currentTime >= lrc[i].time / 1e3 &&
        currentTime < lrc[i + 1].time / 1e3
      ) {
        return i;
      }
    }
  }
  $_SongPlay() {
    if (this.state.duration > 0) {
      this.refs.audio
        .play()
        .then(() => {
          this.setState({ isPaused: !1 });
        })
        .catch(err => {
          console.warn(err);
        });
    }
  }
  $_SongPause() {
    this.refs.audio.pause();
    this.setState({ isPaused: !0 });
  }
  $_SongToggle() {
    this.state.isPaused ? this.$_SongPlay() : this.$_SongPause();
  }
  $_SongLoad() {
    this.refs.audio.load();
  }
  $_SongJump() {
    const currentTime = this.refs.range.value;
    this.setState({ currentTime: currentTime });
    if (currentTime < this.state.duration) {
      this.refs.audio.currentTime = currentTime;
    }
  }
  $_SongNext() {
    this.setState({ duration: 0 });
    this.state.ids.splice(0, 1);
    this.state.ids.push(this.state.song.id);
    this.$_GetDetail(this.state.ids[0]);
  }
  $_GetDetail(id) {
    axios.get(`${util.baseUrl}/detail?id=${id}`)
      .then(res => {
        this.setState({ song: res.data });
        this.setState({ autoPlay: !0 });
        localStorage.history = this.state.ids.join(",");
      })
      .catch(err => {
        console.error(err);
      });
  }
  $_FormatLrc(lrc) {
    lrc = lrc.replace(/(\[\d{2,}:\d{2}(?:\.\d{2,3})?]){2,}(.*)(\n)/g, (match, _, txt) => {
      return match.replace(`${txt}\n`, "").replace(/(\[\d{2,}:\d{2}(?:\.\d{2,3})?])/g, `$1${txt}\n`);
    }).split("\n");
    const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;
    const lines = [];
    for (let i = 0; i < lrc.length; i++) {
      const result = timeExp.exec(lrc[i]);
      const txt = lrc[i].replace(timeExp, "").trim();
      if (result && txt) {
        lines.push({ time: result[1] * 60 * 1000 + result[2] * 1000 + (result[3] || 0) * 10, txt });
      }
    }
    lines.sort((a, b) => {
      return a.time - b.time;
    });
    return lines;
  }

  render() {
    // computed
    const rangeStyle = () => {
      const percent = ~~(this.state.currentTime / this.state.duration * 100) + 1;
      const color = "rgba(255, 255, 255, 0.2)";
      return `linear-gradient(to right, ${color}, #fff ${percent}%, ${color} ${percent}%, ${color})`;
    }
    const rangeTxt = () => {
      const currentTime = ~~this.state.currentTime;
      const duration = ~~this.state.duration;
      return `${util.fillZero(
        ~~((currentTime / 60) % 60)
      )}:${util.fillZero(currentTime % 60)}/${util.fillZero(
        ~~((duration / 60) % 60)
      )}:${util.fillZero(duration % 60)}`;
    }

    // template
    return (
      <div className="detail">
        <div className="song_wrap">
          <div className={`song_disc${this.state.isPaused ? " song_needle" : ""}`} onClick={this.$_SongToggle}>
            <div className={`song_turn song_rotate${this.state.isPaused ? " song_paused" : ""}`}>
              <img src={this.state.song.picUrl} alt="Song Cover" className="song_cover" />
            </div>
            <span className={`song_play${!this.state.isPaused || this.state.duration === 0 ? " song_pause" : ""}`}></span>
          </div>
        </div>
        {this.state.song.name && this.state.song.artist && <div className="song_range">
          <small>{rangeTxt()}</small>
          <input ref="range" type="range" value={this.state.currentTime} max={this.state.duration} style={{ background: rangeStyle() }} onChange={this.$_SongJump} />
        </div>}
        {this.state.song.name && this.state.song.artist && this.state.lyricHeight > 0 && <div className="lyric" style={{ height: `${this.state.lyricHeight}px` }}>
          <h3>{this.state.song.name} - {this.state.song.artist}</h3>
          <div className="lyric_txt">
            <ul style={{ marginTop: `-${~~this.state.line * 2}em` }}>
              {this.$_FormatLrc(this.state.song.lyric).map((v, i) =>
                <li key={i} className={this.state.line === i ? "hover" : ""}>{v.txt}</li>
              )}
            </ul>
          </div>
        </div>}
        <audio ref="audio" src={this.state.song.url} preload="!0"></audio>
        <div className="song_bg" style={{ backgroundImage: `url(${this.state.song.picUrl})` }}></div>
      </div >
    );
  }
}

export default Detail;
