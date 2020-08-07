import { Component, OnInit } from '@angular/core';
import {Room} from '../shared/models/room';
import {RoomService} from '../shared/service/room.service';
import {Point} from '../shared/models/point';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [RoomService],
})
export class RoomComponent implements OnInit {
  message: string = '';
  rooms: Observable<Room[]>
  countOfPoints = 4;
  room: Room;
  updatedRoom: Object;
  submitted = false;
  updateOrCreate = true;

  constructor(public roomService: RoomService) { }

  ngOnInit() {
    this.newRoom();
    this.reloadData();
  }

  newRoom(): void {
    this.submitted = false;
    this.room = new Room();
  }

  save() {
    this.message = '';
    this.roomService.createRoom(this.room)
        .subscribe( text => this.message += text.toString());
    console.log(this.message)
    this.newRoom();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  addNewPoint() {
    this.room.points.push(new Point());
    this.room.points.push(new Point());
    this.countOfPoints+=2;
  }

  removeNewPoint() {
    if(this.countOfPoints > 4){
      this.room.points.splice(this.countOfPoints - 1, 1);
      this.room.points.splice(this.countOfPoints - 2, 1);
      this.countOfPoints -=2;
    }
  }

  reloadData() {
    this.rooms = this.roomService.getRoomList();
  }

  deleteRoom(id: number) {
    this.roomService.deleteRoom(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  updateRoom(){
    this.roomService.updateRoom(this.room.id, this.room);
    this.room = new Room();
    this.countOfPoints = 4;
    this.updateOrCreate = true;
  }

  printGraph(id: number) {

  }

  onUpdate(room: Room) {
    this.updateOrCreate = false;
    this.countOfPoints = room.points.length;
    this.room = room;
  }

}
