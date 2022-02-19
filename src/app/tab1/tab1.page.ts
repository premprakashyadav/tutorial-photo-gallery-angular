import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  imageFilePath;
  imgRes = [];
  constructor() {}
  imageFilePath_change(event) {
    console.log(event);
    this.imgRes.push(event);
  }

}
