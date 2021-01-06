import songs from './songs.js';
const currentTrack=document.getElementById('currentTrack');
const albumArt= document.getElementById('albumArt');
const trackName= document.querySelector('.track-name');
const artistName=document.querySelector('.artist-name');
const elapsedTime= document.querySelector('.elapsed-time');
const durationOfTrack = document.querySelector('.duration');
const progressBar = document.querySelector('.progress-bar');
const progress = document.querySelector('.progress');
const prevBtn= document.getElementById('previous');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

let isPlaying=false;

const playMusic = () =>{
    isPlaying=true;
    currentTrack.play();
    playBtn.classList.replace('fa-play','fa-pause');
    albumArt.style.animationPlayState="running";
    playBtn.title="Pause";
}

const pauseMusic= ()=>{
    isPlaying=false;
    currentTrack.pause();
    playBtn.classList.replace('fa-pause','fa-play');
    albumArt.style.animationPlayState="paused";
    playBtn.title="Play";
}
  // Index of current Song
let songIndex=0;
const changeTrack= (e) =>{
    if(e.target.id==="previous"){
        songIndex--;
        songIndex < 0 ? songIndex= songs.length-1 : null;
        loadSong(songs[songIndex]);
    }else{
        songIndex++;
        songIndex > songs.length-1 ? songIndex=0:null;
        loadSong(songs[songIndex]);
    }
    playMusic();
}

const loadSong = (song) =>{
    currentTrack.src=`music/${song.name}.mp3`;
    trackName.textContent =song.title;
    albumArt.src = `img/${song.name}.jpg`;
    artistName.textContent=song.artist;
}

const showProgress= (e) =>{
 const {duration,currentTime} =e.target;
 const durationMinutes=Math.floor(duration/60);
 let durationSeconds = Math.floor(duration%60);
 const currentTimeInMin=Math.floor(currentTime/60);
 let currentTimeInSec=Math.floor(currentTime%60);

durationSeconds<10?durationSeconds=`0${durationSeconds}`:null;
 currentTimeInSec <10 ? currentTimeInSec=`0${currentTimeInSec}`:null;
//  Delay is provided to avoid NaN
durationSeconds?durationOfTrack.textContent= `${durationMinutes}:${durationSeconds}`:null;   
currentTimeInSec? elapsedTime.textContent = `${currentTimeInMin}:${currentTimeInSec}`:null; 
//  Update Progress bar
 const percentOfProgress= (currentTime / duration) * 100;
 progress.style.width = `${percentOfProgress}%`;
}

function updateProgress(e){
    
    let {duration} =currentTrack;
    const progressPercent= (e.offsetX /this.clientWidth)*100;
    progress.style.width=`${progressPercent}%`;
    let changedTime = (duration * progressPercent)/100;
    currentTrack.currentTime = changedTime;
}

// Event Listeners
prevBtn.addEventListener('click',changeTrack);
playBtn.addEventListener('click',()=>{
    !isPlaying ? playMusic() : pauseMusic();
});
nextBtn.addEventListener('click',changeTrack);
currentTrack.addEventListener('timeupdate',showProgress);
progressBar.addEventListener('click',updateProgress);
currentTrack.addEventListener('ended',changeTrack);
// Load first song

loadSong(songs[songIndex]);