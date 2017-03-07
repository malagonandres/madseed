import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'my-app',
    template: '<h1>{{text}}</h1>'
})

export class AppComponent implements OnInit{
    text:string = 'BECOME MADNESS !';

    ngOnInit(){
        console.log(this.text);
    }
}