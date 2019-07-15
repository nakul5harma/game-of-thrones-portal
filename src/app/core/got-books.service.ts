import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
import { Observable, throwError, Subject } from 'rxjs';

import { GOTBookModel } from './got-book.model';
import { GOTBookListModel } from './got-book-list.model';

@Injectable()
export class GotBooksService {
    private booksUrl = 'https://anapioficeandfire.com/api/books';
    private reviews: Map<number, Array<string>>;
    public reviewsChanged: Subject<Array<string>> = new Subject<Array<string>>();

    constructor(private httpClient: HttpClient) {
        this.reviews = new Map<number, Array<string>>();
    }

    public getReviewByBookId(id: number) {
        if (!this.reviews.get(id)) {
            this.reviews.set(id, []);
        }

        return this.reviews.get(id).slice();
    }

    public addReviewToBookId(id: number, review: string) {
        this.reviews.get(id).push(review);
        this.reviewsChanged.next(this.getReviewByBookId(id));
    }

    public getBooksList(): Observable<Array<GOTBookListModel>> {
        return this.httpClient.get<Array<GOTBookModel>>(this.booksUrl).pipe(
            map((bookList: Array<GOTBookModel>) => {
                const bookListModelArray: Array<GOTBookListModel> = [];
                bookList.forEach((bookDetails: GOTBookModel, index: number) => {
                    bookListModelArray.push(
                        new GOTBookListModel(bookDetails.name, bookDetails.numberOfPages, bookDetails.characters.length)
                    );
                    this.reviews.set(index + 1, []);
                });

                return bookListModelArray;
            }),
            catchError(this.handleError)
        );
    }

    public getBookDetails(id: number): Observable<GOTBookModel> {
        return this.httpClient.get<GOTBookModel>(this.booksUrl + '/' + id).pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    }
}
