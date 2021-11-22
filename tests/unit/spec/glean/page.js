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
import { initPageView } from '../../../../media/js/glean/page.es6';
import * as pageMetrics from '../../../../media/js/libs/glean/page.js';
import { pageView as pageViewPing } from '../../../../media/js/libs/glean/pings.js';

describe('elements.js', function () {
    beforeEach(async function () {
        await testResetGlean('bedrock-test');
        document
            .getElementsByTagName('html')[0]
            .setAttribute('data-gtm-page-id', 'Homepage');
    });

    afterEach(function () {
        document
            .getElementsByTagName('html')[0]
            .removeAttribute('data-gtm-page-id');
    });

    it('should register a page view correctly', async function () {
        initPageView();
        pageViewPing.testBeforeNextSubmit(async function () {
            const id = await pageMetrics.id.testGetValue();
            const locale = await pageMetrics.locale.testGetValue();
            const referrer = await pageMetrics.referrer.testGetValue();
            const url = await pageMetrics.url.testGetValue();
            expect(id).toEqual('Homepage');
            expect(locale).toEqual('');
            expect(referrer).toEqual(document.referrer);
            expect(url).toEqual(window.location.href);
        });
    });
});
