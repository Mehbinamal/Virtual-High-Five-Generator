// Clear localStorage when the page is loaded
window.addEventListener('load', () => {
    localStorage.removeItem('users');
});

let users = {
    // Adding two default users that will appear for every new user
    "Alice": { highFives: 0, profilePicture: 'images/alice.png' },
    "Bob": { highFives: 0, profilePicture: 'images/bob.png' }
};
let currentUser = null;

// Function to render users
function renderUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    for (const username in users) {
        const user = users[username];

        const listItem = document.createElement('li');
        listItem.classList.add('user-item');

        // Profile picture
        const userIcon = document.createElement('img');
        userIcon.src = user.profilePicture || 'images/default-profile.png'; // Default image if none uploaded
        userIcon.alt = `${username}'s profile picture`;
        userIcon.classList.add('user-icon');

        // User details
        const userDetails = document.createElement('div');
        userDetails.innerHTML = `<strong>${username}</strong><br> High-Fives: ${user.highFives}`;
        userDetails.classList.add('user-details');

        // High-Five button for other users
        if (username !== currentUser) {
            const highFiveBtn = document.createElement('button');
            highFiveBtn.textContent = 'High-Five 🖐';
            highFiveBtn.classList.add('highfiveBtn');
            highFiveBtn.onclick = () => giveHighFive(username);
            userDetails.appendChild(highFiveBtn);
        }

        listItem.appendChild(userIcon);
        listItem.appendChild(userDetails);
        userList.appendChild(listItem);
    }
}

// Function to give a high-five
function giveHighFive(username) {
    // Play high-five sound
    const highFiveSound = document.getElementById('highFiveSound');
    highFiveSound.play();

    users[username].highFives += 1;
    renderUsers();
}

// Function to handle image upload and convert to base64
function handleImageUpload(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Function to log in
async function login() {
    const username = document.getElementById('username').value.trim();
    const profilePictureInput = document.getElementById('profilePicture');

    if (username) {
        currentUser = username;

        // Process profile picture if provided
        let profilePicture = '';
        if (profilePictureInput.files.length > 0) {
            profilePicture = await handleImageUpload(profilePictureInput.files[0]);
        }

        // Add or update user
        if (!users[username]) {
            users[username] = { highFives: 0, profilePicture };
        } else if (profilePicture) {
            users[username].profilePicture = profilePicture;
        }

        // Update UI
        document.querySelector('.login-container').style.display = 'none';
        document.getElementById('app').style.display = 'block';
        document.getElementById('currentUser').textContent = username;
        renderUsers();
    }
}

// Function to log out
function logout() {
    currentUser = null;
    document.getElementById('username').value = ''; // Clear username input
    document.getElementById('profilePicture').value = ''; // Clear profile picture input
    document.querySelector('.login-container').style.display = 'block';
    document.getElementById('app').style.display = 'none';
}

// Event listeners for login and logout
document.getElementById('loginBtn').addEventListener('click', login);
document.getElementById('logoutBtn').addEventListener('click', logout);
