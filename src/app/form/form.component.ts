import { Component, OnInit } from '@angular/core';
import { ISelectOption } from 'ngx-semantic/modules/select';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  phoneNumber: string = "";
  country: string = "";
  occupation: string = "";
  successful: string = "true";

  constructor(private toastr: ToastrService, private router: Router) { }

  countries: ISelectOption[] = []

  ngOnInit() {
    this.fetchCountries();
  }

  fetchCountries() {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then((data: any[]) => {
        this.countries = data.sort().map((c: any) => {
          return { text: c.name.common, value: c.cca2, image: { src: c.flags.png, avatar: false } }
        });
        this.countries.sort((a, b) => a.text.localeCompare(b.text));
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }

  occupations = [
    { text: 'Frontend Developer', value: 'frontend' },
    { text: 'Backend Developer', value: "backend" },
    { text: 'Designer', value: "design" },
    { text: 'Devops Engineer', value: "devops" },
  ];

  onSubmit() {
    if (this.firstName && this.lastName && this.email && this.phoneNumber && this.country && this.occupation) {
      if (this.successful == "true") {
        setTimeout(() => {
          this.router.navigate(['/success'])
        }, 5000)
        // Show success toastr notification
        this.toastr.success('Success!');
        // Redirect to success page
      } else {
        // Show error toastr notification for 5 seconds
        // Redirect back to the form page
        this.toastr.error("Failure!")
      }
    } else {
      this.toastr.error('All input required!');
      return
    }
  }
}

