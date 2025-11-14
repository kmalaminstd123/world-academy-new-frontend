const courseYtVideoIframe = document.getElementById('course_yt_video')
const courseVideoModal = document.getElementById('cv_m')
const cvModalCloaseBtn = document.querySelector('#cv_m .btn-close')
const viddeoModalIframe = document.querySelector('#v_m_frame')
const cv_play_btn = document.querySelector('.course_video_play_btn button')

// original video src
const videoSrc = courseYtVideoIframe.src

console.log(videoSrc)
console.log(cv_play_btn)

// stop video when modal close
cvModalCloaseBtn.addEventListener('click', ()=>{
    viddeoModalIframe.src = ''
})

cv_play_btn.addEventListener('click', ()=>{
    viddeoModalIframe.src = videoSrc
})