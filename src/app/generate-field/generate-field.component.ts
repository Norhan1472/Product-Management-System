import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

class Field {
  value!: string;
  dependentField: Field | null;

  constructor(value: string, dependentField?: Field | null) {
    this.value = value;
    this.dependentField = dependentField || null;
  }
}
class Passenger {
  name!: string;
  address!: string;
  number!: string;
  email!: string;
  
  constructor(name: string, address: string, number: string, email: string) {
    this.name = name;
    this.address = address;
    this.number = number;
    this.email = email;
  }
}

@Component({
  selector: 'app-generate-field',
  templateUrl: './generate-field.component.html',
  styleUrls: ['./generate-field.component.css']
})
export class GenerateFieldComponent {
  /*fields: { value: string, readonly: boolean }[] = [];

  generateField() {
    this.fields.push({ value: '', readonly: false });
  }*/
  /*fields: Field[] = [];

  generateFields() {
    const field1 = new Field('Field 1');
    const field2 = new Field('Field 2', field1);
    this.fields.push(field1, field2);
  }*/
  form!: FormGroup;
  passengers: Passenger[] = [];

  ngOnInit() {
    this.passengers.push(new Passenger('', '', '', ''));
    this.form = new FormGroup({
      passengers: new FormArray(
        this.passengers.map(p => {
          return new FormGroup({
            name: new FormControl(p.name),
            address: new FormControl(p.address),
            number: new FormControl(p.number),
            email: new FormControl(p.email)
          });
        })
      )
    });
  }

  get passengerArray(): FormArray {
    return this.form.get('passengers') as FormArray;
  }

  addPassenger() {
    this.passengers.push(new Passenger('', '', '', ''));
    this.passengerArray.push(
      new FormGroup({
        name: new FormControl(''),
        address: new FormControl(''),
        number: new FormControl(''),
        email: new FormControl('')
      })
    );
  }
}
