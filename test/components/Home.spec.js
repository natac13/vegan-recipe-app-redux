import React from 'react';
import { findDOMNode } from 'react-dom';
import {
        renderIntoDocument,
        scryRenderedDOMComponentsWithTag,
        Simulate
    } from 'react-addons-test-utils';
import { Home } from '../../app/components/home/Home';

import { expect } from 'chai';

describe('The Home component', () => {
    it('should contain two buttons ', () => {
        const component = renderIntoDocument(
            <Home />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        let [a,b] = buttons;
        console.log(a.textContent);

        expect(buttons.length).to.equal(2);
    });
});
