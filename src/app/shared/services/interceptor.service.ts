import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{
  constructor(
    private router: Router
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => this.handleAuthError(err)));
  }

  handleAuthError(err: HttpErrorResponse): Observable<any> {
    // Unauthorized Access
    if (err.status === 401) {
      localStorage.clear();
      this.router.navigate(['/login']);
      return of(err.message);
    }
    throw err;
  }
}
