/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/* For reference read the Jasmine and Sinon docs
 * Jasmine docs: https://jasmine.github.io/
 * Sinon docs: http://sinonjs.org/docs/
 */

import { testResetGlean } from '@mozilla/glean/testing';
import {
    bindPingData,
    unbindPingData
} from '../../../../media/js/glean/elements.es6';
import * as elementMetrics from '../../../../media/js/libs/glean/element.js';
import { interaction as interactionPing } from '../../../../media/js/libs/glean/pings.js';

describe('elements.js', function () {
    beforeEach(async function () {
        await testResetGlean('bedrock-test');
        const link =
            '<button type="button" class="mzp-c-button glean-test-element" data-cta-text="Subscribe" data-cta-type="button" data-cta-position="primary">Subscribe</button>';
        document.body.insertAdjacentHTML('beforeend', link);
        bindPingData();
    });

    afterEach(function () {
        unbindPingData();

        document.querySelectorAll('.glean-test-element').forEach(function (e) {
            e.parentNode.removeChild(e);
        });
    });

    it('should ping data when a cta link is clicked', async function () {
        document.querySelector('.glean-test-element').click();
        interactionPing.testBeforeNextSubmit(async function () {
            const label = await elementMetrics.label.testGetValue();
            const type = await elementMetrics.type.testGetValue();
            const position = await elementMetrics.position.testGetValue();
            expect(label).toEqual('Subscribe');
            expect(type).toEqual('button');
            expect(position).toEqual('primary');
        });
    });
});
