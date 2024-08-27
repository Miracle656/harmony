//fetch access tokens
const clientId = '8d78081d8d8f4da180ff0b389c4c3749';
const clientSecret = 'd596a301f94a44308b3354f896d642f4';

async function getAccessToken() {
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });
    
    const data = await result.json();
    return data.access_token;
}


//search for songs
async function searchSongs(query) {
    const token = await getAccessToken();

    const result = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    
    const data = await result.json();
    return data.tracks.items;
}

function displaySongs(songs) {
    const songList = document.getElementById('songList');
    songList.innerHTML = ''; // Clear previous results
    
    songs.forEach(song => {
        const li = document.createElement('li');
        li.className = 'song-item';

        // Get album image, song name, and artist name
        const albumImage = song.album.images[0]?.url || ''; 
        const songName = song.name;
        const artistName = song.artists[0].name;

        li.innerHTML = `
            <img src="${albumImage}" alt="Album Art" class="album-art">
            <div class="song-info">
                <p>${songName}</p>
                <p>by ${artistName}</p>
            </div>
        `;

        // Play preview on click
        li.addEventListener('click', () => {
            document.getElementById('audio').src = song.preview_url;
            document.getElementById('audio').play();
        });

        songList.appendChild(li);
    });
}

// Event listener for search
document.getElementById('searchButton').addEventListener('click', async () => {
    const query = document.getElementById('searchInput').value;
    const songs = await searchSongs(query);
    displaySongs(songs);
});

// Load default songs on page load
window.onload = async () => {
    const defaultSongs = await searchSongs('Top Hits'); // You can change 'Top Hits' to any default search term
    displaySongs(defaultSongs);
};