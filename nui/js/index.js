class SoundPlayer {
    constructor(audio, volume, loop = false) {
        if (!this.isValidAudioFormat(audio)) {
            throw new console.error('The audio format is invalid'); // 音频文件名称格式不正确
        }

        this.sound = new Howl({
            src: ['./audio/' + audio],
            volume: volume,
            loop: loop
        });

        if (this.playing()) this.pause();
        else this.play();
    }

    playing() {
        return this.sound.playing();
    }

    play() {
        this.sound.play();
    }

    pause() {
        this.sound.pause();
    }

    destroy() {
        this.pause();
        this.sound.unload();
        this.sound = null;
    }

    isValidAudioFormat(audioFilePath) {
        const audioFolderRegex = /^[a-zA-Z0-9\s_\-]+\.(mp3|wav|ogg|aac|flac)$/;
        return audioFolderRegex.test(audioFilePath);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('message', function(event) {
        let data = event.data;

        if (data) {
            if (data.type === 'play') {
                if (_checkDataValid(data.audio, data.volume)) {
                    let loop = false;
                    if (data.loop) loop = true;
                    const hitMarker = new SoundPlayer(data.audio, data.volume, loop);
                    console.log(hitMarker)
                }
                else throw new console.error('[AUDIO PLAYER] ERROR DATA ARGS');
            }
            else throw new console.error('[AUDIO PLAYER] ERROR EVENT DATA TYPE');
        }
        else throw new console.error('[AUDIO PLAYER] ERROR EVENT DATA');
    });

    function _checkDataValid(audio, volume, loop) {
        return audio && typeof audio === 'string' && volume && typeof volume === 'number' && loop && typeof loop === 'boolean';
    }
});