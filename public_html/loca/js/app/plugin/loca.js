(function($) {
    $.fn.extend({
        loca: function(insertedOptions) {

            var these = this;

            somospnt.service.places.getPlaces(insertedOptions.urlGoogleDocs, function(places) {

                insertedOptions.places = places;

                var options = {
                    places: [],
                    country: "AR",
                    placeListTemplate: '<li>Enter a template for the list of places</li>',
                    placeInfoTemplate: '<div>Enter a template for the information of the place</div>',
                    popUpMapTemplate: '<div>Enter a template for the pop-up of the place</div>',
                    onLoad: function() {
                    },
                    onPlacesChange: function() {
                    },
                    onClickPlace: function() {
                    }
                };

                $.extend(options, insertedOptions);

                var locaHtml = '<div class="loca-searcher"><input class="loca-searcher-input" type="text" /><ul><li class="loca-buscar">Search</li></ul></div><ul class="loca-categories"></ul><div class="loca-places"><div class="loca-placesList"><ul></ul></div><div class="loca-placeInfo"><div class="loca-infoContenido"></div></div></div><div class="loca-map"></div>';
                $(these).append(locaHtml);

                somospnt.util.ui.places.init(options.placeListTemplate, options.placeInfoTemplate, options.onPlacesChange, options.onClickPlace);
                somospnt.util.ui.map.init(options.places, options.popUpMapTemplate);
                somospnt.util.ui.searcher.init(options.country);
                somospnt.util.ui.filter.init(options.places);

                options.onLoad();

            });
        }
    });
}(jQuery));
