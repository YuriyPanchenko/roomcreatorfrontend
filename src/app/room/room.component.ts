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
        .subscribe( text => {this.message += text.toString(); this.reloadData()});
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

  onUpdate(room: Room) {
    this.updateOrCreate = false;
    this.countOfPoints = room.points.length;
    this.room = room;
  }

  printGraph(points: Point[]) {


    var minY = points[0].yValue;
    var maxY = points[0].yValue;
    var minX = points[0].xValue;
    var maxX = points[0].xValue;

    for (let i = 1; i < points.length; i++) {
      if (minX > points[i].xValue)
        minX = points[i].xValue;
      if (maxX < points[i].xValue)
        maxX = points[i].xValue;
      if (minY > points[i].yValue)
        minY = points[i].yValue;
      if (maxY > points[i].yValue)
        maxY = points[i].yValue;
    }
    var k;
    if((maxY - minY) > 5 || (maxX - minX) > 5)
      if((maxY - minY) > (maxX - minX))
        k = 500/(maxY - minY);
      else
        k = 500/(maxX - minX);
    else
      k = 100;

    var canvas = document.getElementById('stage');
    // @ts-ignore
    if (canvas.getContext) {
      // @ts-ignore
      var ctx = canvas.getContext('2d');
      // @ts-ignore
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.moveTo((points[0].xValue - minX) * k, (points[0].yValue - minY) * k);
      for(let i = 1; i < points.length; i++)
        ctx.lineTo((points[i].xValue - minX) * k, (points[i].yValue - minY) * k);
      ctx.fill();
    }
  }
}
