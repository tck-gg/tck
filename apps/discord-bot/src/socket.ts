import { Server } from 'socket.io';
import { Giveaway } from 'database';

import {
  sendDeletedGiveawayNotification,
  sendNewGiveawayNotification
} from './functions/notifications';

export function initSocket() {
  const io = new Server(8009);

  io.on('connection', (socket) => {
    socket.on('newGiveaway', (giveaway: Giveaway) => {
      sendNewGiveawayNotification(giveaway);
    });
    socket.on('deleteGiveaway', (giveaway: Giveaway) => {
      sendDeletedGiveawayNotification(giveaway);
    });
  });
}
