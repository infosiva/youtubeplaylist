import { Component, Input, OnInit } from '@angular/core';
import { YouTubeApiService } from '../services/youtube-api.service';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'video-playlist',
    templateUrl: 'youtube-video-playlist.component.html'
})
export class YoutubeVideoPlayerListComponent implements OnInit{
    @Input('model') model : any;
    @Input('metadata') metadata : any;
    queryParamssub: any;
    id: string; 

    constructor(@Inject(YouTubeApiService) private youtubeApiService: YouTubeApiService, public router: Router, public activatedRoute: ActivatedRoute) {}
    ngOnInit() {
        this.queryParamssub = this.activatedRoute.queryParams
        .subscribe(params => 
          {
          this.id = params ['token'];          
        });
      this.youtubeApiService.getplaylist(this.id).subscribe((response: any) => {
        this.model = response.items;
        this.metadata = {
            nextPageToken : response.nextPageToken,
            prevPageToken : response.prevPageToken
        }
      }, (error) => {
         console.log('Error with HTTP request');
      });
    }

    getPlaylist_Page(pagetoken, action, event){
        let token = action==='next' ? this.metadata.nextPageToken : this.metadata.prevPageToken;
        if(token)
        {
            this.youtubeApiService.getplaylist_page(token).subscribe((response: any) => 
            {
                this.model = response.items;
                this.metadata = {
                    nextPageToken : response.nextPageToken,
                    prevPageToken : response.prevPageToken
                }
            }, (error) => {
             console.log('Error with HTTP request');
          });
        }        
    }

    formatDate(dateString)
    {
        if(dateString) {            
            let convertedDate = new Date(dateString);
            let shortMonthName = new Date(dateString).toLocaleString('en-US', { month: "short"});
            return `${shortMonthName} ${convertedDate.getDate()}, ${convertedDate.getFullYear()}`;
        }
    }

    loadVideoPlayer(item)
    { 
          this.router.navigate(['/videoplayer'], 
              { queryParams: {
                    token: item.snippet.playlistId,
                    id: item.contentDetails && item.contentDetails.videoId || '',
                    videoname: item.snippet && item.snippet.title,
                    publishedon: this.formatDate(item.contentDetails.videoPublishedAt),
                    desc: item.snippet && item.snippet.description}, 
                skipLocationChange: true } /* prevent from passing data's being passed as part URL param */
            );
    }
}