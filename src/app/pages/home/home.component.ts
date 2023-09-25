import { Component } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { Video } from 'src/app/models/youtube.models';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent {

	protected _videos: Video[] = [];

	constructor(private _youtubeService: YoutubeService) {

		this.getVideos();
	}

	getVideos() {

		this._youtubeService.getVideos().subscribe(response => this._videos.push(...response));
		console.log(this._videos);
	}

	showVideo(video: Video) {
		Swal.fire({
			html: `<h4>${video.title}</h4><hr><iframe width="100%" height="365" src="https://www.youtube.com/embed/${video.resourceId.videoId}?si=efGh6Kqx3bEMx6Y6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
		});
	}
}
