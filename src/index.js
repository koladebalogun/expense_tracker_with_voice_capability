import React from 'react';
import ReactDOM from 'react-dom';
import { SpeechProvider } from '@speechly/react-client';

import { Provider} from './context/context';
import './index.css';
import App from './App';

ReactDOM.render( // We'll wrap our app with the provider and speechly provider
  <SpeechProvider appId="3b9dfeb8-1919-491c-b16f-af921946daa6" language="en-US">
    <Provider> 
      <App />
    </Provider>
  </SpeechProvider>,
  document.getElementById('root')
);
