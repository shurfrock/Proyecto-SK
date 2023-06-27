import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/types';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit, OnDestroy {
  productId!: string;
  product: Product | undefined
  products: Product[] = JSON.parse(localStorage.getItem('products') || '[]') as Product[];
  private sub: Subscription;
  newProductForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.sub = this.route.params.subscribe(params => {
      this.productId = params['productId'];
    });

    this.product = this.products.find((product: Product) => product.productId.toString() === this.productId);
    this.newProductForm = new FormGroup({
      productName : new FormControl(this.product?.productName, Validators.required),
      productAmount : new FormControl(this.product?.productAmount, Validators.required),
      productCost : new FormControl(this.product?.productCost, Validators.required)
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  /*
    Actualizamos el producto que se quiere modificar en el arreglo de objetos.
    Sobreescribimos el arreglo actual.
    Redirigimos al usuario de nuevo a la tabla de productos
  */
  onSubmit(){
    const newProducts = this.products.map(product => {
      if (product.productId.toString() === this.productId) {
        return {
          ...this.newProductForm.value,
          productId: this.productId, 
        }
      }

      return product
    })
    localStorage.setItem('products', JSON.stringify(newProducts));
    this.router.navigate(['/products']);
  }

}
