/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

somospnt.util.ui.places = (function() {
    var placeListTemplate, placeInfoTemplate;
    var placeClass = "myplaces-establecimiento-";
    var placesChangeCallback, clickPlaceCallback;

    function init(listTemplate, infoTemplate, placesChange, clickPlace) {
        placeListTemplate = $.templates(listTemplate);
        placeInfoTemplate = $.templates(infoTemplate);
        placesChangeCallback = placesChange;
        clickPlaceCallback = clickPlace;
        $('.myplaces-placesList ul').on('click', 'li', showInformationOfPlace);
        $('.myplaces-infoContenido').append('<p class="myplaces-info-results">To see the details of a place please click on it.</p>');
    }


    function showInformationOfPlace() {
        var placeLi = $(this);
        var location = placeLi.data("location");
        $('.myplaces-selectedPlaces').removeClass('myplaces-selectedPlaces');
        placeLi.addClass('myplaces-selectedPlaces');
        $('.myplaces-infoContenido').empty().append(placeInfoTemplate.render(location.place));
        somospnt.util.ui.map.highlightPlace(location);

        clickPlaceCallback();
    }

    function showLocations(locations) {

        var selectedLocation = $('.myplaces-selectedPlaces').data("location");

        var placeUl = $('.myplaces-placesList ul');

        placeUl.empty();

        if (locations.length) {
            for (var i = 0; i < locations.length; i++) {

                placeUl.append(
                        $(placeListTemplate.render(locations[i].place))
                        .addClass(placeClass + locations[i].place.id)
                        .data("location", locations[i])
                        );
            }
        } else {
            placeUl.append('<p class="myplaces-info-results">No results to display in this area</p>');
        }

        if (selectedLocation) {
            $("." + placeClass + selectedLocation.place.id).addClass('myplaces-selectedPlaces');
        }

        placesChangeCallback();
    }

    function selecteById(id) {
        $("." + placeClass + id).click();
    }


    function getSelectedLocation() {
        return $('.myplaces-selectedPlaces').data("location");
    }

    function unselect() {
        $('.myplaces-selectedPlaces').removeClass("myplaces-selectedPlaces");
        $('.myplaces-infoContenido').empty().append('<p class="myplaces-info-results">To see the details of a place please click on it.</p>');
    }

    return {
        init: init,
        showLocations: showLocations,
        selecteById: selecteById,
        getSelectedLocation: getSelectedLocation,
        unselect: unselect
    };

})();