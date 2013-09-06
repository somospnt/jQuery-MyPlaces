/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

somospnt.util.ui.map = (function() {

    var map, infowindow, marker, mapPopUpTemplate;
    var locations = [];

    function init(places, popUpTemplate) {
        mapPopUpTemplate = $.templates(popUpTemplate);
        initializeGoogleMaps();
        loadPlaces(places);
    }

    function initializeGoogleMaps() {
        var options = {
            zoom: 12,
            center: new google.maps.LatLng(-34.60909440, -58.3891520),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map($('.myplaces-map').get(0), options);
        infowindow = new google.maps.InfoWindow();

        marker = new google.maps.Marker({
            map: map
        });

        google.maps.event.addListener(map, 'idle', changeInMap);

    }

    function loadPlaces(places) {

        locations = [];
        for (var i = 0; i < places.length; i++) {

            (function() {
                var location = {};
                location.place = places[i];

                location.place.id = i;

                location.marker = new google.maps.Marker({
                    position: new google.maps.LatLng(places[i].lat, places[i].lng),
                    map: map,
                    title: places[i].name,
                    icon: places[i].mapIcon
                });

                locations.push(location);

                google.maps.event.addListener(location.marker, 'click', function() {
                    somospnt.util.ui.places.selecteById(location.place.id);
                });
            })();

        }
    }


    function changeInMap() {

        var visibleLocations = getVisibleLocations();

        var selectedLocation = somospnt.util.ui.places.getSelectedLocation();

        if (selectedLocation && $.inArray(selectedLocation, visibleLocations) === -1) {
            visibleLocations.unshift(selectedLocation);
        }

        somospnt.util.ui.places.showLocations(visibleLocations);

    }

    function changeFilters() {

        var visibleLocations = getVisibleLocations();

        var selectedLocation = somospnt.util.ui.places.getSelectedLocation();

        if (selectedLocation && $.inArray(selectedLocation, visibleLocations) === -1) {
            selectedLocation.infowindow = null;
            infowindow.close();
            somospnt.util.ui.places.unselect();
        }

        somospnt.util.ui.places.showLocations(visibleLocations);
    }

    function getVisibleLocations() {
        var visibleLocations = [];
        var bounds = map.getBounds();

        for (var i = 0; i < locations.length; i++) {

            if (locations[i].marker.getVisible() && bounds.contains(locations[i].marker.getPosition())) {
                visibleLocations.push(locations[i]);
            }
        }

        return sortLocationsByDistanceToCenter(visibleLocations);
    }


    function sortLocationsByDistanceToCenter(locations) {

        var center = map.getCenter();

        for (var i = 0; i < locations.length; i++) {
            locations[i].distanceToCenter = google.maps.geometry.spherical.computeDistanceBetween(locations[i].marker.getPosition(), center);
        }

        return locations.sort(function(a, b) {
            return a.distanceToCenter - b.distanceToCenter;
        });
    }

    function focusOnGooglePlace(googlePlace) {
        somospnt.util.ui.places.unselect();
        infowindow.close();
        marker.setVisible(false);

        if (googlePlace.geometry.viewport) {
            map.fitBounds(googlePlace.geometry.viewport);
        } else {
            map.setCenter(googlePlace.geometry.location);
            map.setZoom(17);
        }

        marker.setPosition(googlePlace.geometry.location);
        marker.setVisible(true);

        var address = '';

        if (googlePlace.address_components) {
            address = [
                (googlePlace.address_components[0] && googlePlace.address_components[0].short_name || ''),
                (googlePlace.address_components[1] && googlePlace.address_components[1].short_name || ''),
                (googlePlace.address_components[2] && googlePlace.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindow.setContent('<div class="myplaces-info"><strong>' + googlePlace.name + '</strong><br>' + address);
        infowindow.open(map, marker);

    }

    function filterLocations(filters) {

        makeLocationsVisible(locations, true);

        if (filters.length) {

            var matchedLocations = [];

            for (var i = 0; i < locations.length; i++) {
                for (var j = 0; j < locations[i].place.tags.length; j++) {
                    if ($.inArray(locations[i].place.tags[j], filters) !== -1) {
                        matchedLocations.push(locations[i]);
                        break;
                    }
                }
            }

            var notMatchedLocations = [];

            for (var i = 0; i < locations.length; i++) {
                if ($.inArray(locations[i], matchedLocations) === -1) {
                    notMatchedLocations.push(locations[i]);
                }
            }

            makeLocationsVisible(notMatchedLocations, false);
        }

        changeFilters();
    }

    function makeLocationsVisible(locations, visible) {
        for (var i = 0; i < locations.length; i++) {
            locations[i].marker.setVisible(visible);
        }
    }

    function highlightPlace(location) {
        infowindow.setContent(mapPopUpTemplate.render(location.place));
        infowindow.open(map, location.marker);
        location.infowindow = infowindow;
    }

    return {
        init: init,
        focusOnGooglePlace: focusOnGooglePlace,
        filterLocations: filterLocations,
        highlightPlace: highlightPlace
    };

})();