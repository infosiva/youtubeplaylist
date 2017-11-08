import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { YoutubeVideoPlayerComponent } from './youtube-video-player/youtube-video-player.component';
import { YoutubeVideoPlayerListComponent } from './youtube-video-playlist/youtube-video-playlist.component';
import { YouTubeApiService } from './services/youtube-api.service';
import { appRoutes } from './app.routes';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent, YoutubeVideoPlayerListComponent, YoutubeVideoPlayerComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverSideRendering' }),
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,      
    )
  ],
  providers: [
    YouTubeApiService
  ],
  bootstrap: [AppComponent ]
})
export class AppModule { }