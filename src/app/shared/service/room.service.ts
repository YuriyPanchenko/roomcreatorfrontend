import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Room} from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private baseUrl = 'http://localhost:8080/rooms';
  message: any;
  constructor(private http: HttpClient) { }

  getRoom(id: number): Observable<Object> {
    return this.message = this.http.get(`${this.baseUrl}/${id}`);
  }

  createRoom(room: Room): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, room, {responseType: 'text'});
  }

  updateRoom(id: number, room: Room): Observable<Object> {
    return this.message = this.http.put(`${this.baseUrl}/${id}`, room);
  }

  deleteRoom(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getRoomList(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}
