import React from 'react';
import SpiralMenu from '@thirdparty/spiral.js';
import '@thirdparty/spiral.scss';

import { IJsonMenu, IJsonMenuPage } from '@data/json/data-menu';
import { RouteComponentProps, withRouter } from 'react-router';
import { ApplicationState } from '@src/store';
import { Dispatch } from 'redux';
import * as uiActions from '@src/store/ui/actions';
import { connect } from 'react-redux';
import { AppBarComponent } from '@src/components/navigation/app-bar';
import { NavState } from '@src/store/nav';

type HelixMenuProps = {
    lang: string;
    jsonDataMenu: IJsonMenu[];
    openedPageId?: string;
} & RouteComponentProps<any>;

type HelixMenuState = {};

const defaultProps = {
    lang: 'en',
};

class HelixMenu extends React.PureComponent<HelixMenuProps, HelixMenuState> {
    static defaultProps = defaultProps;
    canvasRef: React.RefObject<HTMLCanvasElement>;
    containerRef: React.RefObject<HTMLDivElement>;

    spiralMenu: any;

    readonly state: HelixMenuState = {};

    constructor(props: HelixMenuProps) {
        super(props);
        this.canvasRef = React.createRef<HTMLCanvasElement>();
        this.containerRef = React.createRef<HTMLDivElement>();
    }

    componentDidMount() {
        const { jsonDataMenu, lang, openedPageId } = this.props;
        console.log('HELIX WITH SELECTED NODE ID', openedPageId);
        this.spiralMenu = new SpiralMenu({
            container: this.containerRef.current,
            content: jsonDataMenu,
            language: lang,
            callback: (menuNode: IJsonMenuPage) => {
                this.openPage(menuNode.page_id);
            },
            selectedNodeId: openedPageId,
        });
    }

    componentDidUpdate() {
        this.spiralMenu.setLanguage(this.props.lang);
        /*
        const { openedPageId } = this.props;
        if (openedPageId && this.spiralMenu.selectNode) {
            this.spiralMenu.selectNode(openedPageId);
        }*/
    }

    render() {
        return (
            <div id="spiral-container" ref={this.containerRef}>
                <canvas id="spiral-canvas" ref={this.canvasRef} />
                <span id="spiral-label-container" />
            </div>
        );
    }

    componentWillUnmount() {
        // The clean up
        this.spiralMenu.clear();
        delete this.spiralMenu;
    }

    private openPage = (pageId: string): void => {
        // TODO, move it to container through an 'onPageSelected' prop
        const { lang } = this.props;
        this.props.history.push(`/${lang}/page/${pageId}`);
    };
}

export default withRouter(HelixMenu);
