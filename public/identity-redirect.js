// ─── Netlify Identity invite/recovery token handler for public pages ──────────
//
// Netlify Identity invite & password-reset emails link to the site root with a
// hash fragment:  /#invite_token=…  /#recovery_token=…  /#confirmation_token=…
//
// The Identity widget (loaded before this script) auto-initialises on
// DOMContentLoaded, reads the hash, and opens the appropriate modal (set
// password, reset password, etc.).  This script's only job is:
//   1. On token-bearing visits → listen for the "login" event and redirect to
//      /admin.html once the user completes the flow.
//   2. On normal visits (no token) → do absolutely nothing.
//
// The implementation follows the official Netlify-recommended pattern:
//   netlifyIdentity.on('init', user => { … on('login', redirect) … })
// which guarantees correct timing regardless of when auto-init fires.
// ──────────────────────────────────────────────────────────────────────────────

(function () {
    // ── 1. Quick-exit for normal visits ───────────────────────────────────────
    var hash = window.location.hash || '';
    var TOKEN_RE =
        /^#(invite_token|recovery_token|confirmation_token|access_token)=/;

    if (!TOKEN_RE.test(hash)) return; // nothing to do

    // ── 2. Widget must be available ───────────────────────────────────────────
    var ni = window.netlifyIdentity;
    if (!ni) {
        console.error(
            '[identity-redirect] netlify-identity-widget not loaded – ' +
            'cannot process ' + hash.split('=')[0]
        );
        return;
    }

    // ── 3. Register handlers BEFORE the widget auto-inits on DOMContentLoaded
    //       The "init" event fires once the widget finishes initialising and has
    //       read the hash token.  Inside it we wire up the "login" redirect so
    //       it is in place before the user can complete the flow.
    ni.on('init', function (user) {
        // If the hash already resolved into a logged-in user (edge case with
        // access_token / external provider), redirect immediately.
        if (user) {
            document.location.href = '/admin.html';
            return;
        }

        // Otherwise wait for the user to finish the invite / reset modal.
        ni.on('login', function () {
            document.location.href = '/admin.html';
        });
    });

    // ── 4. Safety net: if DOMContentLoaded has already fired (shouldn't happen
    //       with synchronous scripts, but just in case), kick init manually.
    if (document.readyState !== 'loading') {
        ni.init();
    }
})();
