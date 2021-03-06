import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CreateserviceService} from './createservice.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-createcase',
  templateUrl: './createcase.component.html',
  styleUrls: ['./createcase.component.css']
})
export class CreatecaseComponent implements OnInit {
  errors;
  //view child techniques that we learned in class
  @ViewChild('name') name: ElementRef;
  @ViewChild('manager') manager: ElementRef;
  @ViewChild('COI') COI: ElementRef;
  nameValue;
  managerValue;
  dateValue;
  COIValue;
  usersWithCOI;

  constructor(public authService: AuthService,  private route: ActivatedRoute,
              private router: Router, private createservice: CreateserviceService  ) { }

  ngOnInit(): void {
  }
  // component to create the case
  createCase(){
    this.nameValue = this.name.nativeElement.value;
    this.managerValue = this.manager.nativeElement.value.split(',');

    this.COIValue = this.COI.nativeElement.value.split(',');
    this.usersWithCOI = [];
    this.errors = null;
    if (this.nameValue !== '' && this.managerValue !== '') {
      this.createservice.createCasePost(this.nameValue, this.managerValue, formatDate(new Date(), 'yyyy/MM/dd', 'en'), this.COIValue, this.usersWithCOI);
    }
     else{
      this.errors = 'Case name and manager email have to be entered';
    }
  }
}
