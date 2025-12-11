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
        alert("Login successful!");
        window.location.href = "home.html";
    } else {
        alert("Invalid username or password");
    }
}

// Logout
function logout() {
    alert("Logged out!");
    window.location.href = "index.html";
}