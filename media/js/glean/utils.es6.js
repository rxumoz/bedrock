/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

function getPageId(path) {
    const pageId = document
        .getElementsByTagName('html')[0]
        .getAttribute('data-gtm-page-id');
    const pathName = path ? path : document.location.pathname;

    return pageId
        ? pageId
        : pathName.replace(/^(\/\w{2}-\w{2}\/|\/\w{2,3}\/)/, '/');
}

function getPageLocale(path) {
    const pathName = path ? path : document.location.pathname;
    const locale = pathName.match(/^\/(\w{2}-\w{2}|\w{2,3})\//);
    return locale && locale.length > 0 ? locale[1] : '';
}

export { getPageId, getPageLocale };
