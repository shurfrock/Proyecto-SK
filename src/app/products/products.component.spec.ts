import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { By } from '@angular/platform-browser';
import { ExchangeService } from '../exchange.service';
import { HttpClientModule } from '@angular/common/http';
// import { of } from 'rxjs';
// import { ExchangeService } from '../exchange.service';

/* Mock request
const exchangeServiceMock = {
  getLatestEURPrice: jasmine.createSpy('getLatestEURPrice').and.returnValue(of({ rates: { MXN: '18' } }))
}
*/

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent ],
      imports: [HttpClientModule],
      providers: [ExchangeService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
  });

  it('should render table', () => {
    // inicializar componente con 2 productos
    component.products = [{
      productId: 1,
      productName: 'FirstProduct',
      productCost: '100',
      productAmount: '200'
    }, {
      productId: 2,
      productName: 'SecondProduct',
      productCost: '200',
      productAmount: '100'
    }];

    // el precio del euro debe ser 0 al principio, antes de que se haga la llamada
    expect(component.eurPrice).toBe(0);
    fixture.detectChanges();
    component.ngOnInit()
    expect(component.eurPrice).toBeGreaterThan(0);

    // revisamos que la tabla se haya mostrado y que tenga los 2 productos
    const rows = fixture.debugElement.queryAll(By.css('tr'));
    expect(rows.length).toBe(3);

    expect(rows[1].nativeElement.textContent).toContain('FirstProduct');
    expect(rows[1].nativeElement.textContent).toContain(`${+component.products[0].productCost * component.eurPrice}`);

    expect(rows[2].nativeElement.textContent).toContain('SecondProduct');
    expect(rows[2].nativeElement.textContent).toContain(`${+component.products[1].productCost * component.eurPrice}`);
  });
});
