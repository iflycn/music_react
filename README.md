# Gito Player
这是一个极简的 `React` 音乐播放器，使用了官方脚手架 `Create React App` 搭建、 `Webpack` 打包，涉及到的技术栈包括 `React`、`React Router`

## 应用截图
![](https://github.com/iflycn/music_react/blob/master/public/screenshot.png)

## 如何运行
``` bash
# 克隆到本地
git clone https://github.com/iflycn/music_react.git
# 进入文件夹
cd music_react
# 安装依赖
npm install
# 开启本地服务器
npm start
# 发布环境
npm run build
```

## 开发历史
- [x] 开个坑，有空就会填一填
- [x] 项目开始搭建
- [x] 完成播放器样式
- [x] 建立简单歌单

## TODO
- [ ] 当前歌词高亮显示
- [ ] 完成歌词滚动
- [ ] 添加歌曲进度条
- [ ] 进度条拖动控制
- [ ] 歌单连续播放
- [ ] 解析复杂 LRC 文件
- [ ] 保存播放历史
- [ ] 根据窗口大小计算歌词高度
- [ ] 播放器抽象为公用组件
- [ ] 歌单页显示播放状态
- [ ] 已知 BUG：因移动端限制，音乐无法自动播放
- [ ] 已知 BUG：部分移动端浏览器中，transform: rotate 对应的 animation-play-state 属性工作不正常
- [ ] 已知 BUG：部分移动端浏览器中，audio 组件工作不正常

## 参考资料
- [https://doc.react-china.org/](https://doc.react-china.org/)
- [http://reacttraining.cn/web/guides/quick-start](http://reacttraining.cn/web/guides/quick-start)
- [http://www.w3school.com.cn/tags/html_ref_audio_video_dom.asp](http://www.w3school.com.cn/tags/html_ref_audio_video_dom.asp)
- [https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)