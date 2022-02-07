import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransportComponent } from './transport/transport.component';
const routes: Routes = [{
  path:"", redirectTo:"transport", pathMatch:"full"
},

{
  path:'transport',
  component:TransportComponent,
  pathMatch:'full'
}
];


@NgModule({
  declarations:[ ],
  imports: [RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
