import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { productService } from '../../../services/product.service';
import { Products } from '../../../models/products';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-products',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  userRole: string = 'guest';
  productId: number = 0;
  product: Products = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    image: '',
    imageUrl: '',
  };
  cards: Products[] = [];
  count: number = 0;
  constructor(
    private authService: AuthService,
    private router: Router,
    private productService: productService,
    private alertservice: AlertService
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((response) => {
      if (Array.isArray(response)) {
        this.cards = response;
      } else {
        console.error('Expected an array, but got:', response);
      }
    });
    this.authService.getUserRole().subscribe((roles: string) => {
      this.userRole = roles[0];
    });
  }

  onEdit(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.router.navigate(['/edit-Product', product.id]);
        // this.openEdit(this.product.id);
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
        alert('Failed to fetch product details.');
      },
    });
  }

  openDeleteModal(id: number): void {
    this.productId = id; // Store the ID of the product to be deleted
  }

  performDeletion(id: number): void {
    this.productService.deleteProduct(this.productId + 1).subscribe({
      next: (response) => {
        console.log(response);
        if (Array.isArray(response[0])) {
          this.alertservice.showAlert(response, 'alert-success', true);
        } else {
          this.alertservice.showAlert(
            `Expected an array, but got:/${response[0]}`,
            'alert-warning',
            true
          ); //response
        }

        // Refresh the product list after deletion
        this.productService.getAllProducts().subscribe((response) => {
          if (Array.isArray(response)) {
            this.cards = response;
          }
        });
      },
      error: (error) => {
        console.error('Failed to delete product:', error);
        this.alertservice.showAlert(
          'Error deleting product. Please try again.',
          'alert-warning',
          true
        );
      },
    });
  }

  closePopup(): void {
    // Close the modal by clearing the productId
    this.productId = 0;
  }

  redirectToAddCategory() {
    this.router.navigate(['/add-product']);
  }
}
