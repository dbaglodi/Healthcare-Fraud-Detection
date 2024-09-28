import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PredictionService {
  private apiUrl = 'http://0.0.0.0:8000'; // Change port if needed

  constructor(private http: HttpClient) {}

  predict(inputData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, { input: inputData });
  }
}
