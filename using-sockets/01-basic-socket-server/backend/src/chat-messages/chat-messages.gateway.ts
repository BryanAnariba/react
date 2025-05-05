import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatMessagesService } from './chat-messages.service';
import { Server, Socket } from 'socket.io';
import { ClientMessageDto } from './dtos/ClientMessageDto';

@WebSocketGateway({ cors: true, namespace: 'chat-messages' })
export class ChatMessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(private readonly chatMessagesService: ChatMessagesService) {}

  handleConnection(client: Socket) {
    console.log('Client ' + client.id + ' connected!');
    // this.wss.emit('welcome-message', { message: 'Welcome to server!', date: new Date().toDateString() });
  }

  handleDisconnect(client: Socket) {
    console.log('Client ' + client.id + ' disconnected!');
  }

  // Aqui recibimos el setTimeout del cliente con el mensaje y lo emitimos a todos los clientes
  @SubscribeMessage('client-message')
  onMessageFromClient(client: Socket, payload: ClientMessageDto) {
    console.log('Message from client ' + client.id + ' received!, payload:', payload);
  }

  // La casilla del chat cuando se da enter se envía el mensaje al servidor y el servidor lo emite a todos los clientes
  @SubscribeMessage("chat-message-from-client")
  onChatMessageFromClient(client: Socket, payload: {message: string}) {
    console.log(`Client ${client.id} sent a message: `, payload);

    // Este emite el mensaje a todos los clientes conectados, incluyendo al que lo envio
    this.wss.emit("message-from-server", payload);
  }

}
