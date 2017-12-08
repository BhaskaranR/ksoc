import { Store } from '@ngrx/store';
import { User } from '../../core/user-data/user-model';
import { Observable, Subscription } from 'rxjs/Rx';
import { AnimationTransitionEvent, Component, OnInit } from '@angular/core';
import * as fromRoot from '../../reducers';
import { ObservableMedia } from '@angular/flex-layout';
import * as fromProfile from '../../core/profile-data/profile.selector';

@Component({
  selector: 'app-karma-points',
  templateUrl: './karma-points.component.html',
  styleUrls: ['./karma-points.component.css']
})
export class KarmaPointsComponent implements OnInit {
  globalChartOptions: any = {
    responsive: true,
    legend: {
      display: false,
      position: 'bottom'
    }
  };
  public mediaChange;
  subscriptions: Subscription[] = [];

  activeTransitionAnimation: boolean;
  fireTransition: string;
  activeLinkIndex: number = 0;

  meid: string;

  currentMedia: string;

  private user$: Observable<User>;


  constructor(protected store: Store<fromRoot.AppState>,
    public _media: ObservableMedia) {

    this.user$ = store.select(fromProfile.getMe);

    this.subscriptions.push(this.store.select(fromProfile.getMeId).subscribe((id) => {
      this.meid = id
    }));
  }

  ngOnInit() {
  }


  isOver(): boolean {
    return (this.currentMedia == "sm" || this.currentMedia == "xs")
  }

  ngOnDestroy() {
    this.subscriptions.map(subs => subs.unsubscribe());
  }

  doughnutChartColors: any[] = [{
    backgroundColor: ['#f44336', '#3f51b5', '#ffeb3b', '#4caf50', '#2196f']
  }];
  doughnutChartLabels: string[] = ['Food & Wine'];
  doughnutChartData: number[] = [350];
  doughnutChartType = 'doughnut';
  doughnutOptions: any = Object.assign({
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  }, this.globalChartOptions);

  // Bar Chart Stacked
  barChartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData: any[] = [{
    data: [6, 5, 8, 8, 5, 5, 4],
    label: 'Series A',
    borderWidth: 0
  }];
  barChartOptions: any = Object.assign({
    scaleShowVerticalLines: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        position: 'left',
        ticks: {
          beginAtZero: true,
          suggestedMax: 9
        }
      }]
    }
  }, this.globalChartOptions);


}
