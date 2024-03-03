import { Component, OnInit,ElementRef  } from '@angular/core';
import { DataServiceService } from 'src/app/Common/data-service.service';
import * as d3 from 'd3';

export interface L5Offer {
  L5Leader: string;
  NumOfOffers: number;
}

@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.css']
})
export class RecruiterComponent implements OnInit{
  // private data = [
  //   {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
  //   {"Framework": "React", "Stars": "150793", "Released": "2013"},
  //   {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
  //   {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
  //   {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
  // ];
  private svg: any;
  private margin = 70;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  private createSvg(): void {
    d3.select("figure#bar").selectChild("svg").remove();
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }
  
  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.L5Leader))
    .padding(0.2);
  
    // Draw the X-axis on the DOM
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(0,0)rotate(-15)")
    .style("text-anchor", "end");
  
    // Create the Y-axis band scale
    const y = d3.scaleLinear()
    .domain([0, 10])
    .range([this.height, 0]);
  
    // Draw the Y-axis on the DOM
    this.svg.append("g")
    .call(d3.axisLeft(y));
  
    const gradient = this.svg.append('defs')
      .append('linearGradient')
      .attr('id', 'gradient')
      .attr('x1', '0%') // Start gradient at left
      .attr('y1', '0%')
      .attr('x2', '100%') // End gradient at right
      .attr('y2', '100%');

    // Define gradient stops
    gradient.append('stop')
      .attr('offset', '0%')
      .attr('style', 'stop-color: #13edd7'); // Start color
    gradient.append('stop')
      .attr('offset', '100%')
      .attr('style', 'stop-color: #348ceb'); // End color

    // Create and fill the bars
    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d: any) => x(d.L5Leader))
    .attr("y", (d: any) => y(d.NumOfOffers))
    .attr("width", x.bandwidth())
    .attr("height", (d: any) => this.height - y(d.NumOfOffers))
    .attr("fill", "#e6f5f4")
    .on('mouseover', function (event,d) {
      d3.select(this).attr('fill', 'url(#gradient)'); // Change color on mouseover
      // Show tooltip
      tooltip.transition()
      .duration(200)
      .style('opacity', .9);
      tooltip.html('Number of Offers: ' + d.NumOfOffers)
      .style('left', (event.pageX) + 'px')
      .style('top', (event.pageY - 28) + 'px');
    })
    .on('mouseout', function (d) {
      d3.select(this).attr('fill', '#e6f5f4'); // Revert to original color on mouseout
      // Hide tooltip
      tooltip.transition()
      .duration(500)
      .style('opacity', 0);
    });
    // Create tooltip
    const tooltip = d3.select(this.elementRef.nativeElement).select('figure#bar')
      .append('div')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('opacity', 0);
  }

  recruiter = 'Ameer Ali, Sayaf';
  recNames = [];
  allOffers = [];
  recruiterOffers = [];
  diversitypercent = 0;
  referralpercent = 0;
  joinpercent = 0;
  L5Arr: L5Offer[] = [];
  constructor(private dataService: DataServiceService,private elementRef: ElementRef) { }

ngOnInit(): void {
    this.dataService.JSONDataUpdate.subscribe(data => {
      //console.log(data);
      //console.log(data["Sheet1"]);
      this.allOffers = data["Sheet1"];
      //console.log(this.allOffers);
      //this.createSvg();
      this.init();
      
    //this.drawBars(this.data);
    //this.drawBars(this.L5Arr);
    });
    //this.recruiterData();
  }
  init() {
    this.recNamesUnique();
    this.recruiterData();
      this.calcDiversity();
      this.calcReferral();
    this.calcOTJ();
    this.calcL5();
    this.createSvg();
    this.drawBars(this.L5Arr);
  }
  recNamesUnique() {
    this.allOffers.forEach(offer => this.recNames.push(offer['Primary Recruiter Name']));
    this.recNames = [...new Set(this.recNames)];
  }
  recruiterData() {
    this.recruiterOffers = this.allOffers.filter(offer => offer['Primary Recruiter Name'] === this.recruiter);
    console.log(this.recruiterOffers);
  }
  calcDiversity() {
    let totalOffers = this.recruiterOffers.length;
    let diversityOffers = this.recruiterOffers.filter(offer => offer['Gender'] === 'Female').length;
    this.diversitypercent = +((diversityOffers / totalOffers) * 100).toFixed(2);
    console.log(this.diversitypercent);
  }
  calcReferral() {
    let totalOffers = this.recruiterOffers.length;
    let referralOffers = this.recruiterOffers.filter(offer => offer['Source'] === 'Referral').length;
    this.referralpercent = +((referralOffers / totalOffers) * 100).toFixed(2);
    console.log(this.referralpercent);
  }
  calcOTJ() {
    let totalOffers = this.recruiterOffers.length;
    let declinedOffers = this.recruiterOffers.filter(offer => offer['Status'] === 'Declined').length;
    this.joinpercent = +(100-((declinedOffers / totalOffers) * 100)).toFixed(2);
    console.log(this.joinpercent);
  }
  calcL5() {
    let L5obj = {};
    this.L5Arr = [];
    this.recruiterOffers.forEach(offer => {
      L5obj[offer['L5']] = (L5obj[offer['L5']] || 0) + 1;
    });
    for (let key in L5obj)
    {
      this.L5Arr.push({
        'L5Leader': key,
        'NumOfOffers' : L5obj[key]
      }); 
    }
    console.log(L5obj);
    console.log(this.L5Arr);
  }
}
