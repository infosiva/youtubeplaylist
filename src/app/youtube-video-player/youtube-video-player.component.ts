import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { YouTubeApiService } from '../services/youtube-api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'video-player',   
  templateUrl: 'youtube-video-player.component.html'
})
export class YoutubeVideoPlayerComponent
{
  videoDetails: any
  safeURL: any
  name:string;
  id: string; 
  routeParamssub: any;
  queryParamssub: any;
  baseUrl:string = 'https://www.youtube.com/embed/';
  constructor(@Inject(YouTubeApiService) private youtubeApiService: YouTubeApiService, private sanitizer: DomSanitizer, public router: Router, public route: ActivatedRoute) { }
  ngOnInit() {
    this.queryParamssub = this.route.queryParams
      .subscribe(params => 
        {
        this.id = params ['id'];
        this.videoDetails = params;
      });
    this.routeParamssub = this.route.params.subscribe(params => {
      this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + this.id);           
  });
  }
  backlist()
  {
    this.router.navigate(['/'], 
    { queryParams: {
        token : this.videoDetails.token
    }, skipLocationChange: true });    
  }
  ngOnDestroy() {
    this.routeParamssub.unsubscribe();
    this.queryParamssub.unsubscribe();
  }   
}