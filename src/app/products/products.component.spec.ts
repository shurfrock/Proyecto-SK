import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ExchangeService } from '../exchange.service';

const exchangeServiceMock = {
  getLatestEURPrice: jasmine.createSpy('getLatestEURPrice').and.returnValue(of({ rates: { MXN: '18' } }))
}

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent ],
      providers: [
        { provide: ExchangeService, useValue: exchangeServiceMock },
      ],
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
    // después de la llamada a la API esperamos que el precio sea 18
    expect(exchangeServiceMock.getLatestEURPrice).toHaveBeenCalled();
    expect(component.eurPrice).toBe(18);

    // revisamos que la tabla se haya mostrado y que tenga los 2 productos
    const rows = fixture.debugElement.queryAll(By.css('tr'));
    expect(rows.length).toBe(3);

    expect(rows[1].nativeElement.textContent).toContain('FirstProduct');
    // 1800 porque el costo es 100 y el precio del euro es 18. 100*18=1800
    expect(rows[1].nativeElement.textContent).toContain('1800');

    expect(rows[2].nativeElement.textContent).toContain('SecondProduct');
    // 3600 porque el costo es 200 y el precio del euro es 18. 200*18=3600
    expect(rows[2].nativeElement.textContent).toContain('3600');
  });
});
