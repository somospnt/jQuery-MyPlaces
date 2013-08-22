somospnt.util.ui.places = (function() {
    var placeListTemplate, placeInfoTemplate;
    var placeClass = "loca-establecimiento-";
    var placesChangeCallback, clickPlaceCallback;

    function init(listTemplate, infoTemplate, placesChange, clickPlace) {
        placeListTemplate = $.templates(listTemplate);
        placeInfoTemplate = $.templates(infoTemplate);
        placesChangeCallback = placesChange;
        clickPlaceCallback = clickPlace;
        $('.loca-placesList ul').on('click', 'li', showInformationOfPlace);
        $('.loca-infoContenido').append('<p class="loca-info-results">To see the details of a place please click on it.</p>');
    }


    function showInformationOfPlace() {
        var placeLi = $(this);
        var location = placeLi.data("location");
        $('.loca-selectedPlaces').removeClass('loca-selectedPlaces');
        placeLi.addClass('loca-selectedPlaces');
        $('.loca-infoContenido').empty().append(placeInfoTemplate.render(location.place));
        somospnt.util.ui.map.highlightPlace(location);

        clickPlaceCallback();
    }

    function showLocations(locations) {

        var selectedLocation = $('.loca-selectedPlaces').data("location");

        var placeUl = $('.loca-placesList ul');

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
            placeUl.append('<p class="loca-info-results">No results to display in this area</p>');
        }

        if (selectedLocation) {
            $("." + placeClass + selectedLocation.place.id).addClass('loca-selectedPlaces');
        }

        placesChangeCallback();
    }

    function selecteById(id) {
        $("." + placeClass + id).click();
    }


    function getSelectedLocation() {
        return $('.loca-selectedPlaces').data("location");
    }

    function unselect() {
        $('.loca-selectedPlaces').removeClass("loca-selectedPlaces");
        $('.loca-infoContenido').empty().append('<p class="loca-info-results">To see the details of a place please click on it.</p>');
    }

    return {
        init: init,
        showLocations: showLocations,
        selecteById: selecteById,
        getSelectedLocation: getSelectedLocation,
        unselect: unselect
    };

})();