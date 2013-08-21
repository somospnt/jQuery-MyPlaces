loca.util.ui.establecimientos = (function() {
    var establecimientoListaTemplate, establecimientoInfoTemplate, mensajeTemplate;
    var claseEstablecimiento = "loca-establecimiento-";
    var placesChangeCallback, clickPlaceCallback;

    function init(listaTemplate, infoTemplate, placesChange, clickPlace) {
        establecimientoListaTemplate = $.templates(listaTemplate);
        establecimientoInfoTemplate = $.templates(infoTemplate);
        placesChangeCallback = placesChange;
        clickPlaceCallback = clickPlace;
        $('.loca-listaEstablecimientos ul').on('click', 'li', mostrarInformacionDeEstablecimiento);
        $('.loca-infoContenido').append('<p class="loca-info-results">Para ver el detalle de un establecimiento haga click sobre el mismo.</p>');
    }


    function mostrarInformacionDeEstablecimiento() {
        var establecimientoLi = $(this);
        var locacion = establecimientoLi.data("locacion");
        $('.loca-establecimientoSelected').removeClass('loca-establecimientoSelected');
        establecimientoLi.addClass('loca-establecimientoSelected');
        $('.loca-infoContenido').empty().append(establecimientoInfoTemplate.render(locacion.establecimiento));
        loca.util.ui.mapa.resaltarLocacion(locacion);

        clickPlaceCallback();
    }

    function mostrarLocaciones(locaciones) {

        var locacionSeleccionada = $('.loca-establecimientoSelected').data("locacion");

        var establecimientosUl = $('.loca-listaEstablecimientos ul');

        establecimientosUl.empty();

        if (locaciones.length) {
            for (var i = 0; i < locaciones.length; i++) {

                establecimientosUl.append(
                        $(establecimientoListaTemplate.render(locaciones[i].establecimiento))
                        .addClass(claseEstablecimiento + locaciones[i].establecimiento.id)
                        .data("locacion", locaciones[i])
                        );
            }
        } else {
            establecimientosUl.append('<p class="loca-info-results">No hay resultados para mostrar en esta zona</p>');
        }

        if (locacionSeleccionada) {
            $("." + claseEstablecimiento + locacionSeleccionada.establecimiento.id).addClass('loca-establecimientoSelected');
        }

        placesChangeCallback();
    }

    function seleccionarPorId(id) {
        $("." + claseEstablecimiento + id).click();
    }


    function obtenerLocacionSeleccionada() {
        return $('.loca-establecimientoSelected').data("locacion");
    }

    function desSeleccionar() {
        $('.loca-establecimientoSelected').removeClass("loca-establecimientoSelected");
        $('.loca-infoContenido').empty().append('<p class="loca-info-results">Para ver el detalle de un establecimiento haga click sobre el mismo.</p>');
    }

    return {
        init: init,
        mostrarLocaciones: mostrarLocaciones,
        seleccionarPorId: seleccionarPorId,
        obtenerLocacionSeleccionada: obtenerLocacionSeleccionada,
        desSeleccionar: desSeleccionar
    };

})();