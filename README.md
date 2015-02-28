# leaflet-staticPopup
Displays popup content in a static div instead in a real popup.

[demo](http://kartenkarsten.github.io/leaflet-staticPopup/example.html) wanted?

# usage
``` js
	var staticPopup = new L.StaticPopup({id:"staticPopup"});
    staticPopup.addTo(map);
    staticPopup.applyTo(circle);
    staticPopup.applyTo(featureGroup);
```
