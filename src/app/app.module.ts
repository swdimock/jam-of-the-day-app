import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home.component';
import {BrowseComponent} from './pages/browse.component';
import {UsersComponent} from './pages/users.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {SafePipe} from './pipes/safe';

import {MatButtonModule, MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        BrowseComponent,
        UsersComponent,
        SafePipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatButtonModule,
        MatInputModule,
        BrowserAnimationsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
