import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'livetime';

  private _hubConnection: HubConnection;
  timestamps: any[] = []

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this._hubConnection = new HubConnectionBuilder().withUrl('http://minis-recip-1g7wbwmng111p-48375700.sa-east-1.elb.amazonaws.com/chat').build()
    this._hubConnection.start()
    .then(()=> console.log('connection started'))
    .catch(err => console.log('error'))

    this._hubConnection.on('BroadcastMessage', (message)=> {
      this.timestamps.push(message)
    })
      
  }
}
