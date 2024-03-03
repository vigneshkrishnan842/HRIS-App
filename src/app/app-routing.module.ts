import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { TAComponent } from './ta/ta.component';
import { AdminComponent } from './ta/admin/admin.component';
import { RecruiterComponent } from './ta/recruiter/recruiter.component';
import { TAManagerComponent } from './ta/tamanager/tamanager.component';
import { RegionalHeadComponent } from './ta/regional-head/regional-head.component';

const routes: Routes = [
  { path: '', redirectTo: '/employee-list',pathMatch:'full' },
  {path:'add-employee', component:AddEmployeeComponent},
  {path:'employee-list', component:EmployeeListComponent},
  {
    path: 'TA', component: TAComponent, children: [
    {path:'admin',component:AdminComponent},
    {path:'recruiter',component:RecruiterComponent},
    {path:'TAManager',component:TAManagerComponent},
    {path:'regionalHead',component:RegionalHeadComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
