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

somospnt.util.ui.filter = (function() {

    var settings = {};

    function init(options) {
		settings = options;
	
        filterTemplate = $.templates('#' + settings.filterTemplateId);
        addFilters(settings.places);
        $('.' + settings.filterContainerClass).on('click', changeFilter);
    }

    function addFilters(places) {

        var filters = getFilters(places);
        $('.' + settings.filterMainContainerClass).append(filterTemplate.render(filters));

    }

    function getFilters(places) {
        var filters = [];

        if (places) {
            for (var i = 0; i < places.length; i++) {
                if (places[i].tags) {
                    for (var j = 0; j < places[i].tags.length; j++) {
                        if ($.inArray(places[i].tags[j], filters) === -1) {
                            filters.push(places[i].tags[j]);
                        }
                    }
                }
            }
        }

        return filters;
    }

    function changeFilter(evt) {

        var filters = [];
		
		$(this).toggleClass(settings.filterActiveClass);
		
        $('.' + settings.filterActiveClass).each(
			function(index, element) {
				filters.push($(element).attr('id'));
		});

        somospnt.util.ui.map.filterLocations(filters);
		
		evt.stopPropagation();
		evt.preventDefault();
    }

    return {
        init: init
    };
})();