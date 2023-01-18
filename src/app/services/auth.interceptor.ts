import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS} from "@angular/common/http"
import { createInjectableType } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginComponent } from "../pages/login/login.component";
import { LoginService } from "./login.service";

const TOKEN_HEADER = "Authorization";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

   constructor(private loginservice:LoginService)
   {

   }


    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
        ): Observable<HttpEvent<any>> {
       

            //add the jwt token from ls in apis
            let authReq = req;
            const token = this.loginservice.getToken();
            console.log("Inside inter ceptor")
            if(token!=null)
            {
              authReq=authReq.clone({
                setHeaders:{Authorization:`Bearer ${token}`},
              });
            }
            return next.handle(authReq);
    }

}
export const authInterceptorProviders=
[
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true,
    }
]