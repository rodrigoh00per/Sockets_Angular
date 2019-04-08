import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { WebsocketService } from "../services/websocket.service";

@Injectable({
  providedIn: "root"
})
export class UsuarioGuard implements CanActivate {
  constructor(private wsService: WebsocketService,private _router:Router) {}
  canActivate() {
    if (this.wsService.regresarUsuario()) {
      return true;
    } else {
      console.log("entre");
      this._router.navigate([""]);
      return false;
    }
  }
}
