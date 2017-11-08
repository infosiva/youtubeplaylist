import { Routes, RouterModule } from '@angular/router';
import { YoutubeVideoPlayerComponent } from './youtube-video-player/youtube-video-player.component';
import {  YoutubeVideoPlayerListComponent } from './youtube-video-playlist/youtube-video-playlist.component';
let routes : Routes = [
  {
     path: '',
     component: YoutubeVideoPlayerListComponent,
     pathMatch: 'full'
   },
   {
     path: 'videoplayer',
     component: YoutubeVideoPlayerComponent
   }
 ];
export const appRoutes= routes;
