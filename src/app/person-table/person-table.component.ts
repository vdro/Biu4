import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { Person } from "app/models/person";
import { PersonService, PagingInfo } from "app/services/person-service";

@Component({
  selector: 'person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.css']
})
export class PersonTableComponent implements OnInit {

  items: Person[] = [];
  nameInput: String = '';
  surnameInput: String = '';
  genderInputF = true;
  genderInputM = true;
  emailInput: String = '';
  ageFromInput = 0;
  ageToInput: Number = Number.POSITIVE_INFINITY;
  birthsdayFromInput: String = '1900-01-01';
  birthsdayToInput: String = String((new Date()).getFullYear() + '-12-31');
  incomeFromInput: Number = 0;
  incomeToInput: Number = Number.POSITIVE_INFINITY;


  private nameAsc = true;

  public sortByName() {
    if (this.nameAsc){
      this.items.sort((x, y) => x.firstname.localeCompare(y.firstname));
    } else {
      this.items.sort((x, y) => -x.firstname.localeCompare(y.firstname))
    };

    this.nameAsc = !this.nameAsc;
  }

  public getFilteredElements() {

    console.log(typeof this.birthsdayFromInput)

    const filteredArr = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
    const sName = new RegExp('^' + this.nameInput, 'i');
    const sSurname = new RegExp('^' + this.surnameInput, 'i');
    const sGender = function(fem, mal){
      if (fem && mal) {
        return new RegExp('', 'i');
      } else if (fem) {
        return new RegExp('^fem', 'i');
      } else if (mal) {
        return new RegExp('^mal', 'i');
      } else {
        return new RegExp('^ ', 'i');
      }
    };
    const sRange = function(from, to, el){
      return (el >= from && el <= to)
    };

    const sEmail = new RegExp('^' + this.emailInput, 'i');

    const sBDay = function(from, to, el) {
      let nFrom = new Date(from);
      let nTo = new Date(to);
      return (el.getTime() >= nFrom.getTime() && el.getTime() <= nTo.getTime());
    };

    this.items = filteredArr.filter(element => sName.test(element.firstname)
                                            && sSurname.test(element.lastname)
                                            && sGender(this.genderInputF, this.genderInputM).test(element.gender)
                                            && sEmail.test(element.email)
                                            && sRange(this.ageFromInput, this.ageToInput, element.age)
                                            && sBDay(this.birthsdayFromInput, this.birthsdayToInput, element.birthday)
                                            && sRange(Number(this.incomeFromInput), Number(this.incomeToInput), Number(element.income))
                                           );
  }


  private currentPage = 1;
  
  public next() {
    this.items = [];
    this.currentPage++;
    this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
    this.getFilteredElements();
  }

  public prev(): void {
    if (this.currentPage <= 1) return;
    this.items = [];
    this.currentPage--;
    this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
    this.getFilteredElements();
  }

  public refreshTable(): void {
    this.items = [];
    this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
    this.getFilteredElements();
  }

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.items = this.personService.getPeople(new PagingInfo(1, 10));
  }

}
