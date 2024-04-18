import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductService } from './../../../services/productService/product.service';
import { CategoryService } from '../../../services/categoryService/category.service';
import { CategoryFilterService } from '../../../services/general/category-filter.service';
import * as lodash from 'lodash';
import { product } from './../../../product.interface';
import { ShoppingCartService } from '../../../services/general/shopping-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  categories$: any;
  displayedColumns: string[] = ['card'];
  dataSource!: MatTableDataSource<any>;
  apiResponse: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private cartService: ShoppingCartService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private categoryFilterService: CategoryFilterService
  ) {
    productService.getProducts().subscribe((products) => {
      this.dataSource = new MatTableDataSource(products);
      this.apiResponse = products;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.categories$ = categoryService.getCategories();
  }
  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }

    const filterValue = (event.target as HTMLInputElement).value;
    let filterV = filterValue.trim().toLowerCase();
    const filteredData = lodash.filter(this.apiResponse, (products) => {
      return products.name.toLowerCase().includes(filterV);
    });
    this.dataSource = new MatTableDataSource(filteredData);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  async getItemByCategory(categoryName: string) {
    // const products = await this.categoryFilterService
    //   .getItems(categoryName)
    //   .valueChanges()
    //   .toPromise();
    // console.log(products);
    // this.dataSource = new MatTableDataSource();
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

    // const filterValue = categoryName;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }

    const filteredData = lodash.filter(this.apiResponse, (products) => {
      return products.category.toLowerCase() == categoryName.toLowerCase();
    });
    if (categoryName !== '') {
      this.dataSource = new MatTableDataSource(filteredData);
    } else {
      this.dataSource = new MatTableDataSource(this.apiResponse);
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  addToCart(product: product) {
    this.cartService.addToCart(product);
    console.log(product);
  }
}
