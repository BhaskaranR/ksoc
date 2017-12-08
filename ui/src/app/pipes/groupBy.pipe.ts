import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'underscore';

@Pipe({ name: 'groupBy' })
export class GroupByPipe implements PipeTransform {

  transform(value: Array<any>, field: string): Array<any> {
    if (field === 'LAST_WEEK') {
      var posts = [];
      var weekEnd = moment().startOf('day').subtract(9, 'days').format('L');
      var weekStart = moment().startOf('day').subtract(15, 'days').format('L');

       value.filter(post => {
        var d = moment(post.modified_date).format('L');
        var formatDate = new Date(d);
        var formatWeekend = new Date(weekEnd);
        var formatWeekstart = new Date(weekStart)
        if (d && formatDate >= formatWeekstart && formatDate <= formatWeekend )
            posts.push(post);
        } );
        return posts;
    }
    else if(field === 'LAST_MONTH'){
        var lastMonthposts = [];
        value.filter(post => {
        var d = moment(post.modified_date).format('MM/YYYY');
        var lastMonth = moment(new Date()).subtract(1, 'month').format('MM/YYYY');
        if (d === lastMonth ){
          lastMonthposts.push(post);
        }
        })
      return lastMonthposts;
      }
    else {
      return value.filter(post => {
        return moment(post.modified_date).format('L') === field
      });
    }
  }
}
