import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PersonTableComponent } from './person-table/person-table.component';
import { PersonTableRowComponent } from './person-table-row/person-table-row.component';
import { PersonService } from "app/services/person-service";
import { PersonTablePagingComponent } from './person-table-paging/person-table-paging.component';
import { MyComponentComponent } from './my-component/my-component.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonTableComponent,
    PersonTableRowComponent,
    PersonTablePagingComponent,
    MyComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [PersonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
