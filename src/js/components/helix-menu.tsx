import React, { CSSProperties } from 'react';
import spiralMenu from '@thirdparty/spiral.js';
import '@thirdparty/spiral.scss';

import { IJsonMenu, IJsonMenuPage } from '@data/json/data-menu';
import { RouteComponentProps, withRouter } from 'react-router';

type HelixMenuProps = {
    lang: string;
    jsonDataMenu: IJsonMenu[];
} & RouteComponentProps<any>;

type HelixMenuState = {
    width: number | string;
    height: number | string;
};

const defaultProps = {
    lang: 'en',
};

class HelixMenu extends React.PureComponent<HelixMenuProps, HelixMenuState> {
    static defaultProps = defaultProps;
    canvas!: HTMLCanvasElement;
    spiralMenu: any;

    readonly state: HelixMenuState;

    constructor(props: HelixMenuProps) {
        super(props);
        this.state = {
            width: '100%', // imagine this defaults for now
            height: '100%',
        };
    }

    componentDidMount() {
        // 1. Example (the json menu structure is not definitive)
        const jsonDataMenu = this.props.jsonDataMenu;
        //console.log('jsonDataMenu', jsonDataMenu);
        //console.log('jsonDataMenu.leftSpiral', jsonDataMenu[0]);
        //console.log('jsonDataMenu.rightSpiral', jsonDataMenu[1]);

        // 2. Call the spiral menu (automatically renders... maybe better an object)
        this.spiralMenu = spiralMenu(this.canvas, jsonDataMenu, (menuNode: IJsonMenuPage) => {
            //alert('callback from spiral');
            console.log('HELIX callback, is it the node?', menuNode);
            this.openPage(menuNode.page_id);
        });

        // 3. TBD - handlers
        // this.spiralMenu.onPageSelected((pageId) => { this.openPage(pageId) } );

        // 4. Size handlers (actually does not do the real thing)
        window.addEventListener('resize', this.updateDimensions, false);
        window.addEventListener('orientationchange', this.updateDimensions, false);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
        window.removeEventListener('orientationchange', this.updateDimensions);

        // TBD -
        //   * should be able to unregister internal events of the spiral menu
        //     i.e:
        //        window.addEventListener('resize', onSpiralResize);
        //        this.canvas.addEventListener('mousedown', onSpiralDragMouseDown);
        //        this.canvas.addEventListener('mouseup', onSpiralDragMouseUp);
        //
        //  > i.e. this.spiralMenu.unregister();

        delete this.spiralMenu;
    }

    updateDimensions = () => {
        // Just as an example
        this.setState(
            (prevState: HelixMenuState): HelixMenuState => {
                return {
                    ...prevState,
                    width: '100%', // nothing yet but could be window.innerWidth or parent size...
                    height: '100%',
                };
            }
        );
    };

    render() {
        // TBD:
        // - Who's in charge of the canvasWidth / canvasHeight
        // - For now I let the styles here as plain objects
        //   (later choose scss, css-modules or styled-components if react-native)

        const spiralContainerStyle = {
            position: 'absolute',
            top: 0,
            left: 0,
            width: this.state.width, // Note here ;)
            height: this.state.height,
        } as CSSProperties;

        const spiralStyle = {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            //cursor: 'pointer',
        } as CSSProperties;

        return (
            <div style={spiralContainerStyle}>
                <div id="spiral-container">
                    <canvas
                        style={spiralStyle}
                        ref={(node: HTMLCanvasElement) => {
                            this.canvas = node;
                        }}
                    />
                    <span id="spiral-label-container" />
                </div>
            </div>
        );
    }

    private openPage = (pageId: string): void => {
        // TODO, move it to container through an 'onPageSelected' prop
        const { lang } = this.props;
        this.props.history.push(`/${lang}/page/${pageId}`);
    };
}

export default withRouter(HelixMenu);
