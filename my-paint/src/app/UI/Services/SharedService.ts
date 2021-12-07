import { Injectable } from '@angular/core';
import{Observable,Subject}from'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  static mode: string ;
  static value:string ;
  private subject=new Subject<any>();
  sendClick(){
    this.subject.next(undefined)
  }
  getClick():Observable<any>{
    return this.subject.asObservable()
  }

  constructor() { }
}
