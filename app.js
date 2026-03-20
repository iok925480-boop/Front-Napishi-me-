const BACKEND_URL = "https://backend-napishime.vercel.app";

let username = prompt("Username");
let currentChat = "";
let usersList = [];

const socket = io(BACKEND_URL);

socket.emit("login", username);

socket.on("online", (users) => {
  usersList = users;
  renderUsers();
});

socket.on("message", (msg) => {
  addMessage(msg.content, false);
});

function renderUsers() {
  users.innerHTML = "";

  usersList.forEach(u => {
    if (u === username) return;

    users.innerHTML += `<div onclick="openChat('${u}')">${u}</div>`;
  });
}

function openChat(u) {
  currentChat = u;
  messages.innerHTML = "";
}

function send() {
  const text = msg.value;

  socket.emit("send", {
    from: username,
    to: currentChat,
    content: text
  });

  addMessage(text, true);
}

function addMessage(text, mine) {
  messages.innerHTML += `
    <div style="text-align:${mine ? "right" : "left"}">
      ${text}
    </div>
  `;
}
