import { VideoProxyFactory } from '@src/models/proxy/video-proxy';
import { IJsonVideo } from '@data/json/data-videos';
import { VideoSourceProxyFactory } from '../video-source-proxy';
import AppAssetsLocator from '../../../core/app-assets-locator';

describe('VideoProxy from IJsonVideo', () => {
    const jsonVideo: IJsonVideo = {
        video_id: 'the_video_id',
        covers: ['cover_1.jpg'],
        sources: [
            {
                src: 'intro.mp4',
                priority: 20,
                type: 'video/type/mp4',
            },
            {
                src: 'intro.webm',
                priority: 10,
                codecs: 'vp9',
            },
        ],
        tracks: [{ src: 'test.en.vtt', lang: 'en' }, { src: 'test.fr.vtt', lang: 'fr' }],
        meta: {
            duration: 100,
            size: '720x596',
        },
    };

    const jsonVideoBackup = JSON.stringify(jsonVideo);

    const assetsLocator = new AppAssetsLocator({
        assetsUrls: {
            default: 'http://default',
            videoSubs: 'http://videosubs',
            audioSubs: 'http://audiosubs',
        },
    });
    const options = {
        fallbackLang: 'en',
        assetsLocator: assetsLocator,
    };

    const video = VideoProxyFactory.createFromJson(jsonVideo, options);

    test('properties', () => {
        expect(video.videoId).toEqual('the_video_id');
        expect(video.duration).toEqual(100);
        expect(video.getFormattedDuration()).toEqual('00:01:40');
    });

    test('videoSources', () => {
        const unsortedSrcs = video.getSources(false);
        expect(unsortedSrcs.length).toEqual(2);
        expect(unsortedSrcs[0]).toEqual(VideoSourceProxyFactory.createFromJson(jsonVideo.sources[0], options));
    });

    test('subtitles tracks', () => {
        const tracks = video.getAllTracks();
        expect(tracks.length).toEqual(2);
        expect(tracks[0]).toEqual({ lang: 'en', src: 'http://videosubs/test.en.vtt' });
    });

    test('immutability', () => {
        expect(jsonVideoBackup).toEqual(JSON.stringify(jsonVideo));
    });
});
