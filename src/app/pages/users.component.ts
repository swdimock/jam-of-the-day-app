import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {

    public jammers: any = [];

    constructor(
        private _api: ApiService
    ) {
    }

    ngOnInit() {
        this.getAllJammers();
    }

    getAllJammers() {
        this._api.getAllJammers()
            .subscribe(
                result => {
                    this.jammers = result;
                });
    }

    openUserDialog() {
        alert('Wish that worked...');
    }

}
