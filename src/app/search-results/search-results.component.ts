import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from '../services/search.service';
import { forkJoin, Subscription } from 'rxjs';
import { ERROR_MESSAGES, LABELS_MESSAGES } from '../utilities/messages';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ChartService } from '../services/chart.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  animations: [
    trigger('fadeInDown', [
      state('void', style({ transform: 'translateY(-20px)', opacity: 0 })),
      transition(':enter', animate('0.5s ease')),
    ]),
    trigger('tableEnter', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition('void => *', animate('300ms ease-out')),
    ]),
  ],
})
export class SearchResultsComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  loading = false;
  error = false;
  tableVisible = false;
  alertVisible = false;
  alert2Visible = false;
  showGraph = false;
  usuarios: any[] = [];
  loginUsers: string[] = [];
  followersTotal: number[] = [];
  chartData: any = null;
  nombre: string = '';
  messageTable: string = '';
  errorMessage: any = ERROR_MESSAGES;
  labelMessage: any = LABELS_MESSAGES;

  private subscription: Subscription = new Subscription();

  constructor(
    private searchService: SearchService,
    private chartService: ChartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  get name() {
    return this.form.get('name');
  }

  showTable() {
    this.tableVisible = true;
  }

  searchUsers() {
    if (this.form.invalid || this.nombre.toLowerCase() === 'maxiglobal') {
      return;
    }

    const name = this.name?.value;
    this.loading = true;
    this.error = false;
    this.tableVisible = false;
    this.chartData = null;

    this.subscription = this.searchService.fetchUsers(name).subscribe({
      next: (data: any) => {
        this.usuarios = data.items.slice(0, 10);
        this.loginUsers = this.usuarios.map((user) => user.login);

        if (this.usuarios.length === 0) {
          this.alertVisible = true;
        } else {
          this.alertVisible = false;
          this.fetchFollowersTotals();
          this.showTable();
        }

        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      },
    });
  }

  fetchFollowersTotals() {
    const observables = this.usuarios.map((user) =>
      this.searchService.fetchFollowers(user)
    );

    forkJoin(observables).subscribe(
      (followersTotals: (any | null)[]) => {
        this.followersTotal = followersTotals
          .filter((followers) => !!followers)
          .map((followers) => (followers ? followers.length : 0));
        this.showChart();
      },
      () => {
        this.messageTable = ERROR_MESSAGES.getUserError;
        this.alert2Visible = true;
      }
    );
  }

  showChart() {
    this.chartService.setLoginUsers(this.loginUsers);
    this.chartService.setTotalFollowers(this.followersTotal);
    this.showGraph = true;
  }

  redirectToUserDetails(user: any) {
    if (user.score >= 30) {
      this.alert2Visible = false;
      this.router.navigate(['details', user.login]);
    } else {
      this.messageTable = ERROR_MESSAGES.cantConsultUser;
      this.alert2Visible = true;
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
