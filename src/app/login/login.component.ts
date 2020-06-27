import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../servies/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }
  frm: FormGroup
  ngOnInit(): void {

    this.frm = this.fb.group(
      {
        email: ['',[Validators.required, Validators.email]],
        password: ['',[Validators.required, Validators.minLength(6)]],
      })
    
  }
  loginwithFirebase(){
    let email = this.frm.controls["email"].value;
    let pass = this.frm.controls["password"].value;
    this.auth.loginFirebase(email,pass).then(res=>
      {
        console.log("Success");
        this.router.navigate(["/admin/home"]);

      },err=>console.log("Loi khi dang nhap:"+err))
    //  location.href ="/admin/main"
  }
  onSubmit(){
    
  }
}
