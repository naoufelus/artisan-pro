// artisans/artisan.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artisan } from './artisan.model';

@Injectable({
  providedIn: 'root'
})
export class ArtisanService {
  private apiUrl = 'http://localhost:3000/artisans';

  constructor(private http: HttpClient) { }

  getArtisans(): Observable<Artisan[]> {
    return this.http.get<Artisan[]>(this.apiUrl);
  }

  getArtisan(id: number): Observable<Artisan> {
    return this.http.get<Artisan>(`${this.apiUrl}/${id}`);
  }

  createArtisan(artisan: Artisan): Observable<Artisan> {
    return this.http.post<Artisan>(this.apiUrl, artisan);
  }

  updateArtisan(id: number, artisan: Artisan): Observable<Artisan> {
    return this.http.put<Artisan>(`${this.apiUrl}/${id}`, artisan);
  }

  deleteArtisan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}