/* 
 * Copyright 2013 Connectis ICT Services S.A.
 *
 * @author Favio Esteban Tolosa
 * @author Franco Nicolas Morinigo
 * @author Leandro Gutierrez
 * @author Laureano Gabriel Clausi
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

(function($) {
    $.fn.extend({
        myplaces: function(insertedOptions) {

            var $this = $(this);

            var options = {
                places: [],
                country: "AR",
                placeListTemplate: '<li>Enter a template for the list of places</li>',
                placeInfoTemplate: '<div>Enter a template for the information of the place</div>',
                popUpMapTemplate: '<div>Enter a template for the pop-up of the place</div>',
                mapOptions: {
                    zoom: 12,
                    center: new google.maps.LatLng(-34.60909440, -58.3891520),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                },
                onLoad: function() {
                },
                onPlacesChange: function() {
                },
                onClickPlace: function() {
                },
				searcherInputClass:"myplaces-searcher-input",
				filterMainContainerClass:"myplaces-categories", 
				filterContainerClass:"myplaces-filter-container", 
				filterClass:"myplaces-check",
				filterActiveClass:"myplaces-check-on", 
				filterTemplateId: "filtersTemplate",
				mainTemplateId: "mainTemplate"
            };

            $.extend(options, insertedOptions);

            $this.append("<div class='myplaces-spinner'></div>");

            $this.append($.templates('#' + options.mainTemplateId).render());

            somospnt.util.ui.places.init(options.placeListTemplate, options.placeInfoTemplate, options.onPlacesChange, options.onClickPlace);
            somospnt.util.ui.map.init(options.places, options.popUpMapTemplate, options.mapOptions);
            somospnt.util.ui.searcher.init(options.country, options.searcherInputClass);
            somospnt.util.ui.filter.init(options);

            options.onLoad();

            $this.find(".myplaces-spinner").remove();
        }
    });
}(jQuery));
