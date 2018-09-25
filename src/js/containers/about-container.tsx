import React from 'react';
import Home from '@src/components/home';
import { RouteComponentProps, withRouter } from 'react-router';
import AppAssetsLocator from '@src/core/app-assets-locator';
import About from '@src/components/about';

type AboutContainerProps = {
    assetsLocator: AppAssetsLocator;
    lang: string;
} & RouteComponentProps<{}>;
type AboutContainerState = {};

class AboutContainer extends React.Component<AboutContainerProps, AboutContainerState> {
    constructor(props: AboutContainerProps) {
        super(props);
    }
    render() {
        const { lang, assetsLocator } = this.props;
        return (
            <div className="full-page-slide-ctn">
                <About assetsLocator={assetsLocator} lang={lang} />
            </div>
        );
    }
}

export default withRouter(AboutContainer);
