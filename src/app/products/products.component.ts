import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = JSON.parse(localStorage.getItem('products') || '[]');

  constructor() { }

  ngOnInit(): void {
  }

  deleteProduct(productId: number) {
    this.products = this.products.filter((product: any) => product.productId !== productId);
    localStorage.setItem('products', JSON.stringify(this.products));
  }
}
