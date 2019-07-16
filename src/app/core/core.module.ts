import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppMaterialModule } from '../app-material.module';

import { HeaderComponent } from './header/header.component';
import { GotBooksListComponent } from './got-books-list/got-books-list.component';
import { GotBookDetailsComponent } from './got-book-details/got-book-details.component';
import { GotBooksService } from './got-books.service';

@NgModule({
    declarations: [
        HeaderComponent,
        GotBooksListComponent,
        GotBookDetailsComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AppMaterialModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        HeaderComponent
    ],
    providers: [
        GotBooksService
    ]
})
export class CoreModule {}
