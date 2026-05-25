const audioPlayer = document.getElementById('audioPlayer');
const trackInfo = document.getElementById('trackInfo');

let mp3Files = [];  // Array to store MP3 URLs from load.json

// Function to pull a pure random link out of the database array instantly
async function playPureRandomTrack() {
    // 1. Initial data fetch check if the master list is empty
    if (mp3Files.length === 0) {
        try {
            console.log('📡 Fetching transmission manifest array from load.json...');
            const response = await fetch('load.json');
            const data = await response.json();
            mp3Files = data.mp3s.slice();
            console.log(`📦 Broadcast matrix live: ${mp3Files.length} remote links available for random select.`);
        } catch (error) {
            console.error('❌ Error loading transmission node manifest:', error);
            trackInfo.textContent = 'Connection Error: Unable to read database configuration.';
            return;
        }
    }

    // 2. Pure Random Selection: No tracking arrays, no blocking loop cycles
    // Pick an integer between 0 and 381 instantly on every execution event
    const randomIndex = Math.floor(Math.random() * mp3Files.length);
    const targetTrackUrl = mp3Files[randomIndex];

    // Clean up the long Archive.org folder URL strings for a clean dashboard display
    const decodedUrl = decodeURIComponent(targetTrackUrl);
    const rawFileName = decodedUrl.substring(decodedUrl.lastIndexOf('/') + 1);

    // 3. Commit link parameters straight to the HTML5 audio layer
    audioPlayer.src = targetTrackUrl;
    trackInfo.textContent = 'Now playing: ' + rawFileName;

    console.log(`📡 Random Stream Triggered [Track Index: ${randomIndex}]: ${rawFileName}`);

    // 4. Fire the playback mechanism
    try {
        await audioPlayer.play();
    } catch (playError) {
        console.warn('⚠️ Playback delayed. Awaiting manual trigger event.');
    }
}

// Bind master event handlers to handle instant random selection loops
document.getElementById('playButton').addEventListener('click', playPureRandomTrack);
audioPlayer.addEventListener('ended', playPureRandomTrack);
