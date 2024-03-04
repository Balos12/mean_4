import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5005/api/auth';
  private tokenKey = 'token';

  constructor(private http: HttpClient) { }

  register(username: string, password: string): Observable<any> {
    const body = { username, password };
    console.log(body);
    return this.http.post(`${this.apiUrl}/register`, body);
  }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  setToken(token: any): void {
    if (typeof token === 'object') {
      const tokenString = JSON.stringify(token);
      localStorage.setItem(this.tokenKey, tokenString);
    } else {
      console.error('Invalid token format.');
    }
  }

  getToken(): any {
    const tokenString = localStorage.getItem(this.tokenKey);
    if (tokenString) {
      try {
        const token = JSON.parse(tokenString);
        return token;
      } catch (error) {
        console.error('Invalid token stored in localStorage.');
        return null;
      }
    }
    return null;
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  logout(): any {
    this.removeToken()
    return this.http.get(`${this.apiUrl}/logout`);
  }
}
