import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[HttpClientModule]
})
export class AppComponent implements OnInit{
  title = 'livetime';

  private _hubConnection: HubConnection;
  timestamps: any[] = []

   constructor( private http: HttpClientModule) { }

  ngOnInit(): void {
    this._hubConnection = new HubConnectionBuilder().withUrl('http://minisignalserver-dev.sa-east-1.elasticbeanstalk.com/chat').build()
    this._hubConnection.start()
    .then(()=> console.log('connection started'))
    .catch(err => console.log('error'))

    this._hubConnection.on('Streaming', (message)=> {
      console.log(message.body)
      this.timestamps.push(message)
    })

    this._hubConnection.onclose(()=>{console.log(':(')})
  }
      
}
