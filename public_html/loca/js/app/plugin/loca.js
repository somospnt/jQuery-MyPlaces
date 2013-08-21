(function($) {
    $.fn.extend({
        loca: function(opcionesIngresadas) {

            var these = this;

            loca.service.establecimiento.obtenerEstablecimientos(opcionesIngresadas.urlGoogleDocs, function(establecimientos) {

                opcionesIngresadas.establecimientos = establecimientos;

                var opciones = {
                    establecimientos: [],
                    pais: "AR",
                    establecimientoListaTemplate: '<li>Ingrese un template para la lista de establecimientos</li>',
                    establecimientoInfoTemplate: '<div>Ingrese un template para la información del establecimiento</div>',
                    popUpMapaTemplate: '<div>Ingrese un template el pop-up del establecimiento</div>',
                    onLoad: function() {
                    },
                    onPlacesChange: function() {
                    },
                    onClickPlace: function() {
                    }
                };

                $.extend(opciones, opcionesIngresadas);

                var locaHtml = '<div class="loca-buscador"><input class="loca-buscador-input" type="text" /><ul><li class="loca-buscar">Buscar</li></ul></div><ul class="loca-categories"></ul><div class="loca-establecimientos"><div class="loca-listaEstablecimientos"><ul></ul></div><div class="loca-infoEstablecimiento"><div class="loca-infoContenido"></div></div></div><div class="loca-mapa"></div>';
                $(these).append(locaHtml);

                loca.util.ui.establecimientos.init(opciones.establecimientoListaTemplate, opciones.establecimientoInfoTemplate, opciones.onPlacesChange, opciones.onClickPlace);
                loca.util.ui.mapa.init(opciones.establecimientos, opciones.popUpMapaTemplate);
                loca.util.ui.buscador.init(opciones.pais);
                loca.util.ui.filtro.init(opciones.establecimientos);

                opciones.onLoad();

            });
        }
    });
}(jQuery));
