import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class YouTubeApiService {
  part : string = 'snippet,contentDetails,status'
  maxresults: number = 10
  playlistId: string = "PLSi28iDfECJPJYFA4wjlF5KUucFvc0qbQ"
  key: string  = 'AIzaSyCuv_16onZRx3qHDStC-FUp__A6si-fStw'
  apiURL: string= 'https://www.googleapis.com/youtube/v3/playlistItems'
  constructor(protected http: HttpClient) {}
  getplaylist(token?) {
    if(token)
    {
      return this.getplaylist_page(token)     
    }
    let youtubeAPIURL =`${this.apiURL}?part=${this.part}&maxResults=${this.maxresults}&playlistId=${this.playlistId}&key=${this.key}`
    return this.http.get<{data: string}>(youtubeAPIURL);
  }
  getplaylist_page(pageToken) {
          let youtubeAPIURL =`${this.apiURL}?part=${this.part}&pageToken=${pageToken}&maxResults=${this.maxresults}&playlistId=${this.playlistId}&key=${this.key}`
          return this.http.get<{data: string}>(youtubeAPIURL);
       // return this.http.get("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&pageToken="+pageToken+"&playlistId="+playlistId+"&key="+this.key)
  }
}
