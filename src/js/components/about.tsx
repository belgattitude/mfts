import React from 'react';
import './about.scss';
import AppAssetsLocator from '@src/core/app-assets-locator';

import credits_en from '@data/markdown/credits.en.md';
import credits_fr from '@data/markdown/credits.fr.md';
import WebpackMarkdown from '@src/components/webpack-markdown';
import FullsizeVideoBg from '@src/components/layout/fullsize-video-bg';
import { CustomScrollbar } from '@src/components/layout/custom-scrollbar';

type AboutProps = {
    assetsLocator: AppAssetsLocator;
    lang: string;
    content?: string;
};

type AboutState = {};

const defaultProps = {
    content: '',
};

class About extends React.PureComponent<AboutProps, AboutState> {
    static defaultProps = defaultProps;
    constructor(props: AboutProps) {
        super(props);
    }

    render() {
        const { lang, content } = this.props;
        const videosBaseUrl = this.props.assetsLocator.getMediaTypeBaseUrl('videos');

        const videoSrcs = [{ src: `${videosBaseUrl}/napp.webm`, type: 'video/webm' }];

        //const content = lang === 'fr' ? credits_fr : credits_en;
        return (
            <div className="about-container">
                <FullsizeVideoBg videoSrcs={videoSrcs}>
                    <CustomScrollbar>
                        <WebpackMarkdown content={content!} />
                    </CustomScrollbar>
                </FullsizeVideoBg>
            </div>
        );
    }
}

export default About;
