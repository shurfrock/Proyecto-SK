import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExchangeService } from '../exchange.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  eurPrice: number = 0
  products = JSON.parse(localStorage.getItem('products') || '[]');

  constructor(private router: Router, private exchangeService: ExchangeService) { }

  ngOnInit(): void {
    // Hacer una llamada a la API para obtener el último precio del euro en pesos mexicanos
    this.exchangeService.getLatestEURPrice().subscribe(response => {
      this.eurPrice = response.rates['MXN']
    })
  }

  /*
  En la funcion de eliminar, estamos filtrando los productos del localstorage para eliminar el que se seleccionó
  Por último sobreescribimos los productos del local storage con los productos recién filtrados
  */

  deleteProduct(productId: number) {
    this.products = this.products.filter((product: any) => product.productId !== productId);
    localStorage.setItem('products', JSON.stringify(this.products));
  }
  
  /*
    Redirigir al usuario a la ruta de editar productos pasando el productId como parámetro en la URL
  */
  clickEditProduct(productId: number){
    this.router.navigate(['products', productId]);
  }
  
}
