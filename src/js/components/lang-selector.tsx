import React, { CSSProperties } from 'react';
import { ApplicationState } from '@src/store';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as langActions from '@src/store/locale/actions';
import { RouteComponentProps, withRouter } from 'react-router';
import './lang-selector.scss';
import { UILangCode } from '@src/store/locale';

// Props passed from mapStateToProps
type PropsFromReduxState = {
    lang: string;
};

// Props passed from mapDispatchToProps
type PropsFromReduxDispatchActions = {
    setLang: typeof langActions.setLang;
};

type LangSelectorProps = PropsFromReduxDispatchActions &
    PropsFromReduxState &
    RouteComponentProps<any> & {
        className?: string;
        style?: CSSProperties;
        children(props: {
            currentLang: string;
            nextLang: string;
            updateLang: (lang: string) => void;
            toggleLang: () => void;
        }): JSX.Element;
    };

const defaultProps = {
    className: 'lang-selector',
    style: {} as CSSProperties,
};

class LangSelector extends React.Component<LangSelectorProps> {
    static defaultProps = defaultProps;

    constructor(props: LangSelectorProps) {
        super(props);
    }

    updateLang = (lang: string): void => {
        const { lang: currentLang, setLang } = this.props;
        const { pathname: uri } = this.props.location;
        const newLocation = uri.replace(
            // i.e: "/en/page/sensation-and-senses.pointing.parts-of-pointing"
            new RegExp(`^\/${currentLang}\/`),
            `/${lang}/`
        );
        setLang(lang);
        this.props.history.push(newLocation);
    };

    toggleLang = (): void => {
        const { lang: currentLang } = this.props;
        const nextLang = currentLang === 'en' ? 'fr' : 'en';
        this.updateLang(nextLang);
    };

    render() {
        const { lang: currentLang, className, style, children } = this.props;
        const nextLang = currentLang === 'en' ? 'fr' : 'en';

        return children({
            updateLang: this.updateLang,
            toggleLang: this.toggleLang,
            currentLang: currentLang,
            nextLang: nextLang,
        });
    }
}

const mapStateToProps = ({ lang }: ApplicationState) => ({
    lang: lang.langCode,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setLang: (langCode: UILangCode) => dispatch(langActions.setLang(langCode)),
});

const ConnectedLangSelector = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(LangSelector)
);
export default ConnectedLangSelector;
