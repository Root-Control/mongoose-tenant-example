import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import * as socketIo from 'socket.io-client';

export class IoConnector {
    constructor(private readonly url: string) {
    }

    sendMessage() {
        const socket = socketIo(this.url);
        console.log('initializing socket');
        socket.on('connect', () => console.log('connected'));
        socket.on('messages', (messages: any) => {
            console.log('Message from external server');
            console.log(messages);
            socket.disconnect();
        });
    }
}
