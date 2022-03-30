const socket = io('http://localhost:8000');

const form = document.getElementById('sender');
const message = document.getElementById('inp');
const messageContainer = document.querySelector('.container');
let user = prompt('Welcome! Enter your name to join the chat');
while (user===null || user==="") user = prompt('Welcome! Enter your name to join the chat');
socket.emit('newUserJoined', user);

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log(message);
    const text = message.value;
    append(`${text}`, 'right');
    socket.emit('send', text);
    message.value = "";
});
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message; 
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
};
socket.on('userJoined', data =>{
     append(`${data} joined the chat!`, 'left');
});
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`,'left');
});

socket.on('left', (data) =>{
    append(`${data} left the chat.`, 'left');
});