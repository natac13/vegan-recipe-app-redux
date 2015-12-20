import jsdom from 'jsdom';
import R from 'ramda';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';

/*==========================================
=            Setup the test DOM            =
==========================================*/

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

R.forEach((key) => {
    if (!(key in global)) {
        global[key] = window[key];
    }
}, R.keys(window));


/*=====  End of Setup the test DOM  ======*/


chai.use(chaiImmutable);