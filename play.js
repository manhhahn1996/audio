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
    });

    $(document).on('click', '.btn-audio.volume', function() {
        $('.volume-bar').toggleClass('display')
    });

    let speeds = [1.0, 0.5, 0.8, 1.2, 1.5];
    let audio = $('.audio audio')[0];
    let progress = $('#music-progress-bar');
    let speed = $('.btn-audio.speed');
    let mute = $('.pcast-mute');
    let currentTime = $('.capacity .start');
    let duration = $('.capacity .end');
    let VolumeSlider = $('#volume-bar');

    let currentSpeedIdx = 0;

    let toHHMMSS = function(totalsecs) {
        let sec_num = parseInt(totalsecs, 10); // don't forget the second param
        let minutes = Math.floor(sec_num / 60);
        let seconds = sec_num - (minutes * 60);

        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }

        let time = minutes + ':' + seconds;
        return time;
    };

    function onloadedmetadata() {
        progress.attr('aria-valuemax', Math.floor(audio.duration));
        duration.text(toHHMMSS(audio.duration));
    }
    if (audio.duration) {
        onloadedmetadata();
    } else {
        audio.addEventListener('loadedmetadata', onloadedmetadata);
    }
    audio.addEventListener('timeupdate', function() {
        progress.css('width', audio.currentTime / audio.duration * 100 + '%');
        progress.attr('aria-valuenow', audio.currentTime);
        currentTime.text(toHHMMSS(audio.currentTime));
        if (audio.currentTime === audio.duration) {
            $('.fa-play').removeClass('not-display');
            $('.fa-pause').removeClass('display');
        }
    });

    $(document).on('click', '#music-progress', function(e) {
        audio.currentTime = Math.floor(audio.duration) * (e.offsetX / $('#music-progress').width());

    });

    speed.on('click', function() {
        currentSpeedIdx = currentSpeedIdx + 1 < speeds.length ? currentSpeedIdx + 1 : 0;
        audio.playbackRate = speeds[currentSpeedIdx];
        $(this).text(speeds[currentSpeedIdx] + 'x');
    });

    VolumeSlider.change('input', function() {
        audio.volume = parseInt(this.value) / 100;
    });

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
        if ($('.btn-audio.repeat-time').hasClass('audio-background')) {
            audio.currentTime = audio.currentTime - 3;
        } else {
            audio.currentTime = 0;
        }
    });

    $(document).on('click', '.btn-audio.repeat-time', function() {
        $('.btn-audio.repeat-time').toggleClass('audio-background');
    });

});