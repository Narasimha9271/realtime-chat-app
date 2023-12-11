# Understanding Socket.IO: Building a simple real-time chat app with Node.js and Socket.IO

Traditional web applications primarily used the HTTP request-response model, where clients sent requests to servers, and servers responded with data. However, implementing real-time features like live chat, notifications, collaborative tools, etc, was challenging. Developers had to resort to workarounds like long polling (repeatedly sending requests) or plugins such as Flash, to achieve real-time communication.

WebSockets changed the game by enabling constant, low-delay communication between clients and servers, breaking away from the old request-response model.

Socket.IO was introduced with the aim of simplifying real-time communication between servers and clients on the web. Socket.IO is built on top of WebSockets and allows developers to create real-time applications without worrying about low-level networking details.

**Bidirectional Communication**

In this communication flow clients can emit events to the server and listen for events from the server. Likewise, the server can emit events to the clients and listen for events from them, enabling real-time bidirectional communication.

Socket.IO communication can also extend between servers (server-to-server) which is valuable for microservices and distributed applications that require real-time interactions.

---

**Express** - This is used to create REST API and helps manage routes in our application.
**Socket.IO** - is a library that enables real-time, bidirectional, and event-based communication between the client and the server.
