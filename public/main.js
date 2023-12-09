const socket = io();
let username;

function enterChat() {
    const usernameInput = document.getElementById('username-input');
    username = usernameInput.value.trim();

    if (username !== '') {
        document.getElementById('username-page').style.display = 'none';
        document.getElementById('chat-container').style.display = 'block';
        socket.emit('user joined', username);
    }
}

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();

    if (message !== '') {
        socket.emit('chat message', { username, message });
        messageInput.value = '';
    }
}

socket.on('user joined', (user) => {
    const messagesList = document.getElementById('messages');
    const li = document.createElement('li');
    li.textContent = `${user} has joined the chat`;
    messagesList.appendChild(li);
});

socket.on('chat message', (msg) => {
    const messagesList = document.getElementById('messages');
    const li = document.createElement('li');
    li.textContent = `${msg.username}: ${msg.message}`;
    messagesList.appendChild(li);
});
