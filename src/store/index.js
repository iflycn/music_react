import { Controller } from "rectx"

class StoreController extends Controller {
  // state
  state = {
    ids: [],
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
  }

  // getters
  formatLrc = () => {
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

  // mutations
  resetAll = () => {
    this.setState({ line: 1e-3 });
    this.setState({ duration: 0 });
    this.setState({ currentTime: 0 });
  }
  setIds = (payload, f = () => { }) => {
    this.setState({ ids: payload }, f());
  }
  setIsPaused = (payload, f = () => { }) => {
    this.setState({ isPaused: payload }, f());
  }
  setLine = (payload, f = () => { }) => {
    this.setState({ line: payload }, f());
  }
  setDuration = (payload, f = () => { }) => {
    this.setState({ duration: payload }, f());
  }
  setCurrentTime = (payload, f = () => { }) => {
    this.setState({ currentTime: payload }, f());
  }
  setSong = (payload, f = () => { }) => {
    this.setState({ song: payload }, f());
  }
}

export default StoreController;
