import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService,private _snackBar: MatSnackBar) { }


  public usertsmai ={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  };


  ngOnInit(): void {
  }

  formSubmit()
  {
    console.log(this.usertsmai);
    if(this.usertsmai.username==''|| this.usertsmai.username==null)
    {
      //alert("Username is required")
      this._snackBar.open("Username is Required",'',{duration:3000,verticalPosition:'top',horizontalPosition:'right'})
    }

   //addUser
   this.userService.addUser(this.usertsmai).subscribe(
   (data)=>
    {
        console.log(data);
       Swal.fire('Success','User is Registered Successfully','success')
    },(error)=>
    {
      console.log(error);
      Swal.fire('Error','Error while adding data to DB')
    }
   )


  }

}
