/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

(function($) {
    $.fn.extend({
        myplaces: function(insertedOptions) {

            var these = this;

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

            var locaHtml = '<div class="myplaces-searcher"><input class="myplaces-searcher-input" type="text" /><ul><li class="myplaces-buscar">Search</li></ul></div><ul class="myplaces-categories"></ul><div class="myplaces-places"><div class="myplaces-placesList"><ul></ul></div><div class="myplaces-placeInfo"><div class="myplaces-infoContenido"></div></div></div><div class="myplaces-map"></div>';
            $(these).append(locaHtml);

            somospnt.util.ui.places.init(options.placeListTemplate, options.placeInfoTemplate, options.onPlacesChange, options.onClickPlace);
            somospnt.util.ui.map.init(options.places, options.popUpMapTemplate);
            somospnt.util.ui.searcher.init(options.country);
            somospnt.util.ui.filter.init(options.places);

            options.onLoad();

        }
    });
}(jQuery));
