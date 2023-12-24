import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './app';

import './assets/css/main.scss';
import 'preline';

const containers = document.getElementById('root')
const root = createRoot(containers)

root.render(<App />);