import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
       product:object;
  constructor(private hc:HttpClient) { }

    addUser(userObj:object):Observable<any>{
      return this.hc.post("/user/register",userObj);
    }

   loginUser(userObj:object):Observable<any>{
      return this.hc.post("/user/login",userObj)
    }

    addProduct(userObj:object):Observable<any>{
      return this.hc.post("/product/addproduct",userObj)
    }

  
    getproduct():Observable<any>{
      return this.hc.get("/product/abc")
    }

   editProduct(obj:object):Observable<any>{
     return this.hc.put("/product/updateproduct",obj)
    }

    deleteProduct(obj:object):Observable<any>{
      console.log("from delete product",obj)
      return this.hc.post("/product/removeproduct",obj)
    }
    
    // Carousel
    uploadCarousel(obj:object):Observable<any>{
      return this.hc.post("/admin/addcarousel",obj)
    }
   
    getcarousel():Observable<any>{
      return this.hc.get("/admin/def")
    }

    editcarousel(obj:object):Observable<any>{
      return this.hc.put("/admin/updatecarousel",obj)
     }
 
     deletecarousel(obj:object):Observable<any>{
       console.log("from delete product",obj)
       return this.hc.post("/admin/removecarousel",obj)
     }

      getOneProduct(productname:string){
        return this.hc.get("/product/oneproduct/"+productname)
      }

      addCart(product:object):Observable<any>{
        return this.hc.post("/cart/addtocart",product)
      }

      getCart(username:string):Observable<any>{
         return this.hc.get("/cart/getcart/"+username)
      }
     
}
