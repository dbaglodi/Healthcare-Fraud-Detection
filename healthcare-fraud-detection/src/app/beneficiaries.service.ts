import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeneficiariesService {
  private apiUrl = 'http://localhost:3000/api/data';

  constructor(private http: HttpClient) { }

  // Get JSON data
  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Update JSON data
  updateData(newData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newData);
  }
}