import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { GOTBookModel } from '../got-book.model';
import { GotBooksService } from '../got-books.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-got-book-details',
    templateUrl: './got-book-details.component.html',
    styleUrls: [
        './got-book-details.component.css'
    ]
})
export class GotBookDetailsComponent implements OnInit {
    public bookDetails: GOTBookModel;
    public reviewFormControl: FormControl = new FormControl('', [
        Validators.required
    ]);

    constructor(private route: ActivatedRoute, private gotBooksService: GotBooksService) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.gotBooksService.getBookDetails(+params.get('id')).subscribe(
                (bookDetails: GOTBookModel) => {
                    this.bookDetails = bookDetails;
                },
                (error) => {
                    console.log('Error occured while fething book details - ', error.error);
                }
            );
        });
    }

    public addReview() {}
}
