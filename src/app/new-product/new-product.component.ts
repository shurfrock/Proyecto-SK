import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  newProductForm = new FormGroup({
    productName : new FormControl('', Validators.required),
    productAmount : new FormControl('', Validators.required),
    productCost : new FormControl('', Validators.required)
  });

  onSubmit(){
    const productId = new Date().getTime();
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const newProduct = {
      ...this.newProductForm.value,
      productId,
    };
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    this.router.navigate(['/products']);
  }


}
