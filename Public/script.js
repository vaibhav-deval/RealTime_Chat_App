const socket = io();
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const messagesDiv = document.getElementById('messages');

const username = prompt('Enter your username:') || 'Anonymous';

socket.emit('user-joined', username);

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('chat-message', { username, message });
        appendMessage('sent', username, message);
        messageInput.value = '';
    }
});

socket.on('chat-message', ({ username, message }) => {
    appendMessage('received', username, message);
});

socket.on('user-joined', (username) => {
    appendMessage('received', 'System', `${username} joined the chat`);
});

function appendMessage(type, user, msg) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    messageElement.textContent = `${user}: ${msg}`;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}