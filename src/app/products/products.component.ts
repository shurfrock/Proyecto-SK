import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = JSON.parse(localStorage.getItem('products') || '[]');

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  deleteProduct(productId: number) {
    this.products = this.products.filter((product: any) => product.productId !== productId);
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  clickEditProduct(productId: number){
    this.router.navigate(['products', productId]);
  }
}
