import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';


import catalogOfCandidates from './reducers/catalogOfCandidates'
import App from './component/CandidateListApp';

const store = createStore(
		catalogOfCandidates
	);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
