import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, FormControl, Validators } from '@angular/forms';
import { Employee_detail } from '../EmployeeDetail.model';
import { ClrWizard } from '@clr/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../Common/data-service.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit{
  wizDisplay = false;
  @ViewChild('formPageTwo') formPage2: NgForm;
  @ViewChild('wizard') wizard: ClrWizard;
  Employees: Employee_detail[] = [];
  NewEmployeeModel : Employee_detail = {
    Professional: {
      name: '',
      employeeID: +'',
      emailID: '',
      BU: '',
    },
    Personal: {
      emailID: '',
      Gender: '',
      MaritalStatus: '',
      Previous_Company_Name: '',
    },
  };

  professionalForm = this.fb.group({
    name: new FormControl('', [Validators.required]),
    employeeID: new FormControl('', [Validators.required, Validators.pattern(/[0-9]/)]),
    emailID: new FormControl('', [Validators.required, Validators.email]),
    BU: new FormControl('', [Validators.required])
  });
  constructor(private router : Router, private route : ActivatedRoute, private fb : FormBuilder,private dataService : DataServiceService) { }
  
  ngOnInit(): void {
    this.wizDisplay = true;
  }
  toempList() { 
    this.router.navigate(['employee-list']);
  }
  onSubmit() { 
    for (let key of Object.keys(this.professionalForm.value)) { 
      this.NewEmployeeModel.Professional[key] = this.professionalForm.value[key];
    }
    this.dataService.addEmployeeData(this.NewEmployeeModel);
    this.wizard.reset();
    this.resetEmployee();
    this.router.navigate(['employee-list']);
  }

  resetEmployee() {
    this.NewEmployeeModel  = {
      Professional: {
        name: '',
        employeeID: +'',
        emailID: '',
        BU: '',
      },
      Personal: {
        emailID: '',
        Gender: '',
        MaritalStatus: '',
        Previous_Company_Name: '',
      },
    };
    this.professionalForm.reset();
    this.formPage2.reset();
  }
}
