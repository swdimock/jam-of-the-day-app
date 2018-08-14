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

    getAllJammers(): void {
        this._api.getAllJammers(false, true)
            .subscribe(
                result => {
                    this.jammers = result;
                });
    }

    toggleJammerStatus(jammer: any): void {

        const status = !!jammer.status ? 0 : 1;

        this._api.updateJammerStatus(jammer.id, status)
            .subscribe(
                result => {
                    const index = this.jammers.findIndex(j => j.id === jammer.id);
                    this.jammers[index] = {
                        id: jammer.id,
                        name: jammer.name,
                        status: result
                    };
                });
    }

    addNewJammer(name: string): void {

        this._api.putNewJammer(name)
            .subscribe(
                result => {
                    console.log(result);
                    // Add the new user to the jammers
                    this.jammers.push({
                        id: result,
                        name: name,
                        status: 1
                    });

                    // Re-sort the array
                    this.jammers.sort(this._sort('name'));
                });
    }

    deleteJammer(id: number): void {

        this._api.deleteJammerById(id)
            .subscribe(
                result => {
                    console.log(result);
                    // Remove the jammer from the list
                    const index = this.jammers.findIndex(j => j.id === id);
                    this.jammers.splice(index, 1);
                    console.log(this.jammers);
                });
    }

    private _sort(propertyName: string) {
        let sortOrder = 1;
        if (propertyName[0] === '-') {
            sortOrder = -1;
            propertyName = propertyName.substr(1);
        }
        return function (a, b) {
            const result = (a[propertyName] < b[propertyName]) ? -1 : (a[propertyName] > b[propertyName]) ? 1 : 0;
            return result * sortOrder;
        };
    }
}
