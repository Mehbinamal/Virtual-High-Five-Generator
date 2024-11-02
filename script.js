// Initialize users from local storage or create an empty object
let users = JSON.parse(localStorage.getItem('users')) || {};
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
        userIcon.src = user.profilePicture || 'default-profile.png'; // Fallback to a default image
        userIcon.alt = `${username}'s profile picture`;
        userIcon.classList.add('user-icon');

        // User details
        const userDetails = document.createElement('div');
        userDetails.innerHTML = `<strong>${username}</strong> <br> High-Fives: ${user.highFives}`;
        userDetails.classList.add('user-details');

        // High-Five button
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
    users[username].highFives += 1;
    localStorage.setItem('users', JSON.stringify(users));
    renderUsers();
}

// Function to handle image upload and conversion to base64
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

        // Add user to "database" if not present
        if (!users[username]) {
            users[username] = { highFives: 0, profilePicture };
        }

        localStorage.setItem('users', JSON.stringify(users));

        // Show app and render users
        document.querySelector('.login-container').style.display = 'none';
        document.getElementById('app').style.display = 'block';
        document.getElementById('currentUser').textContent = username;
        renderUsers();
    }
}

// Function to log out
function logout() {
    currentUser = null;
    document.querySelector('.login-container').style.display = 'block';
    document.getElementById('app').style.display = 'none';
}

// Event listeners for login and logout
document.getElementById('loginBtn').addEventListener('click', login);
document.getElementById('logoutBtn').addEventListener('click', logout);
