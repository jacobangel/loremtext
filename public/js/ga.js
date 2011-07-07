/**
 * ga.js
 * Google Related JS
 */

//google analtyics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-3269838-4']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

//google ads
google_ad_client = "pub-7303381813575597";
/* Loremtext 728x90 1.0 */
google_ad_slot = "8091322491";
google_ad_width = 728;
google_ad_height = 90;