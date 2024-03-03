import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/Common/data-service.service';

export interface recruiterStatistics{
  [key: string]: {
                    totalOffers: number;
                    diversityPercentage: number;
                    referralPercentage: number;
                    OTJRatio: number;
                    declines: number;
                }
}

@Component({
  selector: 'app-tamanager',
  templateUrl: './tamanager.component.html',
  styleUrls: ['./tamanager.component.css']
})
export class TAManagerComponent implements OnInit {
  allOffers = [];
  taManagerNames = [];
  taManager = 'Adiraja, Ajmal';
  taManagerOffers = [];
  diversitypercent = 0;
  referralpercent = 0;
  joinpercent = 0;
  recruiterStats = {};
  constructor(private dataService : DataServiceService){}
  ngOnInit(): void {
    this.dataService.JSONDataUpdate.subscribe(data => {
      this.allOffers = data["Sheet1"];
      //console.log(this.allOffers);
      this.init();
    });
  }

  init() {
    this.taManagerNamesUnique();
    this.taManagerData();
      this.calcDiversity();
      this.calcReferral();
    this.calcOTJ();
    this.calcRecruiterStats();
  }
  taManagerNamesUnique() {
    this.allOffers.forEach(offer => this.taManagerNames.push(offer["Recruiter's Manager"]));
    this.taManagerNames = [...new Set(this.taManagerNames)];
  }
  taManagerData() {
    this.taManagerOffers = this.allOffers.filter(offer => offer["Recruiter's Manager"] === this.taManager);
  }
  calcDiversity() {
    let totalOffers = this.taManagerOffers.length;
    let diversityOffers = this.taManagerOffers.filter(offer => offer['Gender'] === 'Female').length;
    this.diversitypercent = +((diversityOffers / totalOffers) * 100).toFixed(2);
  }
  calcReferral() {
    let totalOffers = this.taManagerOffers.length;
    let referralOffers = this.taManagerOffers.filter(offer => offer['Source'] === 'Referral').length;
    this.referralpercent = +((referralOffers / totalOffers) * 100).toFixed(2);
  }
  calcOTJ() {
    let totalOffers = this.taManagerOffers.length;
    let declinedOffers = this.taManagerOffers.filter(offer => offer['Status'] === 'Declined').length;
    this.joinpercent = +(100-((declinedOffers / totalOffers) * 100)).toFixed(2);
  }
  calcRecruiterStats() {
    //let recruiterStats = {};
    let recruiterName = '';
    this.taManagerOffers.forEach(offer => {
      recruiterName = offer['Primary Recruiter Name'];
      if (this.recruiterStats[recruiterName]) {
        this.recruiterStats[recruiterName].totalOffers++;
        if (offer['Gender'] === 'Female') {
          this.recruiterStats[recruiterName].diversityPercentage = ((((this.recruiterStats[recruiterName].diversityPercentage * (this.recruiterStats[recruiterName].totalOffers-1)/100)+1)/this.recruiterStats[recruiterName].totalOffers)*100).toFixed(1);  
        } else {
          this.recruiterStats[recruiterName].diversityPercentage = ((((this.recruiterStats[recruiterName].diversityPercentage * (this.recruiterStats[recruiterName].totalOffers-1)/100))/this.recruiterStats[recruiterName].totalOffers)*100).toFixed(1);
        }
          if (offer['Source'] === 'Referral') {
            this.recruiterStats[recruiterName].referralPercentage = ((((this.recruiterStats[recruiterName].referralPercentage * (this.recruiterStats[recruiterName].totalOffers-1)/100)+1)/this.recruiterStats[recruiterName].totalOffers)*100).toFixed(1);
          } else {
            this.recruiterStats[recruiterName].referralPercentage = ((((this.recruiterStats[recruiterName].referralPercentage * (this.recruiterStats[recruiterName].totalOffers-1)/100))/this.recruiterStats[recruiterName].totalOffers)*100).toFixed(1);
          }
          if (offer['Status'] === 'Declined') {
            this.recruiterStats[recruiterName].declines++;
            this.recruiterStats[recruiterName].OTJRatio = (((this.recruiterStats[recruiterName].OTJRatio * (this.recruiterStats[recruiterName].totalOffers-1)))/this.recruiterStats[recruiterName].totalOffers).toFixed(1);
          } else {
            this.recruiterStats[recruiterName].OTJRatio = ((((this.recruiterStats[recruiterName].OTJRatio * (this.recruiterStats[recruiterName].totalOffers-1)/100)+1)/this.recruiterStats[recruiterName].totalOffers)*100).toFixed(1);
          }
      } else {
        this.recruiterStats[recruiterName] = {
          totalOffers :  0,
          diversityPercentage: 0,
          referralPercentage : 0,
          OTJRatio: 0,
          declines : 0
        };
        this.recruiterStats[recruiterName].totalOffers =  1;
        this.recruiterStats[recruiterName].diversityPercentage = offer['Gender'] === 'Female' ? 100 : 0;
        this.recruiterStats[recruiterName].referralPercentage = offer['Source'] === 'Referral' ? 100 : 0;
        this.recruiterStats[recruiterName].declines = offer['Status'] === 'Declined' ? 1 : 0;
        this.recruiterStats[recruiterName].OTJRatio = offer['Status'] === 'Declined' ? 0 : 100;
      } 
    });
    console.log(this.recruiterStats);
  }

}
