import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { Usuario } from "../models/usuario";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class WebsocketService {
  socketStatus: boolean;
  usuario: Usuario;

  constructor(private socket: Socket, private _router: Router) {
    this.socketStatus = false;

    this.checkStatus();
    this.cargarStorage();
  }

  checkStatus() {
    this.socket.on("connect", () => {
      console.log("Conectado al servidor");
      this.socketStatus = true;
      this.cargarStorage(); //se vuelve a poner el localStorage en caso de que  se caiga el server
    }); //con esto verificamos si el servidor esta arriba o no

    this.socket.on("disconnect", () => {
      console.log("Desconectado del servidor");
      this.socketStatus = false;
    });
  }
  //este es un evento generico encargo de emitir eventos al back
  emit(evento: string, payload?: any, callback?: Function) {
    this.socket.emit(evento, payload, callback); //estamos aqui emitiendo el evento al backend
  }
  //este es para escuchar los eventos que nos manden apartir del backend
  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }
  //este vamos a mandar los datos para configurar el nombre.
  loginWS(nombre: String): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log("configurando usuario:", nombre);
      /* this.socket.emit("configurar-usuario", { nombre }, resp => {
   console.log(resp);
 }); */
      this.emit("configurar-usuario", { nombre }, resp => {
        console.log(resp);
        this.usuario = new Usuario(nombre);
        this.guardarStorage();
        resolve();
      });
    });
  }
  logOut() {
    this.usuario = null;
    localStorage.removeItem("usuario");
    this.emit("configurar-usuario", { nombre: "sin-nombre" }, resp => {
      this.guardarStorage();
      this._router.navigate([""]);
    });
  }
  guardarStorage() {
    localStorage.setItem("usuario", JSON.stringify(this.usuario));
    console.log("GUARDADO EN EN STORAGE");
  }
  cargarStorage() {
    if (localStorage.getItem("usuario")) {
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      this.loginWS(this.usuario.nombre);
    }
  }
  regresarUsuario() {
    return this.usuario;
  }

  usuariosActivos() {
    this.emit("clientes-conectados");
  }
}
