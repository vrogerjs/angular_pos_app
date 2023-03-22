import { Component } from '@angular/core';
import { CategoryService } from '@core/services/category.service';
import { ProductService } from '@core/services/product.service';
import {
  InvoicePageService,
  InvoiceProduct,
} from '@core/services/invoice-page.service';
import { fadeIn } from '@app/animations/fadeIn.animation';
import { ProductDetails } from '@core/models/product.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss'],
  animations: [fadeIn],
})
export class CreateInvoiceComponent {
  categories$ = this.categoryService.all();
  products$ = this.productService.filterProducts();

  vm$ = this.invoicePageService.state$;

  code = new FormControl('');
  client = new FormControl('');
  details = new FormControl('');

  public invoice: any = new FormControl({});

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private invoicePageService: InvoicePageService
  ) {
    let me = this;

    // Execute with the observer object
    this.vm$.subscribe(
      (x: any) => {
        if (x.invoiceDetails) {
          let { code, client, details } = x.invoiceDetails;
          me.code.setValue(code);
          me.client.setValue(client);
          me.details.setValue(details);
        }
      },
      (err) => console.error('Observer got an error: ' + err),
      () => console.log('Observer got a complete notification')
    );
  }

  onChange(event: Event) {
    this.invoicePageService.changeInvoice({
      details: (event.target as any).value,
    });
  }

  handleProductSearch(event: any): void {
    const query = event.target.value;
    console.log(query);
    this.products$ = this.productService.filterProducts(query);
  }

  setActiveCategory(categoryId: number): void {
    this.invoicePageService.setActiveCategory(categoryId);
    this.products$ = this.productService.filterProducts(undefined, categoryId);
  }

  addItem(product: ProductDetails, invoiceProducts: InvoiceProduct[]): void {
    const item = invoiceProducts.find((x) => x.product.id === product.id);
    if (item) {
      if (item.product.stock.quantity <= item.count) {
        return;
      }
    }
    if (product.stock.quantity > 0) {
      this.invoicePageService.addInvoiceProduct(product);
    }
  }

  removeItem(productId: number): void {
    this.invoicePageService.removeInvoiceProduct(productId);
  }

  increaseItemQuantity(productId: number): void {
    this.invoicePageService.changeProductQuantity(productId, 'plus');
  }

  editItemQuantity(e: any) {
    this.invoicePageService.changeProductQuantity(
      e.id,
      'value',
      +e.target.value
    );
  }

  decreaseItemQuantity(productId: number): void {
    this.invoicePageService.changeProductQuantity(productId, 'minus');
  }

  createInvoice(): void {
    this.invoicePageService.createInvoice({
      code: this.code.value,
      client: this.client.value
    });
    this.code.setValue(null);
    this.client.setValue(null);
    this.details.setValue(null);
    this.invoicePageService.reset();
  }

  updateInvoice(): void {
    this.invoicePageService.updateInvoice({
      code: this.code.value,
      client: this.client.value
    });
    this.invoicePageService.reset();
  }

  payInvoice(): void {
    this.invoicePageService.payInvoice();
  }

  printInvoice(): void {
    window.print();
  }
}
