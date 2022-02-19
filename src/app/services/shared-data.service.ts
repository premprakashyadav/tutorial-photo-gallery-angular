import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataProvider  {
  public userEmail;
  public imageLists: any[] = [];
  public imagemincount: any;
  constructor(
    // public network: Network,
    // public camera: Camera,
    // public imagePicker: ImagePicker,
    // public photoViewer: PhotoViewer
    ) {
    console.log('Hello SharedDataProvider Provider');
  }
  CheckInternet() {
   // this.network.onConnect().subscribe(() => { });
  }

  // openCamera(imglength) {
  //   this.imageLists = imglength ? imglength : [];
  //   const options: CameraOptions = {
  //     quality: 50,
  //     //allowEdit: true,
  //     //targetWidth: 400,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   }
  //   return this.camera.getPicture(options).then((imageData) => {
  //     this.imageLists.push(imageData);
  //     return this.imageLists;
  //   }, (err) => {
  //   });
  // }


  // openImagePicker(imglength) {
  //   this.imageLists = imglength ? imglength : [];
  //   this.imagemincount = this.imageLists.length;
  //   if (this.imagemincount >= 5 && this.imagemincount < 8) {
  //     this.imagemincount = 8 - this.imagemincount;
  //   } else {
  //     if (this.imagemincount >= 0 && this.imagemincount < 5) {
  //       this.imagemincount = 4;
  //     }
  //   }
  //   const options: ImagePickerOptions = {
  //     quality: 75,
  //     width: 400,
  //     // height: 500,
  //     outputType: 1,
  //     maximumImagesCount: this.imagemincount
  //   }
  //   return this.imagePicker.getPictures(options).then((results) => {
  //     for (var i = 0; i < results.length; i++) {
  //       if (results !== "OK")
  //         this.imageLists.push(results[i]);

  //     }
  //     return this.imageLists;
  //   }, (err) => {
  //     console.log("Error occurred while loading", err);
  //   });

  // };


  // viewImages(imgUrl) {
  //   this.photoViewer.show(imgUrl);
  // }
}

