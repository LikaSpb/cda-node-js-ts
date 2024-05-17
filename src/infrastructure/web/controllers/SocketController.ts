import { Socket } from "socket.io";

// Fonction (controller) pour envoyer un message
export const sendMessage = (socket: Socket, data: { message: string }) => {
  console.log(`Message reçu : ${data.message}`);
  socket.broadcast.emit("message", data); // Émettre le message à tous les clients connectés sauf l'émetteur
};

// Fonction (controller) pour rejoindre une salle
export const joinRoom = (socket: Socket, room: string) => {
  console.log(`Rejoindre la salle : ${room}`);
  socket.join(room);
  socket
    .to(room)
    .emit("message", { message: `Un utilisateur a rejoint la salle ${room}` });
};
