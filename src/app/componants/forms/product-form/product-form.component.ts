import { Component, inject } from '@angular/core';
import { CategoryService } from '../../../services/categoryService/category.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { ProductService } from '../../../services/productService/product.service';
import { Router } from '@angular/router';
import { product } from '../../../product.interface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  constructor(
    private _cService: CategoryService,
    private _pService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  form = this.formBuilder.group({
    name: new FormControl(''),
    price: new FormControl(0.0),
    category: new FormControl(''),
    imgURL: new FormControl(''),
  });

  categories$ = this._cService.getCategories();

  // private formData = this.form.getRawValue();
  // pName = this.formData.name;
  // pcategory = this.formData.category;
  onSubmit() {
    let formData = this.form.value as product;

    this._pService.addProduct(formData);
    this.router.navigate(['admin/products']);
  }
}
