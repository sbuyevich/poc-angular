import { loadRemoteEntry } from '@angular-architects/module-federation';
import { environment } from './environments/environment';

Promise.all([
   loadRemoteEntry(environment.achURL +  'remoteEntry.js', 'ach'),
   loadRemoteEntry('http://localhost:4444/remoteEntry.js', 'react_app')   
])
.catch(err => console.error('Error loading remote entries', err))
.then(() => import('./bootstrap'))
.catch(err => console.error(err));



