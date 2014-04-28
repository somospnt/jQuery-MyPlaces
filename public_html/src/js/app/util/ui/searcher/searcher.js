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

somospnt.util.ui.searcher = (function() {

    var autocomplete, $inputAutocomplete, geocoder;

    function init(country, searcherInputClass) {

        var options = {
            componentRestrictions: {country: country}
        };

        geocoder = new google.maps.Geocoder(options);

        $inputAutocomplete = $('.' + searcherInputClass);
        autocomplete = new google.maps.places.Autocomplete($inputAutocomplete.get(0), options);

        $('.myplaces-buscar').on('click', searchBySearcher);

        $inputAutocomplete.on('keypress', function(e) {
            var key = e.charCode ? e.charCode : e.keyCode;
            if (key === 13) {
                searchBySearcher();
            }
        });

        google.maps.event.addListener(autocomplete, 'place_changed', searchByAutocomplete);


    }


    function searchByAutocomplete() {
        $inputAutocomplete.removeClass("notfound");

        var place = autocomplete.getPlace();

        if (!place.geometry) {
            $inputAutocomplete.addClass("notfound");
            return;
        }

        somospnt.util.ui.map.focusOnGooglePlace(place);

    }

    function searchBySearcher() {
        var placeToFind = $inputAutocomplete.val();

        geocoder.geocode({'address': placeToFind}, function(places, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                places[0].name = places[0].name || placeToFind;

                somospnt.util.ui.map.focusOnGooglePlace(places[0]);
            }
        });

    }

    return {
        init: init
    };

})();