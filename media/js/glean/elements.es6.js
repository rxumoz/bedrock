/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { interaction as interactionPing } from '../libs/glean/pings.js';
import * as elementMetrics from '../libs/glean/element.js';

function _ping(label, type, position) {
    if (type) {
        elementMetrics.type.set(type);
    }

    if (position) {
        elementMetrics.position.set(position);
    }

    elementMetrics.label.set(label);
    interactionPing.submit();
}

function pingLinkClicks(e) {
    const el = e.target;

    if (el.classList.contains('mzp-c-button')) {
        const ctaText = el.getAttribute('data-cta-text');
        const linkName = el.getAttribute('data-link-name');
        const linkType = el.getAttribute('data-link-type');

        // CTA link clicks
        if (ctaText) {
            const type = el.getAttribute('data-cta-type');
            const position = el.getAttribute('data-cta-position');
            _ping(ctaText, type, position);
            return;
        }

        // Firefox Download link clicks
        if (linkType && linkType === 'download') {
            const os = el.getAttribute('data-download-os');
            const name = el.getAttribute('data-display-name');
            const position = el.getAttribute('data-download-location');

            if (os) {
                const label = `Firefox Download ${os}`;
                _ping(label, name, position);
                return;
            }
        }

        // Older format links
        if (linkName) {
            _ping(linkName, linkType);
            return;
        }
    }
}

function bindPingData() {
    document
        .querySelector('body')
        .addEventListener('click', pingLinkClicks, false);
}

function unbindPingData() {
    document
        .querySelector('body')
        .removeEventListener('click', pingLinkClicks, false);
}

export { bindPingData, unbindPingData };
