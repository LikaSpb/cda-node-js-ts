import { Server } from "socket.io";
import { joinRoom, sendMessage } from "../controllers/SocketController";
import { authenticateSocket } from "../../../utils/socketCookies";

export function setupSocketEvent(io: Server) {
  io.on("connection", (socket) => {
    console.log(`Nouvelle connexion : ${socket.id}`);

    const userId = authenticateSocket(socket);
    if (!userId) return;

    socket.on("sendMessage", (data) => {
      sendMessage(socket, data);
    });

    socket.on("joinRoom", (room) => {
      joinRoom(socket, room);
    });

    socket.on("disconnect", () => {
      console.log(`Déconnexion : ${socket.id}`);
    });
  });
}
