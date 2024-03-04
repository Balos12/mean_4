import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  username: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUsername();
  }

  getUsername(): void {
    const token = this.authService.getToken();
    if (token) {
      console.log(token)

      this.username = token.username
    }
  }


  logout() {
    this.authService.logout().subscribe(() => {
      this.username = '';
    });
  }
}
