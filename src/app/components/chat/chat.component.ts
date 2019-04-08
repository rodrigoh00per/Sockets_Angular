import { Component, OnInit } from "@angular/core";
import { ChatService } from "src/app/services/chat.service";
import { Subscription } from "rxjs";
import { WebsocketService } from "src/app/services/websocket.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit {
  texto: String;
  mensajes: any[];
  elemento: HTMLElement;
  mensajesSubscription: Subscription;

  constructor(
    private _chatService: ChatService,
    private _wsService: WebsocketService
  ) {
    this.mensajes = [];
    this.texto = "";
  }

  ngOnInit() {
    this.elemento = document.getElementById("chat-mensajes");
    this.mensajesSubscription = this._chatService
      .getMessages()
      .subscribe(mnsj => {
        console.log(mnsj);
        this.mensajes.push(mnsj);
        setTimeout(() => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 50);
      });
  }

  enviar() {
    if (this.texto != "") {
      console.log(this.texto);
      this._chatService.sendMessage(this.texto);
      this.texto = "";
    }
  }
  ngOnDestroy() {
    this.mensajesSubscription.unsubscribe();
  }
  salir() {
    this._wsService.logOut();
  }
}
