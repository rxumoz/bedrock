/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import * as pageMetrics from '../libs/glean/page.js';
import { getPageId, getPageLocale } from './utils.es6';
import { pageView as pageViewPing } from '../libs/glean/pings.js';

function initPageView() {
    pageMetrics.viewed.set();
    pageMetrics.id.set(getPageId());
    pageMetrics.locale.set(getPageLocale());
    pageMetrics.referrer.set(document.referrer);
    pageMetrics.url.set(window.location.href);
    pageViewPing.submit();
}

export { initPageView };
