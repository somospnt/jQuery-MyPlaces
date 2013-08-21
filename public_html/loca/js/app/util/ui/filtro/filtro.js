loca.util.ui.filtro = (function() {

    var filtroTemplate;

    function init(establecimientos) {

        filtroTemplate = $.templates('<li class="loca-category"><label class="loca-check" for="{{:#data}}">{{:#data}}<input type="checkbox" id="{{:#data}}" /></label></li>');
        agregarFiltros(establecimientos);
        $('.loca-category').on('click', cambioFiltro);
    }

    function agregarFiltros(establecimientos) {

        var filtros = obtenerFiltros(establecimientos);
        $('.loca-categories').append(filtroTemplate.render(filtros));

    }

    function obtenerFiltros(establecimientos) {
        var filtros = [];

        if (establecimientos) {
            for (var i = 0; i < establecimientos.length; i++) {
                if (establecimientos[i].tags) {
                    for (var j = 0; j < establecimientos[i].tags.length; j++) {
                        if ($.inArray(establecimientos[i].tags[j], filtros) === -1) {
                            filtros.push(establecimientos[i].tags[j]);
                        }
                    }
                }
            }
        }

        return filtros;
    }

    function cambioFiltro() {

        var filtros = [];

        $('.loca-check').removeClass('loca-check-on');
        $('.loca-check input[type=checkbox]:checked').each(
                function(index, element) {
                    filtros.push($(element).attr('id'));
                    $(element).parent('label').addClass('loca-check-on');
                });

        loca.util.ui.mapa.filtrarLocaciones(filtros);

    }

    return {
        init: init
    };
})();