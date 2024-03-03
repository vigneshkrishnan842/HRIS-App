import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import '@cds/core/icon/register.js';
import { ClarityIcons, userIcon } from '@cds/core/icon';
import { DataServiceService } from '../Common/data-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  currentState: string = 'employeeList';
  currentStateSub: Subscription;
  constructor(private dataService: DataServiceService) { }
  ngOnInit(): void {
    ClarityIcons.addIcons(userIcon);
    this.currentStateSub= this.dataService.currentStateUpdate.subscribe(data => { 
      this.currentState = data;
    });
  }
  ngOnDestroy(): void {
    this.currentStateSub.unsubscribe();
  }
}
