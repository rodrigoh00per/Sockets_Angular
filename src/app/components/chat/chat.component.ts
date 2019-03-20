import { Component, OnInit } from "@angular/core";
import { ChatService } from "src/app/services/chat.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit {
  texto: String;
  mensajes: any[];
  elemento: HTMLElement;
  constructor(private _chatService: ChatService) {
    this.mensajes = [];
  }

  ngOnInit() {
    this.elemento = document.getElementById("chat-mensajes");
    this._chatService.getMessages().subscribe(mnsj => {
      this.mensajes.push(mnsj);
      console.log(mnsj);
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
}
