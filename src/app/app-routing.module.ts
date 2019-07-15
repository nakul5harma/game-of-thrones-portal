import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { GotBooksListComponent } from './core/got-books-list/got-books-list.component';
import { GotBookDetailsComponent } from './core/got-book-details/got-book-details.component';

const appRoutes: Routes = [
    { path: 'got-books-list', component: GotBooksListComponent },
    { path: 'got-book-details/:id', component: GotBookDetailsComponent },
    { path: '', redirectTo: 'got-books-list', pathMatch: 'full' },
    { path: '**', redirectTo: 'got-books-list' }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
