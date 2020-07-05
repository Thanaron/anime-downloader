import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../themes/dark.less';
import App from './ui/App';
import * as serviceWorker from './serviceWorker';
import { KitsuDataProvider } from './provider/data/kitsu/kitsu.provider';

(async () => {
    const kitsuSearchResult = await new KitsuDataProvider().getSearchResults(
        'Boku no Hero Academia'
    );
})();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
