import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(event: Event): void {
    event.preventDefault();

    console.log(this.username);
    console.log(this.password);


    this.authService.login(this.username, this.password).subscribe(
      result => {
        console.log(result);
        this.authService.setToken(result.user);
        this.router.navigate(['/']);
      },
      error => {
        console.error('Ошибка при входе в систему', error);
        this.error = 'Пароль неверный.';
      }
    );
  }
}
