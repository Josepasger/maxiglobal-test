import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';



@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  useForm = new FormGroup({
    gitName: new FormControl("", [Validators.required, Validators.pattern(/(\w+)?maxiglobal|MAXIGLOBAL|\/|\\\w+/), Validators.minLength(4)])
  })

  verifyName() {



  };

}
