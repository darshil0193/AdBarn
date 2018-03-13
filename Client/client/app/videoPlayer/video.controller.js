'use strict';
const baseUrl = 'https://afternoon-cliffs-24932.herokuapp.com/user/fetch/';
export default class userCtrl {
    constructor($sce, $stateParams, videoService, userService) {
        this.$sce = $sce;
        this.$stateParams = $stateParams;
        this.videoService = videoService;
        this.userService = userService;
        this.config = {};
        this.currentVideoId = '';
        this.newComment = '';
        this.videoname = '';
        this.videoview = '';
    }
    
    $onInit() {
        this.videoIds = _.map(this.videosList, 'videoId');
        let currentVideo = (!_.isEmpty(this.videosList)) ? _.first(this.videosList) : {};
        this.currentVideoId = _.get(currentVideo, 'videoId', '');
        this.config.sources = [{src: `${baseUrl}${_.get(currentVideo, 'fileId')}`, type: 'video/mp4'}];
        this.comments = _.get(currentVideo, 'comments', []);
        this.videoname = _.get(currentVideo, 'title');
        this.videoview = _.get(currentVideo, 'views');
            this.config.theme = 'node_modules/videogular-themes-default/videogular.css';
            this.config.plugins = {
                poster: 'http://www.videogular.com/assets/images/videogular.png'
            };
    }

    onPlayerReady(API) {
        this.api = API;
    }

    onCommentType(event) {
        if (_.get(event, 'keyCode') === 13) {
            this.userService.addComment({username: this.$stateParams.id, videoId: this.currentVideoId,
                comment: this.newComment}).then((response) => {
                    this.comments.push({username: this.$stateParams.id, body: this.newComment});
                    this.newComment = '';
            });
        }
    }

    onVideoChange(video) {
        this.api.pause();
        this.config.sources = [];
        this.config.sources = [{src: `${baseUrl}${_.get(video, 'fileId')}`, type: 'video/mp4'}];
        this.api.currentTime = 0;
        this.currentVideoId = _.get(video, 'videoId');
        this.videoname = _.get(video, 'title');
        this.videoview = _.get(video, 'views');
        this.comments = _.get(_.first(_.filter(this.videosList, (eachVideo) => {
            return eachVideo.videoId === video.videoId;
        })), 'comments', []);
    }

    onVideoComplete() {
        this.videoService.updateViewedList({username: this.$stateParams.id,
            videoId: this.currentVideoId, time: this.api.totalTime}).then((response) => {
        }).catch((response) => {
        });
    }

    logout() {
        this.state.go('home');
    }
}

userCtrl.$inject = ['$sce', '$stateParams', 'videoService', 'userService'];