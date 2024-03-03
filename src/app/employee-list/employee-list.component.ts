import { Component,OnInit } from '@angular/core';
import { Employee_detail } from '../EmployeeDetail.model';
import { DataServiceService } from '../Common/data-service.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit{
  employeesData: Employee_detail[] = [];
  selected: any;
  constructor(private dataService : DataServiceService){}
  ngOnInit(): void {
    this.dataService.currentStateUpdate.next('employeeList');
    this.dataService.getEmployeesData();
    this.dataService.dataUpdate.subscribe(data => this.employeesData = data);
}
}
