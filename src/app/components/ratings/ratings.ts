import { Component } from '@angular/core';

@Component({
    selector : 'ratings',
    template : `
        <div class="rating small">
            <i style='cursor: pointer'
                    (click)='setRatings(i)'
                    [class]="i <= ratings ? 'material-icons on' : 'material-icons'"
                    *ngFor="let i of getCount()">
        star</i>
        </div>
    `,
    inputs: ['ratings', 'totalStars', 'clickable'],
    outputs: ['ratings']
})

export class RatingsComponent {
    ratings;
    totalStars;
    clickable = false;
    getCount() {
        let array = [];
        for (let i = 0; i < this.totalStars; i++) {
            array.push(i);
        }
        return array;
    }
    setRatings(i) {
        if (this.clickable) {
            this.ratings = i;
        }
    }
}
