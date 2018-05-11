import { people } from './../services/data';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from 'app/models/person';

@Component({
  selector: '[person-table-row]', 
  templateUrl: './person-table-row.component.html',
  styleUrls: ['./person-table-row.component.css']
})
export class PersonTableRowComponent implements OnInit {

  @Input() model: Person;
  @Output() saveDelete: EventEmitter<any> = new EventEmitter();

  isInEditMode: boolean;
  isInDeleteMode: boolean;

  constructor() {
    this.isInEditMode = false;
    this.isInDeleteMode = false;
   }

  ngOnInit() {
  }

  editRow() {
    this.isInEditMode = true;
  }

  deleteRow() {
    this.isInDeleteMode = true;
  }

  saveRow() {
    this.isInEditMode = false;
    for (let i in people) {
      if (people[i].id === this.model.id) {
      people[i].firstName = this.model.firstname;
      people[i].lastName = this.model.lastname;
      people[i].gender = this.model.gender;
      people[i].email = this.model.email;
      people[i].age = this.model.age;
      people[i].birthsday = String(this.model.birthday);
      people[i].income = String(this.model.income);
    }};
  }

  undoRow() {
    this.isInEditMode = false;
    for (let i in people) {
      if (people[i].id === this.model.id) {
      this.model.firstname = people[i].firstName;
      this.model.lastname = people[i].lastName;
      this.model.gender = people[i].gender;
      this.model.email = people[i].email;
      this.model.age = people[i].age;
      this.model.birthday = new Date(people[i].birthsday);
      this.model.income = Number(people[i].income);
    }};
  }

  confirmDelete() {
    for (let i in people) {
      if (people[i].id === this.model.id) {
        people.splice(people.indexOf(people[i]), 1);
        break;
      }
    }
    this.isInDeleteMode = false;
    this.saveDelete.emit(null);
  }

  undoDelete() {
    this.isInDeleteMode = false;
  }
}
