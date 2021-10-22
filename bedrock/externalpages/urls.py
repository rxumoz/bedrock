# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

from bedrock.mozorg.util import page

urlpatterns = (
    page("pocket", "externalpages/pocket/index.html"),
    page("pocket/about", "externalpages/pocket/about.html"),
    page("pocket/add", "externalpages/pocket/add.html"),
    page("pocket/android", "externalpages/pocket/android.html"),
)