import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  passwordError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.password === this.confirmPassword) {
      if (this.password.length >= 8) {
        this.passwordError = '';
        console.log(this.username);
        this.authService.register(this.username, this.password).subscribe(result => {
          console.log(result);

          this.authService.setToken(result.user);
          this.router.navigate(['/']);
        });
      } else {
        this.passwordError = 'Пароль должен содержать не менее 8 символов.';
      }
    } else {
      console.log('Пароли не совпадают');
    }
  }
}
