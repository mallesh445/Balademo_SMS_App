import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  // addClassActive(event) {
  //   event.currentTarget.parentElement.className = 'nav-item Active'
  // }
  ngAfterViewInit() {
    $(document).ready(function () {
      $('li').click(function () {
        $(this).siblings().removeClass('active');
          $(this).addClass('active');
      });
    });
  }
}
