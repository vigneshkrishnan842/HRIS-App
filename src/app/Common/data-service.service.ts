import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee_detail } from '../EmployeeDetail.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private employeesData : Employee_detail[]= [];
  constructor(private http: HttpClient) { }

  dataUpdate = new BehaviorSubject<Employee_detail[]>(null);
  getEmployeesData(){
    if (this.employeesData.length === 0) { 
      this.http.get<Employee_detail[]>('assets/Json/employeeData.json').subscribe(data => {
        this.employeesData = data;
        this.dataUpdate.next(this.employeesData.slice());
      }
      );
    }
  }
  addEmployeeData(employeeData : Employee_detail){
    this.employeesData.push(employeeData);
    this.dataUpdate.next(this.employeesData.slice());
  }
}
