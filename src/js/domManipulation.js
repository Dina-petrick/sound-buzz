const profileData = JSON.parse(localStorage.getItem("uploadProfile")) || { name: "Daniel Haribo" , image: "https://images.unsplash.com/photo-1687360440984-3a0d7cfde903?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60"};
const artistCardList = document.querySelector('.artist-card-list');
const playListCardList = document.querySelector('.playlist-card-list');
const recentPlayList = document.querySelector('.recent-playlist-list');
const artistList = document.querySelector('.artist-list');
const profileModal = document.getElementById("profile-modal");
const displayUsername = document.getElementById("artist-card-greet");
const profileNameElement = document.getElementById("user-profile-name");
const profilePictureElement = document.getElementById("user-profile-picture");
const profileNameInput = document.getElementById("upload-profile-name");
const previewProfilePic = document.getElementById("upload-profile-pic");
const favoriteList = document.getElementById('favorite-list');


const getData = async () => {
    const url = "https://raw.githubusercontent.com/Dina-petrick/musicData/main/db.json";
    const response = await fetch(url);
    const data = await response.json();
    localStorage.setItem('fetchedData', JSON.stringify(data));
}

const createArtistCard = (data, index) => {
    const artistCardItem = document.createElement("li");
    artistCardItem.className = "artist-card-item";
    artistCardItem.setAttribute("data-index", index);
    artistCardItem.innerHTML = `
        <div class="artist-card-info">
            <img class="artist-card-img" src="${data.artistImage}" alt="artist">
            <div class="artist-card-details">
            <h4 class="fw-600 fs-20">${data.title}</h4>
            <small class="fw-400 fs-14">${data.artist}</small>
        </div>
        <span class="artist-card-stats">${index + 1}</span>
        </div>
        <div class="artist-card-heart-wrap">
            <span class="artist-card-heart fav-artist"><i class="fa-regular fa-heart heart-icon"></i></span>
        </div>
    `;
    return artistCardItem;
}

const artistCard = (dataList) => {
    dataList.forEach((data, index) => {
        const artistCardItem = createArtistCard(data, index);
        artistCardList.appendChild(artistCardItem);
    })
}

const createPlaylistCard = (dataList) => {
    dataList.forEach((data) => {
        const playListCard = document.createElement("li");
        playListCard.className = "playlist-card-item";
        playListCard.innerHTML = `
            <img class="playlist-card-img" src="${data.playlistBgImage}" alt="artist">
            <span class="playlist-card-overlay"></span>
            <div class="playlist-card-info">
                <div class="playlist-card-title">${data.title}</div>
                <span class="playlist-card-play-icon"><i class="fa-solid fa-play"></i></span>
                <div class="playlist-card-detail">
                    <h4 class="playlist-card-detail-heading">${data.heading}</h4>
                    <p class="playlist-card-detail-desc">${data.description}</p>
                </div>
            </div>
        `;
        playListCardList.appendChild(playListCard);
    })
}

const createRecentPlaylistItem = (dataList) => {

    let shufflePlaylist = shuffleData(dataList) 
    shufflePlaylist.forEach((data) => {
        const recentPlaylistItem = document.createElement("li");
        recentPlaylistItem.className = "recent-playlist-item";
        recentPlaylistItem.innerHTML = `
            <img class="recent-playlist-img" src="${data.artistImage}" alt="artist">
            <div class="recent-playlist-details">
                <h3 class="fs-18 fw-500">${data.title}</h3>
                <span class="block fs-14 fw-500">${data.artist}</span>
                <small class="fs-14">${data.studio} . ${data.year}</small>
            </div>
            <div class="recent-playlist-controls">
                <small>${data.duration}</small>
                <span class="recent-playlist-play-btn">
                    <i class="fa-solid fa-play recent-playlist-play-icon text-primary-color"></i>
                </span>
            </div>
        `
        recentPlayList.appendChild(recentPlaylistItem);
    })
}

const createArtist = dataList => {
    dataList.forEach(data => {
        const artist = document.createElement('li');
        artist.className = "artist-item";
        artist.innerHTML = `
            <img class="artist-img" src="${data.artistImage}" alt="artist">
            <span class="artist-name">${data.artist}</span>
        `;
        artistList.appendChild(artist);
    })
}

const favoriteCard = (dataList) => {
    dataList.forEach((data, index) => {
        const artistCardItem = createArtistCard(data, index);
        favoriteList.appendChild(artistCardItem);
    })
}


const shuffleData = (data) => {
    const shuffledArr = data.slice();
    for(let i= shuffledArr.length - 1; i > 0; i--){
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffledArr[i], shuffledArr[randomIndex]] = [shuffledArr[randomIndex], shuffledArr[i]]
    }
    return shuffledArr;
}


export const getDataUrl = (e) => {
    let file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
        previewProfilePic.src = e.target.result;
    }
    fileReader.readAsDataURL(file);
    console.log("saveProfile function called");

}

export const displayUserProfile = (data) => {
    profileNameElement.textContent = data.name;
    displayUsername.textContent = `Hello ${data.name}`;
    if (data.image) {
        profilePictureElement.src = data.image;
    }
}
export const saveProfile = () =>{
    if(profileNameInput.value !== "" ){
        profileData.name = profileNameInput.value;
    }
    profileData.image = previewProfilePic.src;
    localStorage.setItem('uploadProfile', JSON.stringify(profileData));
    profileNameInput.value = "";
    displayUserProfile(profileData);

}

export const PreviewProfile = () => {
    profileModal.style.display = "block";
    previewProfilePic.src = profileData.image;
}

export const cancelPreviewProfile = () => {
    profileModal.style.display = "none";
    profileNameInput.value = "";
}

export const displayFetchedData =(data)=> {
    artistCard(data.musicData);
    createPlaylistCard(data.playlistData);
    createRecentPlaylistItem(data.musicData);
    createArtist(data.musicData);
}


export const toggleList = (show, hidden) => {
    show.classList.add("hidden");
    hidden.classList.remove("hidden");
}

export const hideList = (library, favorite) =>{
    library.classList.add("hidden");
    favorite.classList.add("hidden");
}

await getData();
const dataFetched = JSON.parse(localStorage.getItem("fetchedData"));
displayFetchedData(dataFetched);
displayUserProfile(profileData);



