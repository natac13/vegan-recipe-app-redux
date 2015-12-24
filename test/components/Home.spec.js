import React from 'react';
import { findDOMNode } from 'react-dom';
import {
        renderIntoDocument,
        scryRenderedDOMComponentsWithTag,
        Simulate
    } from 'react-addons-test-utils';
import Home from '../../app/components/Home';

import { expect } from 'chai';

describe('The Home component', () => {
    it('should contain two links ', () => {
        const component = renderIntoDocument(
            <Home />
        );
        const links = scryRenderedDOMComponentsWithTag(component, 'a');
        let [a,b] = links;
        console.log(a.textContent);
        console.log(a);
        expect(links.length).to.equal(2);
    });
});
