console.log("javascript..");

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
        console.log(e.target.getElementsByTagName("div")[0])
    });
     
    // Play the first song
    // var audio = new Audio('http://127.0.0.1:5500/songs/' + songs[0]);
    //audio.play();

    // audio.addEventListener("timeupdate", () => {
    //     console.log(audio.duration, audio.currentSrc, audio.currentTime);
    // });
} 

main();
