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
    this.setState({ isPaused: !0 });
    this.setState({ line: 1e-3 });
    this.setState({ duration: 0 });
    this.setState({ currentTime: 0 });
  }
  setIds = payload => {
    this.setState({ ids: payload });
  }
  setIsPaused = payload => {
    this.setState({ isPaused: payload });
  }
  setLine = payload => {
    this.setState({ line: payload });
  }
  setDuration = payload => {
    this.setState({ duration: payload });
  }
  setCurrentTime = payload => {
    this.setState({ currentTime: payload });
  }
  setSong = payload => {
    this.setState({ song: payload });
  }
}

export default StoreController;
