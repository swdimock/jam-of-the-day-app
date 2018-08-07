import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';

export interface Jammer {
    id: number;
    name: string;
    status: number;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

    public jammer: any;
    public original: Jammer;
    public error: string = null;
    public jam: any = null;

    constructor(
        private _api: ApiService
    ) {
    }

    ngOnInit() {
        // Establish the jammer for the day
        this.getTodaysJammer();

        // Check whether there's a current jam set for the day
        this.getTodaysJam();
    }

    getTodaysJammer(): void {
        // Get the ID of today's jammer
        this._api.getTodaysJammer()
            .subscribe(result => {
                const jammerId = result[0].jammer_id;

                // Get the Jammer object by ID
                this._api.getJammerById(jammerId)
                    .subscribe((j: Jammer) => {
                        this.jammer = j[0];
                        this.original = this.jammer;
                    });
            });
    }

    getTodaysJam(): void {
        this._api.getHistoricJam()
            .subscribe(
                result => {
                    if (result[length]) {
                        this.jam = result[0];
                    }
                });
    }

    getWildCardJam(): void {
        this._api.getWildCardJam()
            .subscribe(
                result => {
                    // Handle legacy urls which don't provide the embed URL
                    if (result[0].embed === '') {
                        result[0].embed = this._extractEmbedUrl(result[0].link);
                    }
                    this.jam = result[0];
                }
            );
    }

    getJamByYoutubeId($youtube) {

        this.error = '';

        if ($youtube === '') {
            this.error = 'Hey now.  You need to add something!';
            return;
        }

        this._api.putNewJam(this.jammer.id, $youtube)
            .subscribe(
                result => {
                    console.log(result);
                    this.jam = result;
                },
                error => {
                    console.warn(error);
                    this.error = 'That didn\'t work.  Are you sure that\'s the right ID?';
                });
    }

    getNewJammer(): void {
        this._api.getRandomJammer(this.original.id)
            .subscribe(d => {
                this.jammer = d;
            });
    }

    private _extractEmbedUrl($link) {
        const url = $link.split('=');
        console.log(url[1]);
        return 'https://www.youtube.com/embed/' + url[1] + '?rel=0&amp;controls=0&amp;showinfo=0';
    }

}
