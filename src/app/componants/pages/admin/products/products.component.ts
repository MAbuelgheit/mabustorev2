import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductService } from '../../../../services/productService/product.service';
import lodash from 'lodash';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements AfterViewInit {
  displayedColumns: string[] = ['image', 'name', 'category', 'price', 'action'];
  dataSource!: MatTableDataSource<any>;
  apiResponse: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(router: Router, private _pService: ProductService) {}

  ngAfterViewInit() {
    this._pService.getProducts().subscribe((products) => {
      this.apiResponse = products;
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onDelete(pID: string) {
    this._pService.deleteProduct(pID);
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
    this.dataSource.sort = this.sort;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
      this.dataSource.sort = this.sort;
    }
  }
}
