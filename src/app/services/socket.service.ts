import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket = io('http://localhost:8000');
  private dataSubject = new BehaviorSubject<any>({ gasto: [], venta: [] });

  constructor() {
    this.socket.on('data', (data) => {
      this.dataSubject.next(data);
    });
  }

  getSocketData(): Observable<any> {
    return this.dataSubject.asObservable();
  }
}
