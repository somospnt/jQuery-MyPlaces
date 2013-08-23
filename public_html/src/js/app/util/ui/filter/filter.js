somospnt.util.ui.filter = (function() {

    var filterTemplate;

    function init(places) {

        filterTemplate = $.templates('<li class="myplaces-category"><label class="myplaces-check" for="{{:#data}}">{{:#data}}<input type="checkbox" id="{{:#data}}" /></label></li>');
        addFilters(places);
        $('.myplaces-category').on('click', changeFilter);
    }

    function addFilters(places) {

        var filters = getFilters(places);
        $('.myplaces-categories').append(filterTemplate.render(filters));

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

    function changeFilter() {

        var filters = [];

        $('.myplaces-check').removeClass('myplaces-check-on');
        $('.myplaces-check input[type=checkbox]:checked').each(
                function(index, element) {
                    filters.push($(element).attr('id'));
                    $(element).parent('label').addClass('myplaces-check-on');
                });

        somospnt.util.ui.map.filterLocations(filters);

    }

    return {
        init: init
    };
})();