import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter, NgModule } from '@angular/core';
import { SharedService } from '../Services/SharedService';

@Component({
  selector: 'app-shapes-h',
  templateUrl: './shapes-h.component.html',   // notice the variable name myCanvas
   template: `<canvas #myCanvas></canvas>`,
  styleUrls: ['./shapes-h.component.css']
})
export class ShapesHComponent implements OnInit {

  constructor(private share:SharedService) { }
  ngOnInit(): void {
  }
  changType(vlue: string,mde:string) {
    SharedService.mode=mde
    SharedService.value=vlue
    this.share.sendClick()
  }

  
}
