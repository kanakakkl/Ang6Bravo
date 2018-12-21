import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SpotreportsService {
   //uri="http://localhost:3003"
    uri = window.location.origin;


  constructor(public http: HttpClient) { }
  getSubmissions(){
    var data = this.http.get(`${this.uri}/awardrecog/getSubmissions`);
    return data;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  deleteRec(id: string): Observable<{}> {
    const url = `${this.uri}/awardrecog/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateBook(data): Observable<any> {
    return this.http.put(`${this.uri}/awardrecog/${data._id}`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
