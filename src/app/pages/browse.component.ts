import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';

@Component({
    selector: 'app-browse',
    templateUrl: './browse.component.html',
    styleUrls: ['./browse.component.sass']
})
export class BrowseComponent implements OnInit {

    public jams: any = [];

    constructor(
        private _api: ApiService
    ) {
    }

    ngOnInit() {
        this.getAllJams();
    }

    getAllJams() {
        this._api.getAllJams()
            .subscribe(
                result => {
                    this.jams = result;
                });
    }

}
