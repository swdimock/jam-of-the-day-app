import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';

@Component({
    selector: 'app-browse',
    templateUrl: './browse.component.html',
    styleUrls: ['./browse.component.sass']
})
export class BrowseComponent implements OnInit {

    public jams: any = [];
    public highscore: any;

    constructor(
        private _api: ApiService
    ) {
    }

    ngOnInit() {
        this.getAllJams();
        this.getHighscore();
    }

    getAllJams() {
        this._api.getJams()
            .subscribe(
                result => {
                    this.jams = result;
                });
    }

    getHighscore() {
        this._api.getHighScoreJammer()
            .subscribe(
                result => {
                    this.highscore = result[0];
                });
    }

}
