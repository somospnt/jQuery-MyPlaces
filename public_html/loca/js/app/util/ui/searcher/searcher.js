somospnt.util.ui.searcher = (function() {

    var autocomplete, inputAutocomplete, geocoder;

    function init(country) {

        var options = {
            componentRestrictions: {country: country}
        };

        geocoder = new google.maps.Geocoder(options);

        inputAutocomplete = $('.loca-searcher-input').get(0);
        autocomplete = new google.maps.places.Autocomplete(inputAutocomplete, options);

        $('.loca-buscar').on('click', searchBySearcher);

        $('.loca-searcher input').on('keypress', function(e) {
            var key = e.charCode ? e.charCode : e.keyCode;
            if (key === 13) {
                searchBySearcher();
            }
        });

        google.maps.event.addListener(autocomplete, 'place_changed', searchByAutocomplete);


    }


    function searchByAutocomplete() {
        inputAutocomplete.className = '';

        var place = autocomplete.getPlace();

        if (!place.geometry) {
            inputAutocomplete.className = 'notfound';
            return;
        }

        somospnt.util.ui.map.focusOnGooglePlace(place);

    }

    function searchBySearcher() {
        var placeToFind = $(".loca-searcher input").val();

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