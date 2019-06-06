<template>
  <div>
    <div id="stomt_create"></div> <!-- if you want to include an inline form -->
  </div>
</template>

<script>
export default {
  name: 'Stompt',

  created () {
    // Include the STOMT JavaScript SDK

    (function (w, d, n, r, t, s) {
      w.Stomt = w.Stomt || []
      t = d.createElement(n)
      s = d.getElementsByTagName(n)[0]
      t.async = 1
      t.src = r
      s.parentNode.insertBefore(t, s)
    })(window, document, 'script', 'https://www.stomt.com/widget.js')
  },

  mounted () {
    this.callStomt()
  },

  methods: {
    callStomt () {
      // Adjust the 'APP_ID' to your application id
      // you can find it here: https://www.stomt.com/YOUR_PAGE/apps
      // Stomt.push(['addTab', { appId: 'LzP3sMxCZlOWaHPKC45mvtfuP' }])
      // Stomt.push(['addCreate', { appId: 'LzP3sMxCZlOWaHPKC45mvtfuP' }])
    }
  }
}
</script>
