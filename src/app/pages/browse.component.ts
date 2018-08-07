import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';

@Component({
    selector: 'app-browse',
    templateUrl: './browse.component.html',
    styleUrls: ['./browse.component.sass']
})
export class BrowseComponent implements OnInit {

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

}
