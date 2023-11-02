import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ERROR_MESSAGES, LABELS_MESSAGES } from '../utilities/messages';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  user: any;
  error: boolean = false;
  errorMessage: any = ERROR_MESSAGES;
  labelMessage: any = LABELS_MESSAGES;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService
  ) {
    this.route.paramMap.subscribe((params) => {
      const usr = params.get('login');

      if (!usr) {
        this.router.navigate(['home']);
      } else {
        this.searchService.fetchUserData(usr).subscribe({
          next: (data: any) => {
            this.user = data;
          },
          error: () => {
            this.error = true;
            setTimeout(() => {
              this.router.navigate(['home']);
            }, 3000);
          },
        });
      }
    });
  }
}
