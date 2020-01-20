function isPlaying(audio) {
    return !audio.paused;
}
$(document).ready(function() {
    $(document).on('click', '.play-pause', function() {
        $('.fa-play').toggleClass('not-display');
        $('.fa-pause').toggleClass('display');
        if (isPlaying($('.audio audio')[0])) {
            $('.audio audio')[0].pause();
        } else {
            $('.audio audio')[0].play();
        }
        let mediaElement = $('.audio audio')[0];
        // mediaElement.seekable.start(); // Returns the starting time (in seconds)
        // mediaElement.seekable.end(); // Returns the ending time (in seconds)
        // mediaElement.currentTime = mediaElement.duration - 20; // Seek to 122 seconds
        // mediaElement.played.end();
        console.log(mediaElement.duration)
    });

    $(document).on('click', '.btn-audio.volume', function() {
        $('.volume-bar').toggleClass('display')
    });

    $('.progress-bar').attr('max', Math.floor($('.audio audio')[0].duration))

    let speeds = [1.0, 0.5, 0.8, 1.2, 1.5]
    let audio = $('.audio audio')[0];
    let play = $('.btn-audio.play-pause');
    let rewind = $('.pcast-rewind');
    let forward = $('.pcast-forward');
    let progress = $('.progress-bar');
    let speed = $('.pcast-speed');
    let mute = $('.pcast-mute');
    let currentTime = $('.capacity .start');
    let duration = $('.capacity .end');
    let VolumeSlider = $('.volume-bar');

    let currentSpeedIdx = 0;

    let toHHMMSS = function(totalsecs) {
        let sec_num = parseInt(totalsecs, 10); // don't forget the second param
        let minutes = Math.floor(sec_num / 60);
        let seconds = sec_num - (minutes * 60);

        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }

        let time = minutes + ':' + seconds;
        return time;
    }

    function onloadedmetadata() {
        // progress.setAttribute('max', Math.floor(audio.duration));
        duration.text(toHHMMSS(audio.duration));
    }
    if (audio.duration) {
        onloadedmetadata();
    } else {
        audio.addEventListener('loadedmetadata', onloadedmetadata);
    }
    audio.addEventListener('timeupdate', function() {
        progress.css('width', audio.currentTime / audio.duration * 100 + '%');
        currentTime.text(toHHMMSS(audio.currentTime));
    });

    rewind.on('click', function() {
        audio.currentTime -= 3;
    }, false);

    forward.on('click', function() {
        audio.currentTime += 3;
    }, false);

    // progress.addEventListener('click', function(e) {
    //     audio.currentTime = Math.floor(audio.duration) * (e.offsetX / e.target.offsetWidth);
    // }, false);

    speed.on('click', function() {
        currentSpeedIdx = currentSpeedIdx + 1 < speeds.length ? currentSpeedIdx + 1 : 0;
        audio.playbackRate = speeds[currentSpeedIdx];
        this.textContent = speeds[currentSpeedIdx] + 'x';
        return true;
    }, false);

    VolumeSlider.change('input', function() {
        audio.volume = parseInt(this.value) / 10;
        step = .01;
        min = 0;
        max = 1;
        value = 1;
    }, false);

    mute.on('click', function() {
        if (audio.muted) {
            audio.muted = false;
            this.querySelector('span').innerHTML = 'Mute';
        } else {
            audio.muted = true;
            this.querySelector('span').innerHTML = 'Unmute';
        }
    }, false);

    $(document).on('click', '.btn-audio.repeat', function() {
        let audio = $('.audio audio')[0];
        // $('.btn-audio.repeat').toggleClass('audio-background');
        audio.currentTime = 0;
    });

    $(document).on('click', '.btn-audio.repeat-time', function() {
        let audio = $('.audio audio')[0];
        $('.btn-audio.repeat-time').toggleClass('audio-background');
    });

    $(document).on('click', '.btn-audio.download', function() {
        let audio = $('.audio audio')[0];
        // $('.btn-audio.download').attr('href', audio.src);
        $('.btn-audio.download').attr('download', 'filename.mp3');
    });

    $(document).on('click', '.btn-audio.speed', function() {
        let audio = $('.audio audio')[0];
        console.log($('.speed').text())
        audio.playbackRate = 1.2;
    });
});