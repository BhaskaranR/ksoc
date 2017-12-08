import { VgAPI } from 'videogular2/core';
import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-feeds',
  templateUrl: './video-feeds.component.html',
  styleUrls: ['./video-feeds.component.css']
})
export class VideoFeedsComponent implements OnInit {
  elem: any;
  isGalleryView :boolean = true;
  sources = [
        {
            src: "http://static.videogular.com/assets/videos/videogular.mp4",
            thumbnail:"https://unsplash.it/700/480/?random",
            title:'101',
            uploader:"Fun Fun Function"
        },
        {
            src: "http://static.videogular.com/assets/vtitleeos/videogular.ogg",
            thumbnail:"https://unsplash.it/700/480/?random",
            title:'102',
            uploader:"Fun Fun Function"
        },
        {
            src: "http://static.videogular.com/assets/vtitleeos/videogular.webm",
            thumbnail:"https://unsplash.it/700/480/?random",
            title:'103',
            uploader:"Fun Fun Function"
        },
           {
            src: "http://static.videogular.com/assets/videos/videogular.mp4",
            thumbnail:"https://unsplash.it/700/480/?random",
            title:'101',
            uploader:"Fun Fun Function"
        },
        {
            src: "http://static.videogular.com/assets/vtitleeos/videogular.ogg",
            thumbnail:"https://unsplash.it/700/480/?random",
            title:'102',
            uploader:"Fun Fun Function"
        },
        {
            src: "http://static.videogular.com/assets/vtitleeos/videogular.webm",
            thumbnail:"https://unsplash.it/700/480/?random",
            title:'103',
            uploader:"Fun Fun Function"
        },
          {
            src: "http://static.videogular.com/assets/videos/videogular.mp4",
            thumbnail:"https://unsplash.it/700/480/?random",
            title:'101',
            uploader:"Fun Fun Function"
        },
        {
            src: "http://static.videogular.com/assets/vtitleeos/videogular.ogg",
            thumbnail:"https://unsplash.it/700/480/?random",
            title:'102',
            uploader:"Fun Fun Function"
        },
        {
            src: "http://static.videogular.com/assets/vtitleeos/videogular.webm",
            thumbnail:"https://unsplash.it/700/480/?random",
            title:'103',
            uploader:"Fun Fun Function"
        },
           {
            src: "http://static.videogular.com/assets/videos/videogular.mp4",
            thumbnail:"https://unsplash.it/700/480/?random",
            title:'101',
            uploader:"Fun Fun Function"
        },
        {
            src: "http://static.videogular.com/assets/vtitleeos/videogular.ogg",
            thumbnail:"https://unsplash.it/700/480/?random",
            title:'102',
            uploader:"Fun Fun Function"
        },
        {
            src: "http://static.videogular.com/assets/vtitleeos/videogular.webm",
            thumbnail:"https://unsplash.it/700/480/?random",
            title:'103',
            uploader:"Fun Fun Function"
        }
    ];

  constructor() { }
  ngOnInit() {
  }
}
