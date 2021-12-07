import { ShapesHComponent } from './UI/shapes-h/shapes-h.component';
import { ColorComponent } from './UI/color/color.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"ColorComponent",component:ColorComponent},
  {path:"shapes",component:ShapesHComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const rout =[ColorComponent,ShapesHComponent]