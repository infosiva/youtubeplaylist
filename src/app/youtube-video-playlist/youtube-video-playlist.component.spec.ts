import { YoutubeVideoPlayerListComponent } from '../youtube-video-playlist/youtube-video-playlist.component';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterOutlet } from "@angular/router";
import { Renderer } from '@angular/core';
import { YouTubeApiService } from '../services/youtube-api.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpModule, XHRBackend, BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
class MockRouter { public navigate() {}; }

describe('Youtube playlist component', () => {

  let testBedService: YouTubeApiService;
  let component: YoutubeVideoPlayerListComponent;
  let fixture: ComponentFixture<YoutubeVideoPlayerListComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
	imports: [
		RouterTestingModule.withRoutes(
		  [{path: '', component: YoutubeVideoPlayerListComponent}],
    ),
    HttpClientTestingModule,
    HttpModule
	  ],
	  declarations: [ YoutubeVideoPlayerListComponent ],
	  providers: [
		YouTubeApiService,
		Renderer,
		{provide: Router,  useClass: MockRouter },
    RouterOutlet,
    { provide: XHRBackend, useClass: MockBackend },
	]
    })

    httpMock = TestBed.get(HttpTestingController);
    
  }));

  beforeEach(() => {
	testBedService = TestBed.get(YouTubeApiService)	
    fixture = TestBed.createComponent(YoutubeVideoPlayerListComponent);;
    component = fixture.componentInstance;
	fixture.detectChanges();	   
  });

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    debugger;
    expect(app).toBeTruthy();
  })); 

  it('comp must mock the API response without any err',
		inject([XHRBackend], (mockBackEnd: MockBackend) => {
		//var mockbackend = new MockBackend();
		const mockResponse = 
					{
 "kind": "youtube#playlistItemListResponse",
 "etag": "\"ld9biNPKjAjgjV7EZ4EKeEGrhao/RP196PnFs_8kbBG_MUKSx32yGwc\"",
 "nextPageToken": "CAoQAA",
 "pageInfo": {
  "totalResults": 2,
  "resultsPerPage": 2
 },
 "items": [
  {
   "kind": "youtube#playlistItem",
   "etag": "\"ld9biNPKjAjgjV7EZ4EKeEGrhao/mn7-yF379SxjmQLPWfZ2mixhG48\"",
   "id": "UExTaTI4aURmRUNKUEpZRkE0d2psRjVLVXVjRnZjMHFiUS41MzJCQjBCNDIyRkJDN0VD",
   "snippet": {
    "publishedAt": "2014-09-04T16:00:41.000Z",
    "channelId": "UCc1SpIDSvxrf5ofxUMyXReg",
    "title": "Lamb Angelica",
    "description": "From Lamb's 2003 album Between Darkness and Wonder",
    "thumbnails": {
     "default": {
      "url": "https://i.ytimg.com/vi/X0qwQqwKLlM/default.jpg",
      "width": 120,
      "height": 90
     },
     "medium": {
      "url": "https://i.ytimg.com/vi/X0qwQqwKLlM/mqdefault.jpg",
      "width": 320,
      "height": 180
     },
     "high": {
      "url": "https://i.ytimg.com/vi/X0qwQqwKLlM/hqdefault.jpg",
      "width": 480,
      "height": 360
     }
    },
    "channelTitle": "Danielle Major",
    "playlistId": "PLSi28iDfECJPJYFA4wjlF5KUucFvc0qbQ",
    "position": 0,
    "resourceId": {
     "kind": "youtube#video",
     "videoId": "X0qwQqwKLlM"
    }
   },
   "contentDetails": {
    "videoId": "X0qwQqwKLlM",
    "videoPublishedAt": "2009-09-07T15:09:56.000Z"
   },
   "status": {
    "privacyStatus": "public"
   }
  }]
  }
			mockBackEnd.connections.subscribe(
			(connection : MockConnection) => 
				{		
					connection.mockRespond(new Response(new ResponseOptions({
						body: JSON.stringify(mockResponse)
				})))
		})
		debugger;
		let fixture = TestBed.createComponent(YoutubeVideoPlayerListComponent);		
		fixture.autoDetectChanges(true);
		let instance = fixture.componentInstance;
		var nativeEle = fixture.debugElement.nativeElement;
		var componentRedf = fixture.debugElement.injector;
		expect(instance).toBeTruthy();
	}));

});
