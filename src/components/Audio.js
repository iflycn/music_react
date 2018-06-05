import React, { Component } from "react"
import axios from "axios"
import { Listen } from "rectx"
import StoreController from "../store"
import util from "../utils"
import "./Audio.less"

class AudioInner extends Component {
  //state
  constructor(props) {
    super(props);
    this.state = {
      autoPlay: !0
    };
    this.props.store.$_Init = this.$_Init.bind(this);
    this.props.store.$_FixAutoplay = this.$_FixAutoplay.bind(this);
    this.props.store.$_SongToggle = this.$_SongToggle.bind(this);
    this.props.store.$_SongJump = this.$_SongJump.bind(this);
  }

  // lifecycle
  componentDidMount() {
    this.timerID = setInterval(() => this.$_StartTimer(), 1e3);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // methods
  $_Init(id) {
    if (id) {
      if (this.props.store.state.ids.join(",").indexOf(id) === -1) {
        this.props.store.resetAll();
      }
      this.props.store.setIds(id.split(","));
      this.$_GetDetail(id.split(",")[0]);
    }
  }
  $_StartTimer() {
    const duration = this.refs.audio.duration;
    const currentTime = this.refs.audio.currentTime;
    duration && this.props.store.setDuration(duration);
    currentTime && this.props.store.setCurrentTime(currentTime);
    if (duration > 5 && this.state.autoPlay) {
      this.setState({ autoPlay: !1 });
      this.$_SongPlay();
    }
    if (currentTime >= duration) {
      this.$_SongPause();
      this.props.store.state.ids.length > 1 && this.$_SongNext();
    }
    if (!this.props.store.state.isPaused) {
      const lrc = this.props.store.formatLrc();
      lrc.push({ time: duration * 1e3 });
      if (currentTime < lrc[0].time / 1e3) {
        this.props.store.setLine(1e-3);
      } else {
        for (let i = 0; i < lrc.length - 1; i++) {
          if (currentTime >= lrc[i].time / 1e3 && currentTime < lrc[i + 1].time / 1e3) {
            this.props.store.setLine(i);
          }
        }
      }
    }
  }
  $_FixAutoplay() {
    this.refs.audio
      .play()
      .then(() => {
        console.log("Autoplay has been repaired.");
      })
      .catch(err => {
        console.warn(err);
      });
  }
  $_SongPlay() {
    if (this.props.store.state.duration > 0) {
      this.refs.audio
        .play()
        .then(() => {
          this.props.store.setIsPaused(!1);
        })
        .catch(err => {
          console.warn(err);
        });
    }
  }
  $_SongPause() {
    this.refs.audio.pause();
    this.props.store.setIsPaused(!0);
  }
  $_SongToggle() {
    this.props.store.state.isPaused ? this.$_SongPlay() : this.$_SongPause();
  }
  $_SongLoad() {
    this.refs.audio.load();
  }
  $_SongJump(value) {
    this.props.store.setCurrentTime(value);
    if (value < this.props.store.state.duration) {
      this.refs.audio.currentTime = value;
    }
  }
  $_SongNext() {
    this.props.store.resetAll();
    this.props.store.state.ids.splice(0, 1);
    this.props.store.state.ids.push(this.props.store.state.song.id);
    this.$_GetDetail(this.props.store.state.ids[0]);
  }
  $_GetDetail(id) {
    axios.get(`${util.baseUrl}/detail?id=${id}`)
      .then(res => {
        this.props.store.setSong(res.data);
        this.setState({ autoPlay: !0 });
        localStorage.history = this.props.store.state.ids.join(",");
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    // template
    return (
      <audio ref="audio" src={this.props.store.state.song.url || "data:audio/mp3;base64,/+MYxAAAAANIAUAAAASEEB/jwOFM/0MM/90b/+RhST//w4NFwOjf///PZu////9lns5GFDv//l9GlUIEEIAAAgIg8Ir/JGq3/+MYxDsLIj5QMYcoAP0dv9HIjUcH//yYSg+CIbkGP//8w0bLVjUP///3Z0x5QCAv/yLjwtGKTEFNRTMuOTeqqqqqqqqqqqqq/+MYxEkNmdJkUYc4AKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq"} preload="!0"></audio>
    );
  }
}

class Audio extends Component {
  render() {
    return (
      <Listen to={[StoreController]}>
        {store => (
          <AudioInner store={store} />
        )}
      </Listen>
    );
  }
}

export default Audio;
