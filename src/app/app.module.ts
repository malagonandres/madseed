import 'core-js';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from  './components/app.component';
// import { enableProdMode } from '@angular/core';

// enableProdMode();
@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]

})
export class AppModule{}
