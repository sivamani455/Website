// Register User
function register() {
    let user = document.getElementById("regUser").value;
    let pass = document.getElementById("regPass").value;

    if (user === "" || pass === "") {
        alert("Please fill all fields");
        return;
    }

    localStorage.setItem("username", user);
    localStorage.setItem("password", pass);

    alert("Registration successful!");
    window.location.href = "index.html";
}

// Login User
function login() {
    let user = document.getElementById("loginUser").value;
    let pass = document.getElementById("loginPass").value;

    let storedUser = localStorage.getItem("username");
    let storedPass = localStorage.getItem("password");

    if (user === storedUser && pass === storedPass) {
        window.location.href = "home.html";
    } else {
        alert("Invalid username or password");
    }
}

// Logout
function logout() {
    window.location.href = "index.html";
}

// --------- UPLOAD LOGIC -----------

function uploadMedia() {
    let input = document.getElementById("uploadInput");
    let file = input.files[0];

    if (!file) {
        alert("Please select a file.");
        return;
    }

    let reader = new FileReader();
    reader.onload = function(e) {
        let fileData = {
            name: file.name,
            type: file.type,
            data: e.target.result
        };

        // Categorize file type
        if (file.type.startsWith("image/")) {
            saveToFolder("photosList", fileData);
        } else if (file.type.startsWith("video/")) {
            saveToFolder("videosList", fileData);
        } else {
            saveToFolder("filesList", fileData);
        }

        displayMedia();
        alert("File uploaded successfully!");
    };

    reader.readAsDataURL(file);
}

function saveToFolder(folderName, fileData) {
    let arr = JSON.parse(localStorage.getItem(folderName)) || [];
    arr.push(fileData);
    localStorage.setItem(folderName, JSON.stringify(arr));
}

// Display uploaded files
function displayMedia() {
    showList("filesList", "fileList");
    showList("photosList", "photoList");
    showList("videosList", "videoList");
}

function showList(storageKey, elementId) {
    let list = JSON.parse(localStorage.getItem(storageKey)) || [];
    let ul = document.getElementById(elementId);
    ul.innerHTML = "";

    list.forEach(item => {
        let li = document.createElement("li");
        li.innerHTML = `<a href="${item.data}" target="_blank">${item.name}</a>`;
        ul.appendChild(li);
    });
}

// Load lists on home page
if (window.location.pathname.includes("home.html")) {
    displayMedia();
}
