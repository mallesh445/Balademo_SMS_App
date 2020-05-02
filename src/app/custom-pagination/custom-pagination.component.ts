import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as _ from 'underscore';

@Component({
  selector: 'app-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.css']
})
export class CustomPaginationComponent implements OnInit {

  constructor(private http: HttpClient) { }

  // array of all items to be paged
  public allItems: any;
  public totalItems: any;

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  ngOnInit() {
    // get dummy data
    // this.http.get('./dummy-data.json')
    //     .map((response: Response) => response.json())
    //     .subscribe(data => {
    //         // set items to json response
    //         this.allItems = data;

    //         // initialize to page 1
    //         this.setPage(1);
    //     });

    this.http.get('assets/users.json')
      .subscribe(data => {
        debugger
        this.allItems = data;
        this.totalItems = data;
        this.setPage(1);
      });
  }

  setPage(page: number) {
    debugger
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);
    let startPage: number, endPage: number;

    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 1 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = _.range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  dataChanged(searchKey) {
    debugger
    this.allItems = this.totalItems;
    if(searchKey!=''){
      this.allItems = this.allItems.filter(f => f.Username.toLowerCase().includes(searchKey.toLowerCase()) 
                                                || f.Address.toLowerCase().includes(searchKey.toLowerCase()));
    }
    this.pager.totalPages = undefined;
    this.setPage(1);
  }

}
