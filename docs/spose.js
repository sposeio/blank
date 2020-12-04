//
// spose.js
// docs
// 
// Author: Wess Cope (wess@frenzylabs.com)
// Created: 12/04/2020
// 
// Copywrite (c) 2020 FrenzyLabs, LLC.
//


(function(loc, clips) {
  var clip = clips ? '/' + loc.pathname.split('/')[1] : ''

  function redirect() {
    var protocol  = loc.protocol + '//' + loc.hostname + (loc.port ? ':' + loc.port : '') + clip + '/?'
    var pathane   = loc.pathname ? 'p=' + loc.pathname.replace(/&/g, '~and~').replace(clip, '') : ''
    var search    = loc.search ? '&q=' + loc.search.slice(1).replace(/&/g, '~and~') : ''

    loc.replace(protocol + pathname + search + loc.hash)
  }

  function resolve() {
    if (loc.search) {
      var q = {}

      loc.search.slice(1).split('&').forEach(function(v) {
        var a = v.split('=')
        q[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&')
      })

      if (q.p !== undefined) {
        window.history.replaceState(null, null,
          clip + (q.p || '') +
          (q.q ? ('?' + q.q) : '') +
          loc.hash
        )
      }
    }
  }

  document.title === '__404__' ? redirect() : resolve()
})(window.location, window.clips || true)