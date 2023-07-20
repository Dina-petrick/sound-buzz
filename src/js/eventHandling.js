//import
import {getDataUrl, saveProfile, PreviewProfile, cancelPreviewProfile, toggleList, hideList} from "./domManipulation";

const sidebar = document.getElementById("sidebar");
const profilePicInput = document.getElementById("upload-profile-pic-input");

const playlist = document.getElementById("homepage-container");
const favoriteList = document.getElementById("favorite-container");

sidebar.addEventListener("click", (e) => {
    const targetElement = e.target.id;
    switch (targetElement) {
        case "profile-update-btn":
            PreviewProfile();
            break;

        case "save-profile-btn":
            saveProfile();
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
            hideList(playlist,favoriteList);
            break;
    }
})


profilePicInput.addEventListener("change", (e) => {
    getDataUrl(e);
})


