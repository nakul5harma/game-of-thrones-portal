import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { GOTBookModel } from './got-book.model';
import { GOTBookListModel } from './got-book-list.model';

@Injectable()
export class GotBooksService {
    /**
     * booksUrl -> for getting entire book data
     * booksUrl + <book_id> -> for getting specific book's details
     */
    private booksUrl = 'https://anapioficeandfire.com/api/books';

    constructor(private httpClient: HttpClient) {}

    public getBooksList(): Observable<Array<GOTBookListModel>> {
        return this.httpClient.get<Array<GOTBookModel>>(this.booksUrl).pipe(
            map((bookList: Array<GOTBookModel>) => {
                const bookListModelArray: Array<GOTBookListModel> = [];
                bookList.forEach((bookDetails: GOTBookModel) => {
                    bookListModelArray.push(
                        new GOTBookListModel(bookDetails.name, bookDetails.numberOfPages, bookDetails.characters.length)
                    );
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
