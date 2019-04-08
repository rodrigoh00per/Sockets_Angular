import { Component, OnInit } from "@angular/core";
import { WebsocketService } from "src/app/services/websocket.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  nombre: String;
  constructor(private _wsService: WebsocketService, private _router: Router) {
    this.nombre = "";
  }

  ngOnInit() {}
  ingresar() {
    this._wsService.loginWS(this.nombre).then(() => {
      this._router.navigate(["/mensajes"]);
    });
  }
}
