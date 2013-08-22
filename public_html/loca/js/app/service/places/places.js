somospnt.service.places = (function() {

    function getPlaces(urlJson, callback) {
        getPlacesService(urlJson, callback);
    }

    function getPlacesService(urlJson, callback) {
        googleDocsSimpleParser.parseSpreadsheetCellsUrl({
            url: urlJson,
            done: function(result) {
                est = result;
                callback && callback(result);
            },
            transformer: transformPlace
        });
    }

    function transformPlace(place) {
        place.tags = place.tags.split("|");
        place.lat = parseFloat(place.lat);
        place.lng = parseFloat(place.lng);
        return place;
    }

    return {
        getPlaces: getPlaces
    };

})();
