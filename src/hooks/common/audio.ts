import { fetchTtsId } from '@/service/api';
export default async function useAudio(content: string) {
  let playAudio = () => {
    console.error('音频未加载或播放方法不可用');
  };
  const { data: ttsId, error: idError } = await fetchTtsId(content);
  if (!idError && ttsId) {
    console.log(ttsId);

    // // 拼接音频文件的 URL
    // const audioUrl = `https://ztwechat.superxi.cn/static/audios/${ttsId}.mp3`;

    // // 播放音频
    // const audioPlayer = new Audio(audioUrl);
    // audioPlayer.play();

    // // 下载音频
    // const downloadLink = document.createElement('a');
    // downloadLink.href = audioUrl;
    // downloadLink.download = `${ttsId}.mp3`;
    // document.body.appendChild(downloadLink);
    // downloadLink.click();
    // document.body.removeChild(downloadLink);

    // 拼接音频文件的 URL
    const audioUrl = `https://ztwechat.superxi.cn/static/audios/${ttsId}.mp3`;

    // 创建 Audio 对象并播放音频
    const audioPlayer = new Audio(audioUrl);

    // 添加事件监听
    // if (onPlayCallback) {
    //   audioPlayer.addEventListener('play', onPlayCallback);
    // }
    // if (onPauseCallback) {
    //   audioPlayer.addEventListener('pause', onPauseCallback);
    // }
    // if (onEndedCallback) {
    //   audioPlayer.addEventListener('ended', onEndedCallback);
    // }

    // 播放方法，以便在用户交互时调用
    playAudio = () => {
      audioPlayer
        .play()
        .then(() => {})
        .catch(error => {
          console.error('播放音频时出错:', error);
        });
    };
  }
  return { playAudio };
}
