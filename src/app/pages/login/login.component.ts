import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private snack: MatSnackBar,
    private loginservice: LoginService,
    private router: Router
  ) {}

  logindatatsmai = {
    username: '',
    password: '',
  };

  ngOnInit(): void {}

  formSubmit() {
    console.log("Login Clicked");
    if(this.logindatatsmai.username.trim()==''||this.logindatatsmai.username==null)
    {
       this.snack.open('Username is required!! ' ,'' ,{duration:3000});
       return;
    }

    if(this.logindatatsmai.password.trim()==''||this.logindatatsmai.password==null)
    {
       this.snack.open('Password is required!! ' ,'' ,{duration:3000});
       return;
    }






  //request to server to generate token and get token
  
  this.loginservice.generateToken(this.logindatatsmai).subscribe(

  (data:any)=>
  {
      console.log("Success");
      console.log(data);
     
      //set the recieved token in local storage
      this.loginservice.loginUser(data.token);

      //iss token ka current user get karo pehle
      this.loginservice.getCurrentUser().subscribe(
        (user:any)=>
        {
          //user ko local storage mai daal do
           this.loginservice.setUser(user);
           console.log(user);
           //redirect....ADMIN
   
           //redirect...NORMAL

           if(this.loginservice.getUserRole()=="ADMIN")
           {
            //  window.location.href='/admin'
            this.router.navigate(['admin'])
            this.loginservice.loginStatusSubject.next(true)
           }
           else if(this.loginservice.getUserRole()=="NORMAL")
           {
           // window.location.href='/user-dashboard'
            this.router.navigate(['user-dashboard'])
            this.loginservice.loginStatusSubject.next(true)
           }
           else{
            this.loginservice.logout();
           }
        }
      );
  },
  (error)=>
  {
     console.log("Error");
     console.log(error);
     this.snack.open("Invalid Details !! Try Again",'',{
      duration:3000,
     });
  }


  )
  }
}
