L.StaticPopup = L.Class.extend({

    options: {
        id:"staticPopup",
        noPopupText:"<strong>Click a marker</strong>"
    },

    initialize: function (options) {
        L.Util.setOptions(this, options);
    },

    _empty: function () {
        var staticPopup = document.getElementById(this.options.id);
        staticPopup.innerHTML = '<div>'+this.options.noPopupText+'</div>';
    },

    addTo: function (map) {
        this.onAdd(map);
    },

    onAdd: function (map) {
        this._map = map;
    },

    applyTo: function (layer) {
        // Trigger empty contents when the script
        // has loaded on the page.
        this._empty();
        this._layer = layer;

        this._map.on('click', this._empty, this);
        // Listen for individual marker clicks.
        layer.on('click', this._featureClick, this);
    },

    _featureClick: function(e) {
        var target;
        // choose a target
        if (e.layer) {
            target = e.layer;
        }else{
            target = e.target;
        }
        // Force the popup closed.
        target.closePopup();

        var contentDiv;
        if (typeof target._popup._content == "string") {
            contentDiv = document.createElement("div");
            contentDiv.innerHTML = target._popup._content;
        }else{
            contentDiv = target._popup.getContent();
        }

        var staticPopup = document.getElementById(this.options.id);
        staticPopup.innerHTML = "";
        staticPopup.appendChild(contentDiv);
    },

    onRemove: function (map) {
      console.log("remove layer");
      this._map.off({'click': this._empty}, this);
      this._layer.off({'click': this._featureClick}, this);

      this._map = null;
      this._layer = null;
    }

});

L.staticPopup = function(options) {
    return new L.StaticPopup(options);
}
