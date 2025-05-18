import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { BandsService } from '../bands/bands.service';
import { UpdateBanDto } from './dtos/update-band.dto';
import { CreateBandDto } from '../bands/dto/create-band.dto';

@WebSocketGateway({ cors: true, namespace: 'messages' })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly bandsService: BandsService,
  ) {}

  public handleConnection(client: Socket) {
    console.log(`Client ${client.id} connected!`);

    // Emitiendo al cliente en react con todas las bandas conectadas
    this.wss.emit('bands-list-from-server', this.bandsService.findAll());
  }

  public handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected!`);
  }

  @SubscribeMessage('on-vote-by-band')
  onVoteByBand(client: Socket, payload: string) {
    console.log(`Client ${client.id} with id band ${payload} is voting!`);
    this.bandsService.increaseBandVotes(payload);

    // Emitiendo de nuevo la lista de bands actualizada con los nuevos votos a todos los clientes
    this.wss.emit('bands-list-from-server', this.bandsService.findAll());
  }

  @SubscribeMessage('on-delete-band')
  onDeleteBand(client: Socket, payload: string) {
    console.log(`Client ${client.id} with id band ${payload} is deleted`);
    this.bandsService.remove(payload);

    // Emitiendo la lista nueva sin la banda borrada
    this.wss.emit('bands-list-from-server', this.bandsService.findAll());
  }

  @SubscribeMessage('on-change-band')
  onChangeBand(client: Socket, payload: UpdateBanDto) {
    console.log(
      `${client.id}  Updating band ${payload.id} with ${payload.name} name!`,
    );
    this.bandsService.update(payload.id, { name: payload.name });

    // Emitiendo la lista despues de cambiar el nombre a una banda
    this.wss.emit('bands-list-from-server', this.bandsService.findAll());
  }

  @SubscribeMessage('on-add-new-band')
  onAddNewBand (client: Socket, payload: CreateBandDto) {
    console.log(`Client ${client.id} is adding ${payload.name} band!`);

    this.bandsService.create(payload);

    // Emitiendo la lista depues de crear un nuevo band
    this.wss.emit('bands-list-from-server', this.bandsService.findAll());
  }
}
