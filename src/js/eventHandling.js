// local storage 
export const profileData = JSON.parse(localStorage.getItem("uploadProfile")) || { name: "Daniel Haribo" , image: "https://images.unsplash.com/photo-1687360440984-3a0d7cfde903?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60"};

//import
import { displayUserProfile} from "./domManipulation";

const profileModal = document.getElementById("profile-modal");
const profileNameInput = document.getElementById("upload-profile-name");
const ProfilePicInput = document.getElementById("upload-profile-pic-input");
export const profilePicture = document.getElementById("upload-profile-pic");


document.body.addEventListener("click", (e) => {
    let targetElement = e.target;
    if (targetElement.closest(".user-profile-detail")) {
        profileModal.style.display = "block";
    }
    if (targetElement.closest("#save-profile-btn")) {
        if(profileNameInput.value !== "" ){
            profileData.name = profileNameInput.value;
        }
        profileData.image = profilePicture.src;
        localStorage.setItem('uploadProfile', JSON.stringify(profileData));
        displayUserProfile(profileData);
        profileNameInput.value = "";

    }
    if (targetElement.closest("#cancel-profile-btn")) {
        profileModal.style.display = "none";
        profileNameInput.value = "";
    }
})

ProfilePicInput.addEventListener("change", (e) => {
    let file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
        profilePicture.src = e.target.result;
    }
    fileReader.readAsDataURL(file);
})

displayUserProfile(profileData);





