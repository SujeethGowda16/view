import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  productname:any;
  product:any;
  username:string;
  constructor(private service:ServiceService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    console.log(this.username)
     this.productname=this.route.snapshot.params['productname'];
     console.log(this.productname)
     this.service.getOneProduct(this.productname).subscribe(
      res=>{
            this.product=res["message"]
            console.log(this.product)
      },
      err=>{
        console.log(err)
      }
    )
  }   
  
  buy(){
    if(this.username==null){
      alert("please signin to continue")
    }
    else{
    alert("product ordered")
    }
  }

   cart(){
    if(this.username==null){
      alert("please signin to continue")
    }
    else{
      let usersname=this.username
      this.product[0].username=usersname
      this.service.addCart(this.product[0]).subscribe(
        res=>{
          if(res["message"]=="added to cart"){
          console.log("success")
            console.log(res)
            alert("Product is added to cart")
          }
          if(res["message"]=="existed in cart"){
             console.log("product in cart")
              alert("product is already carted")
           }
        },
        err=>{
          console.log(err)
        }
      )
    }
   }
}
