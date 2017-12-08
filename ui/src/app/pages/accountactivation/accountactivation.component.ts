import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountActivationService } from './accountactivation.service';

@Component({
  selector: 'ks-accountactivation',
  templateUrl: 'accountactivation.html',
  providers: [AccountActivationService]
})


export class AccountActivationComponent {

  private id: string;

  private loading: boolean;

  activated: boolean;

  constructor(private route: ActivatedRoute,
    private accountActivationService: AccountActivationService) {
    route.params.subscribe(params => { this.id = params['id']; 
      this.activateAccount(this.id);});

    this.loading = true;
  }

  activateAccount(id: string) {
   this.accountActivationService.activate(id)
      .subscribe(response => {
        this.activated = response["isEmailConfirmed"];
      },
      error => {
        console.error('User activation failed ' + JSON.stringify(error));
      });
      
  }
}
