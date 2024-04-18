import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { CategoryService } from '../../../services/categoryService/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/productService/product.service';
import { product } from '../../../product.interface';
export interface param {
  ID: string;
}
@Component({
  selector: 'app-product-form-update',
  templateUrl: './product-form-update.component.html',
  styleUrl: './product-form-update.component.css',
})
export class ProductFormUpdateComponent {
  // pName: string = '';
  // pPrice: string = '';
  // pCategory: string = '';
  // pImgURL: string = '';
  constructor(
    private _cService: CategoryService,
    private _pService: ProductService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  param = this.route.snapshot.params as param;
  pID = this.param.ID;
  getData = this._pService.getProductById(this.pID).subscribe((doc) => {
    if (doc.exists) {
      const data = doc.data() as product;
      if (this.form) {
        this.form.patchValue({
          name: data.name,
          price: data.price,
          category: data.category,
          imgURL: data.imgURL,
        });
      }
    } else {
      console.log('No document found');
    }
  });
  form = this.formBuilder.group({
    name: new FormControl(),
    price: new FormControl(),
    category: new FormControl(),
    imgURL: new FormControl(),
  });

  categories$ = this._cService.getCategories();

  onSubmit() {
    this._pService.updateProduct(this.pID, this.form.value).then(
      // Handle successful update (optional)
      () => this.router.navigate(['admin/products/']),
      (error) => {
        // Handle errors during update (optional)
        console.error('Error updating product:', error);
      }
    );
  }
}
