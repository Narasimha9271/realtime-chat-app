//setting up our client-side application to communicate with our server using Socket.IO.

//These references(to HTML elements) allow us to manipulate these elements from JavaScript.
const messageform = document.querySelector(".chatbox form");
const messageList = document.querySelector("#messagelist");
const userList = document.querySelector("ul#users");
const chatboxinput = document.querySelector(".chatbox input");

//initialize a Socket.IO connection to a server running at http://localhost:5000.
//The client will use this connection to send and receive real-time messages.
const socket = io("http://localhost:5000");

let users = []; //for connected users
let messages = []; // to store chat msgs
let isUser = ""; // to store the name of the current user.

//socket.on("message", message): This event listener listens for “message” events sent by the server.
socket.on("message", (message) => {
    messages.push(message);
    updateMessages();
});

//to listen for "private" events and when this event is received, isUser is updated with the name of the sender
socket.on("private", (data) => {
    isUser = data.name;
});

//to listen for users events
socket.on("users", function (_users) {
    users = _users;
    updateUsers(); //clears the existing list and iterates through our users array to create list items for each user.
});

messageform.addEventListener("submit", messageSubmitHandler);

function updateUsers() {
    userList.textContent = "";
    for (let i = 0; i < users.length; i++) {
        var node = document.createElement("LI");
        var textnode = document.createTextNode(users[i]);
        node.appendChild(textnode);
        userList.appendChild(node);
    }
}

function updateMessages() {
    messageList.textContent = "";
    for (let i = 0; i < messages.length; i++) {
        const show = isUser === messages[i].user ? true : false;
        messageList.innerHTML += `<li class=${show ? "private" : ""}>
                    <p>${messages[i].user}</p>
                    <p>${messages[i].message}</p>
                    </li>`;
    }
}

//sends the message to the server using Socket.IO, and clears the input field.
function messageSubmitHandler(e) {
    e.preventDefault();
    let message = chatboxinput.value;
    socket.emit("message", message);
    chatboxinput.value = "";
}

function userAddHandler(user) {
    userName = user || `User${Math.floor(Math.random() * 1000000)}`;
    socket.emit("adduser", userName);
}

userAddHandler();
