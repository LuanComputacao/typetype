<template>
  <div>
    <div id="stomt_create"></div> <!-- if you want to include an inline form -->
    <script>
      // Include the STOMT JavaScript SDK
      (function(w, d, n, r, t, s){
        w.Stomt = w.Stomt||[];
        t = d.createElement(n);
        s = d.getElementsByTagName(n)[0];
        t.async=1;
        t.src=r;
        s.parentNode.insertBefore(t,s);
      })(window, document, 'script', 'https://www.stomt.com/widget.js');

      // Adjust the 'APP_ID' to your application id
      // you can find it here: https://www.stomt.com/YOUR_PAGE/apps
      Stomt.push(['addTab', {appId: 'APP_ID'}]);
      Stomt.push(['addCreate', {appId: 'APP_ID'}]);
    </script>
  </div>
</template>

<script>
export default {
  name: 'Stompt'
}
</script>
