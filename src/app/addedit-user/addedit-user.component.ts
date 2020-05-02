import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { element } from 'protractor';
//import { map } from 'rxjs/operators';

@Component({
  selector: 'addedit-user',
  templateUrl: './addedit-user.component.html',
  styleUrls: ['./addedit-user.component.css']
})
export class AddeditUserComponent implements OnInit {

  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  public showHidebtn: boolean;
  public showHideUpdateModalbtn: boolean;
  public display = 'none';
  public usrobj: any;

  public userForm: FormGroup;
  usersData: any;
  private _jsonURL = 'assets/users.json';
  updatedValues = [];
  displayedColumns = ['id', 'Username', 'email', 'Phone', 'City', 'Country', 'actions'];
  dataSource: MatTableDataSource<UsersData>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    const usersInfo: UsersData[] = [];
    this.usersData = this.http.get(this._jsonURL)
      .subscribe(data => {
        debugger
        this.usersData = data;
        this.generateUserData(usersInfo);
      });

    //const users: UserData[] = [];
  }

  private generateUserData(usersInfo: UsersData[]) {
    for (let i = 0; i < this.usersData.length; i++) {
      debugger;
      usersInfo.push(createUserData(this.usersData[i]));
      this.dataSource = new MatTableDataSource(usersInfo);
      this.totalSize = this.usersData.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  private iterator() {
    debugger
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.usersData.slice(start, end);
    this.dataSource = part;
  }
  ngOnInit() {
    this.showHidebtn = true;
    this.buildForm();
  }

  private buildForm(): void {

    this.userForm = this.formBuilder.group({
      userId: ['0'],
      Username: ['', Validators.compose([Validators.required
      ])],
      email: ['', Validators.compose([Validators.required
      ])],
      Phone: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]
      ],
      Address: ['', Validators.compose([Validators.required
      ])],
      City: ['', Validators.compose([Validators.required
      ])],
      Country: ['', Validators.compose([Validators.required
      ])]
    });

  }

  onAdd(userObj): void {
    debugger
    const usersInfo: UsersData[] = [];
    debugger
    userObj.id = this.usersData.length + 1;
    this.usersData.push(userObj);
    this.generateUserData(usersInfo);
    //JSON.stringify(val)
  }

  onUpdate(userObj): void {
    debugger
    this.showHideUpdateModalbtn = true;
    this.updatedValues = [];

    let index = userObj.userId - 1;
    this.PrepareUpdatedUserDdetails(index, userObj);

    if (this.updatedValues.length == 0) {
      this.showHideUpdateModalbtn = false;
      this.updatedValues.push("No Updates has been done!!!");
    }

    const usersInfo: UsersData[] = [];
    this.usersData[index].id = userObj.userId;
    this.usersData[index].Username = userObj.Username;
    this.usersData[index].email = userObj.email;
    this.usersData[index].Phone = userObj.Phone;
    this.usersData[index].Address = userObj.Address;
    this.usersData[index].City = userObj.City;
    this.usersData[index].Country = userObj.Country;
    this.generateUserData(usersInfo);
  }

  // private PrepareUpdatedUserDdetails(index: number, userObj: any) {
  //   if (this.usersData[index].Username.localeCompare(userObj.Username) == -1 || this.usersData[index].Username.localeCompare(userObj.Username) == 1)
  //     this.updatedValues.push("Updated Username from " + this.usersData[index].Username + " to " + userObj.Username);
  //   if (this.usersData[index].email.localeCompare(userObj.email) == -1 || this.usersData[index].email.localeCompare(userObj.email) == 1)
  //     this.updatedValues.push("Updated email from " + this.usersData[index].email + " to " + userObj.email);
  //   if (this.usersData[index].Phone.localeCompare(userObj.Phone) == -1 || this.usersData[index].Phone.localeCompare(userObj.Phone) == 1)
  //     this.updatedValues.push("Updated Phone from " + this.usersData[index].Phone + " to " + userObj.Phone);
  //   if (this.usersData[index].Address.localeCompare(userObj.Address) == -1 || this.usersData[index].Address.localeCompare(userObj.Address) == 1)
  //     this.updatedValues.push("Updated Address from " + this.usersData[index].Address + " to " + userObj.Address);
  //   if (this.usersData[index].City.localeCompare(userObj.City) == -1 || this.usersData[index].City.localeCompare(userObj.City) == 1)
  //     this.updatedValues.push("Updated City from " + this.usersData[index].City + " to " + userObj.City);
  //   if (this.usersData[index].Country.localeCompare(userObj.Country) == -1 || this.usersData[index].Country.localeCompare(userObj.Country) == 1)
  //     this.updatedValues.push("Updated Country from " + this.usersData[index].Country + " to " + userObj.Country);
  // }

  private PrepareUpdatedUserDdetails(index: number, userObj: any) {
    if (this.usersData[index].Username.localeCompare(userObj.Username) != 0)
      this.updatedValues.push("Updated Username from " + this.usersData[index].Username + " to " + userObj.Username);
    if (this.usersData[index].email.localeCompare(userObj.email) != 0)
      this.updatedValues.push("Updated email from " + this.usersData[index].email + " to " + userObj.email);
    if (this.usersData[index].Phone.localeCompare(userObj.Phone) != 0)
      this.updatedValues.push("Updated Phone from " + this.usersData[index].Phone + " to " + userObj.Phone);
    if (this.usersData[index].Address.localeCompare(userObj.Address) != 0)
      this.updatedValues.push("Updated Address from " + this.usersData[index].Address + " to " + userObj.Address);
    if (this.usersData[index].City.localeCompare(userObj.City) != 0)
      this.updatedValues.push("Updated City from " + this.usersData[index].City + " to " + userObj.City);
    if (this.usersData[index].Country.localeCompare(userObj.Country) != 0)
      this.updatedValues.push("Updated Country from " + this.usersData[index].Country + " to " + userObj.Country);
  }


  EditUser(row) {
    debugger
    this.showHidebtn = false;
    //this.usersData[row.id];
    // alert(JSON.stringify(row.id))
    // alert(JSON.stringify(row.email))
    this.userForm = this.formBuilder.group({
      userId: [row.id],
      Username: [row.Username, Validators.compose([Validators.required
      ])],
      email: [row.email, Validators.compose([Validators.required
      ])],
      Phone: [row.Phone, [Validators.required, Validators.pattern('[6-9]\\d{9}')]
      ],
      Address: [row.Address, Validators.compose([Validators.required
      ])],
      City: [row.City, Validators.compose([Validators.required
      ])],
      Country: [row.Country, Validators.compose([Validators.required
      ])]
    });
  }

  SetUserObjToDelete(row) {
    debugger;
    this.usrobj = row;
  }

  deletUser(usrobj) {
    debugger
    //this.usersData = this.usersData.filter(obj => obj !== usrobj);
    this.usersData.splice(usrobj.id - 1, 1);
    const usersInfo: UsersData[] = [];
    this.generateUserData(usersInfo);
    this.buildForm();
  }

  ResetForm() {
    this.showHidebtn = true;
    this.buildForm();
  }
  ResetModalValues() {
    this.updatedValues = [];
  }

  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}

function createUserData(usersData: any): UsersData {
  return {
    id: usersData.id,
    Username: usersData.Username,
    email: usersData.email,
    Phone: usersData.Phone,
    Address: usersData.Address,
    City: usersData.City,
    Country: usersData.Country,
  };
}

export interface UsersData {
  id: string;
  Username: string;
  email: string;
  Phone: string;
  Address: string;
  City: string;
  Country: string
}

