import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  angForm: FormGroup
  defaut: boolean
  errGrandNbChar: boolean
  errPetitNbChar: boolean
  errSpChar: boolean

  constructor(private fb: FormBuilder, public dataService: ApiService, private router: Router) {
    this.angForm = this.fb.group({
      identifiant: ['', [Validators.required, Validators.minLength(4), Validators.minLength(5)]]
    });
    this.defaut = true
    this.errGrandNbChar = false
    this.errPetitNbChar = false
    this.errSpChar = false
    this.surveilleChamp()
  }

  ngOnInit() {
  }

  /**
   * Surveille le champ de connexion,
   * actualise les booléens sur lesquels s'appuie le formatage du champ
   */
  surveilleChamp(){
    this.angForm.valueChanges.subscribe(x => {
      const str = x.identifiant
      this.defaut = true
      this.errSpChar = false
      this.errPetitNbChar = false
      this.errGrandNbChar = false
      if (str.length != 0) this.defaut = false
      if (str.length < 4 && str.length != 0) this.errPetitNbChar = true
      if (str.length > 5) this.errGrandNbChar = true
      if (!this.dataService.onlyLettersAndNumbers(str)) this.errSpChar = true
    })
  }
}