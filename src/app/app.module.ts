import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { environment } from "../environments/environment";
import { FooterComponent } from "./components/footer/footer.component";
import { ChatComponent } from "./components/chat/chat.component";

const config: SocketIoConfig = { url: environment.wsUrl, options: {} };

@NgModule({
  declarations: [AppComponent, FooterComponent, ChatComponent],
  imports: [BrowserModule, SocketIoModule.forRoot(config), FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
