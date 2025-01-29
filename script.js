console.log("javascript..");

let currentSong = new Audio()

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    
    // Pad with leading zeros if needed
    let formattedTime = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    
    return formattedTime;
}

async function getSongs() {
    let a = await fetch('http://127.0.0.1:5500/songs/');
    let response = await a.text();
    console.log(response);

    let div = document.createElement("div");
    div.innerHTML = response;

    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
        }
    }
    return songs;
}

const playMusic = (track) => {
    
    // let audio = new Audio("/songs/" + track)
    currentSong.src = "/songs/" + track
    currentSong.play();
    play.src = "pause.png"
    document.querySelector(".songInfo").innerHTML = track
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"

}  


async function main() {
    
    let songs = await getSongs();
    console.log(songs);
    //show all songs in playlist
    let songUL = document.querySelector(".songsList ul");
    for (const song of songs) {
        songUL.innerHTML += `<li> <img class="invert" src="song.png" alt="">
                    <div class="info">
                        <div>${song.replaceAll("%20", " ")}</div>
                        <div>Harry</div>
                    </div>
                    <div class="playnow">
                        <span>Play Now</span>
                        <img class="invert" src="play.png" alt="">
                    </div> </li>`;
    }

    Array.from(document.querySelector(".songsList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
        
    }); 

    play.addEventListener("click", () => {
        if(currentSong.paused) {
            currentSong.play()
            play.src = "pause.png"
        }
        else {
            currentSong.pause()
            play.src = "play.png"
        }
    })
    previous.addEventListener("click", () => {

    })

    currentSong.addEventListener("timeupdate", () => {
        console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`
    })
     
    // Play the first song
    // var audio = new Audio('http://127.0.0.1:5500/songs/' + songs[0]);
    //audio.play();

    // audio.addEventListener("timeupdate", () => {
    //     console.log(audio.duration, audio.currentSrc, audio.currentTime);
    // });
} 

main();
