function isPlaying(audio) {
    return !audio.paused;
}
$(document).ready(function() {
    $("#volume-bar").on('input', function() {
        $(this).css('background', 'linear-gradient(90deg, #007bff ' + $(this).val() + '%, #d3d3d3 ' + ($(this).val()) + '%)');
    });
    $('.volume i.fa-volume-up').show();
    $('.volume i.fa-volume-down').hide();
    $('.volume i.fa-volume-off').hide();

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
        $('.volume-bar-status').toggleClass('not-display');
    });

    $(document).click(e => {
        if (!$('.btn-audio.volume, #volume-bar, .volume-bar-status, .volume-bar-status i').is(e.target) &&
            !$('.volume-bar-status').hasClass('not-display')) {
            $('.volume-bar-status').addClass('not-display');
        }
    });

    let speeds = [1.0, 0.5, 0.8, 1.2, 1.5];
    let audio = $('.audio audio')[0];
    let progress = $('#music-progress-bar');
    let speed = $('.btn-audio.speed');
    let currentTime = $('.capacity .start');
    let duration = $('.capacity .end');
    let VolumeSlider = $('#volume-bar');

    let currentSpeedIdx = 0;

    let toHHMMSS = function(totalsecs) {
        let sec_num = parseInt(totalsecs, 10);
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
    VolumeSlider.on('input', function() {
        audio.volume = parseInt($(this).val()) / 100;
        let volumeValue = $('#volume-bar').val();
        if (volumeValue >= 60 && volumeValue <= 100) {
            $('.volume i.fa-volume-up').show();
            $('.volume i.fa-volume-down').hide();
            $('.volume i.fa-volume-off').hide();
        } else if (volumeValue < 60 && volumeValue >= 1) {
            $('.volume i.fa-volume-up').hide();
            $('.volume i.fa-volume-down').show();
            $('.volume i.fa-volume-off').hide();
        } else {
            $('.volume i.fa-volume-up').hide();
            $('.volume i.fa-volume-down').hide();
            $('.volume i.fa-volume-off').show();
        }
    });
    // $('input[type="range"]').change(function() {
    //     var val = ($(this).val() + '%';

    //     $(this).css('background-image',
    //         '-webkit-gradient(linear, left top, right top, ' +
    //         'color-stop(' + val + ', #007bff), ' +
    //         'color-stop(' + val + ', #d3d3d3)' +
    //         ')'
    //     );
    // });

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

    $(document).on('click', '.volume-bar-status i.fa-volume-off', function() {
        $('.volume i.fa-volume-up').hide();
        $('.volume i.fa-volume-down').hide();
        $('.volume i.fa-volume-off').show();
        $('#volume-bar').css('background', 'linear-gradient(90deg, #007bff 0%, #d3d3d3 0%)');
        $('#volume-bar').val(0);
        audio.volume = 0;
    });

    $(document).on('click', '.volume-bar-status i.fa-volume-up', function() {
        $('.volume i.fa-volume-up').show();
        $('.volume i.fa-volume-down').hide();
        $('.volume i.fa-volume-off').hide();
        $('#volume-bar').css('background', 'linear-gradient(90deg, #007bff 100%, #d3d3d3 100%)');
        $('#volume-bar').val(100);
        audio.volume = 1;
    });
});