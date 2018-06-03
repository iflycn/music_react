import React, { Component } from "react";
import "./Detail.css";

class Detail extends Component {
  render() {
    return (
      <div className="detail">
        <div className="song_wrap">
          <div className="song_disc song_needle">
            <div className="song_turn song_rotate song_paused">
              <img src={require("../assets/disc_default.png")} alt="Song Cover" className="song_cover"/>
            </div>
            <span className="song_play"></span>
          </div>
        </div>
        <div className="song_range">
          <small>00:00/00:00</small>
          <input type="range" max="100"/>
        </div>
        <div className="lyric">
          <h3>未知 - 歌手</h3>
          <div className="lyric_txt">
            <ul>
              <li >歌词</li>
            </ul>
          </div>
        </div>
        <div className="song_bg"></div>
      </div>
    );
  }
}

export default Detail;
