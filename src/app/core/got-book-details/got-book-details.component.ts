import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { GOTBookModel } from '../got-book.model';
import { GotBooksService } from '../got-books.service';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-got-book-details',
    templateUrl: './got-book-details.component.html',
    styleUrls: [
        './got-book-details.component.css'
    ]
})
export class GotBookDetailsComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    public bookId: number;
    public bookDetails: GOTBookModel;
    public bookReviews: Array<string>;
    public reviewFormControl: FormControl = new FormControl('', [
        Validators.required
    ]);

    constructor(private route: ActivatedRoute, private gotBooksService: GotBooksService) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.bookId = +params.get('id');

            this.gotBooksService.getBookDetails(this.bookId).subscribe(
                (bookDetails: GOTBookModel) => {
                    this.bookDetails = bookDetails;
                },
                (error) => {
                    console.log('Error occured while fething book details - ', error.error);
                }
            );

            this.bookReviews = this.gotBooksService.getReviewByBookId(this.bookId);
        });

        this.subscription = this.gotBooksService.reviewsChanged.subscribe((reviews: Array<string>) => {
            this.bookReviews = reviews;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    public addReview() {
        this.gotBooksService.addReviewToBookId(this.bookId, this.reviewFormControl.value);
    }
}
