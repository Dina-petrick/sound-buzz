//import
import { getDataUrl, saveProfile, previewProfile, cancelPreviewProfile, toggleList, hideList, toggleFavorite , 
    togglePlay, updatePlaylistCardIcons, updateProgressBar, handleVolumeChange, playNextSong, playPreviousSong, checkCurrentSong
} from "./domManipulation";

const sidebar = document.getElementById("sidebar");
const profilePicInput = document.getElementById("upload-profile-pic-input");
const playlist = document.getElementById("homepage-container");
const favoriteList = document.getElementById("favorite-container");
const artistCardList = document.getElementById("artist-card-list");



sidebar.addEventListener("click", (e) => {
    const targetElement = e.target.id;
    switch (targetElement) {
        case "profile-update-btn":
            previewProfile();
            break;

        case "save-profile-btn":
            saveProfile();
            break;

        case "profile-modal":
            cancelPreviewProfile();
            break;

        case "cancel-profile-btn":
            cancelPreviewProfile();
            break;

        case "library-list":
            toggleList(favoriteList, playlist);
            break;

        case "favorites-list":
            toggleList(playlist, favoriteList);
            break;

        case "playlist-list":
        case "artist-list":
        case "album-list":
            hideList(playlist, favoriteList);
            break;
    }
})

artistCardList.addEventListener("click", (e) => {
    const artistCardItem = e.target.closest(".artist-card-item");
    if (!artistCardItem) return;
    const index = artistCardItem.getAttribute("data-index");

    if(e.target.classList.contains("artist-card-heart")){
        toggleFavorite(e, index);
    }
})


profilePicInput.addEventListener("change", (e) => {
    getDataUrl(e);
})



 
const recentPlaylist = document.getElementById('recent-playlist-list');
const musicBar = document.getElementById("music-player");
const audio = document.getElementById('audio-player');
const volumeRange = document.getElementById('volume-range');

recentPlaylist.addEventListener('click', (e) => {
  const recentPlaylistItem = e.target.closest('.recent-playlist-item');
  if (!recentPlaylistItem) return;

  const songIndex = recentPlaylistItem.getAttribute('data-song-index');
  if (e.target.classList.contains('recent-playlist-play-btn')) {
    checkCurrentSong(songIndex)
  }

  updatePlaylistCardIcons();
});


musicBar.addEventListener("click", (e) => {
    const targetElement = e.target.id;
    switch(targetElement){
        case "play-button" : 
        togglePlay();
        break;

        case "next-button" : 
        playNextSong();
        break;

        case "previous-button" : 
        playPreviousSong();
        break;
    }
})

audio.addEventListener('timeupdate', ()=>{
    updateProgressBar();
});
volumeRange.addEventListener('input', ()=>{
    handleVolumeChange();
});



