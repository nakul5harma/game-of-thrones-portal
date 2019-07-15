import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { GotBooksService } from '../got-books.service';
import { GOTBookListModel } from '../got-book-list.model';

@Component({
    selector: 'app-got-books-list',
    templateUrl: './got-books-list.component.html',
    styleUrls: [
        './got-books-list.component.css'
    ]
})
export class GotBooksListComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator, { static: true })
    paginator: MatPaginator;
    @ViewChild(MatSort, { static: true })
    sort: MatSort;
    public displayedColumns = [
        'bookNumber',
        'bookName',
        'noOfPages',
        'noOfCharacters'
    ];
    public dataSource: MatTableDataSource<GOTBookListModel> = new MatTableDataSource();

    constructor(private gotBooksService: GotBooksService, private router: Router) {}

    ngOnInit() {
        this.gotBooksService.getBooksList().subscribe(
            (booksList: Array<GOTBookListModel>) => {
                this.dataSource = new MatTableDataSource(booksList);
            },
            (error) => {
                console.log('Error Occured while fetching books list - ', error.error);
            }
        );
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    public applyFilter(filterValue: string) {
        filterValue = filterValue.trim().toLowerCase();
        this.dataSource.filter = filterValue;
    }

    public goToBookDetails(id: number) {
        this.router.navigate([
            'got-book-details',
            id
        ]);
    }
}
