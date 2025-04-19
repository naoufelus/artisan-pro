// chat/chat.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../shared/web-socket.service';
import { MessageService } from '../messages/message.service';
import { ArtisanService } from '../artisans/artisans.service';
import { Artisan } from '../artisans/artisan.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  artisan: Artisan | null = null;
  messages: any[] = [];
  newMessage = '';
  clientName = '';

  constructor(
    private route: ActivatedRoute,
    private artisanService: ArtisanService,
    private webSocketService: WebSocketService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const artisanId = +this.route.snapshot.params['artisanId'];
    
    this.artisanService.getArtisan(artisanId).subscribe(
      artisan => {
        this.artisan = artisan;
        this.loadMessages(artisanId);
        this.setupWebSocket(artisanId);
      },
      error => console.error('Error loading artisan', error)
    );

    this.clientName = prompt('Veuillez entrer votre nom pour le chat:') || 'Anonyme';
  }

  loadMessages(artisanId: number): void {
    this.messageService.getMessages(artisanId).subscribe(
      messages => this.messages = messages,
      error => console.error('Error loading messages', error)
    );
  }

  setupWebSocket(artisanId: number): void {
    this.webSocketService.connect(artisanId.toString()).subscribe(
      (message: any) => {
        this.messages.push(message);
      }
    );
  }

  sendMessage(): void {
    if (this.newMessage.trim() && this.artisan) {
      const message = {
        artisanId: this.artisan.id,
        senderName: this.clientName,
        content: this.newMessage,
        timestamp: new Date()
      };

      this.webSocketService.sendMessage(message);
      this.messageService.createMessage(message).subscribe();
      this.newMessage = '';
    }
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect();
  }
}