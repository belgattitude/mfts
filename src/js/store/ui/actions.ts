import { action } from 'typesafe-actions';

import { UiActionTypes, UILangCode } from './types';

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
//
// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.
export const setLang = (lang: UILangCode) => action(UiActionTypes.SET_LANG, lang);
export const setFullscreen = (isFullscreen: boolean) => action(UiActionTypes.SET_IN_FULLSCREEN, isFullscreen);
