import { Component, OnInit } from "@angular/core";
import { ChatService } from "src/app/services/chat.service";
import { Observable } from "rxjs";
import { WebsocketService } from "src/app/services/websocket.service";

@Component({
  selector: "app-lista-usuarios",
  templateUrl: "./lista-usuarios.component.html",
  styleUrls: ["./lista-usuarios.component.css"]
})
export class ListaUsuariosComponent implements OnInit {
  usuariosActivosObs: Observable<any>;

  constructor(
    private _chatService: ChatService,
    private _wbSocketService: WebsocketService
  ) {}

  ngOnInit() {
    this.usuariosActivosObs = this._chatService.getUsuariosActivos();
    this._wbSocketService.usuariosActivos();
  }
}
