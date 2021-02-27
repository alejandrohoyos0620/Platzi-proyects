import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '@core/services/products/products.service';
import { MyValidators } from '@utils/validators';

import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  form: FormGroup;
  image$: Observable<any>;
  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private Storage: AngularFireStorage,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  saveProduct(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.productsService.createProduct(product).subscribe((newproduct) => {
        console.log(newproduct);
        this.router.navigate(['./admin/products']);
      });
    }
    console.log(this.form.value);
  }

  uploadFile(event): void {
    const file = event.target.files[0];
    const name = 'image.png';
    const fileRef = this.Storage.ref(name);
    const task = this.Storage.upload(name, file);

    task.snapshotChanges()
      .pipe(
        finalize(() => {
          this.image$ = fileRef.getDownloadURL();
          this.image$.subscribe(url => {
            this.form.get('image').setValue(url);
          });
        }
        )
      ).subscribe();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      price: [0, [Validators.required, MyValidators.isPriceValid]],
      image: '',
      description: ['', [Validators.required]]
    });
  }

  get priceField(): any {
    return this.form.get('price');
  }

}
