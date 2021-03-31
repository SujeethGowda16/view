import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
       product:object;
  constructor(private hc:HttpClient) { }

    addProduct(userObj:object):Observable<any>{
      return this.hc.post("/product/addproduct",userObj)
    }

  
    getproduct():Observable<any>{
      return this.hc.get("/product/abc")
    }

   editProduct(obj:object):Observable<any>{
     return this.hc.put("/product/updateproduct",obj)
    }
  
}
