import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../Common/data-service.service';

@Component({
  selector: 'app-ta',
  templateUrl: './ta.component.html',
  styleUrls: ['./ta.component.css']
})
export class TAComponent implements OnInit {
  constructor(private dateService: DataServiceService) { }
  ngOnInit(): void {
    this.dateService.currentStateUpdate.next('TA');
  }
}
