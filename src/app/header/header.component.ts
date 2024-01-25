import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import '@cds/core/icon/register.js';
import { ClarityIcons, userIcon } from '@cds/core/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    ClarityIcons.addIcons(userIcon);
    document.querySelector('.addEmployee').addEventListener('click', (e: Event) => { 
      e.preventDefault();
      this.toaddEmployee.call(this);
    });
  }
  toaddEmployee() { 
    this.router.navigate(['add-employee']);
  }
}
