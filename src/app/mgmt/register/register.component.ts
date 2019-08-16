import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	registerForm: FormGroup;
	submitted = false;

  constructor(
		private formBuilder: FormBuilder,
		private authService: AuthenticationService
		) { }

  ngOnInit() {
		this.registerForm = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
			eMail: ['', Validators.required]
		});
  }

	get formControls() { return this.registerForm.controls;}

	onSubmit() {
		this.submitted = true;

		if (this.registerForm.invalid) {
			return;
		}
		this.authService.registerUser(
			this.formControls.username.value,
			this.formControls.password.value,
			this.formControls.eMail.value);
	}
	
}