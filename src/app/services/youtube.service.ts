import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { YoutubeResponse } from '../models/youtube.models';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class YoutubeService {

	//		apiKey		AIzaSyBrJ9QX9Nq5W1dt2xDq4crjlB3g2T5M8RY
	//		Uploads:	UUuaPTYj15JSkETGnEseaFFg

	private url: string = 'https://www.googleapis.com/youtube/v3/';
	private apiKey: string = 'AIzaSyBrJ9QX9Nq5W1dt2xDq4crjlB3g2T5M8RY';
	private playListId: string = 'UUuaPTYj15JSkETGnEseaFFg';
	private maxResults: number = 10;
	private pageToken: string = '';

	constructor(private _httpClient: HttpClient) { }

	getVideos() {

		const params: HttpParams = new HttpParams()
			.set('key', this.apiKey)
			.set('part', 'snippet')
			.set('playlistId', this.playListId)
			.set('maxResults', this.maxResults)
			.set('pageToken', this.pageToken);

		return this._httpClient.get<YoutubeResponse>(`${this.url}playlistItems/`, { params })
			.pipe(
				map(response => {

					this.pageToken = response.nextPageToken;
					return response.items;
				}),
				map(items => items.map(video => video.snippet))
			);
	}
}
