import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent {
    title = 'app';
    menu = false;

    constructor(
    ) {
    }

    toggleMenu() {
        this.menu = !this.menu;
    }
}
