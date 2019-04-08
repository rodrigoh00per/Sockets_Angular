import { Injectable } from "@angular/core";
import { WebsocketService } from "./websocket.service";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  constructor(private _wsService: WebsocketService) {}

  sendMessage(mensaje: String) {
    let payload = {
      de: this._wsService.regresarUsuario().nombre,
      cuerpo: mensaje
    };

    this._wsService.emit("mensaje", payload);
  }
  //aqui recuperamos todos los mensajes que se estan mandando
  getMessages() {
    return this._wsService.listen("mensaje-nuevo");
  }
  getMensajePrivado() {
    return this._wsService.listen("mensaje-privado");
  }
  getUsuariosActivos() {
    return this._wsService.listen("usuarios-activos");
  }
}
