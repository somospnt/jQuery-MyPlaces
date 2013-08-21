loca.util.ui.mapa = (function() {

    var map, infowindow, marker, mapaPopUpTemplate;
    var locaciones = [];

    function init(establecimientos, popUpTemplate) {
        mapaPopUpTemplate = $.templates(popUpTemplate);
        inicializarGoogleMaps();
        cargarEstablecimientos(establecimientos);
    }

    function inicializarGoogleMaps() {
        var opciones = {
            zoom: 12,
            center: new google.maps.LatLng(-34.60909440, -58.3891520),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map($('.loca-mapa').get(0), opciones);
        infowindow = new google.maps.InfoWindow();

        marker = new google.maps.Marker({
            map: map
        });

        google.maps.event.addListener(map, 'idle', cambioEnMapa);

    }

    function cargarEstablecimientos(establecimientos) {

        for (var i = 0; i < establecimientos.length; i++) {

            // clausuramos el creado de una locación para que cuando ocurra un evento 
            // la variable location corresponda a la locacion correspondiente y no a 
            // la ultima que se creo que queda guardada por ir siendo pisada por el for
            (function() {
                var locacion = {};
                locacion.establecimiento = establecimientos[i];
                
                locacion.establecimiento.id = i;

                locacion.marker = new google.maps.Marker({
                    position: new google.maps.LatLng(establecimientos[i].lat, establecimientos[i].lng),
                    map: map,
                    title: establecimientos[i].nombre,
                    icon: establecimientos[i].iconoMapa
                });

                locaciones.push(locacion);

                google.maps.event.addListener(locacion.marker, 'click', function() {
                    loca.util.ui.establecimientos.seleccionarPorId(locacion.establecimiento.id);
                });
            })();

        }
    }


    function cambioEnMapa() {

        var locacionesVisibles = obtenerLocacionesVisibles();

        var locacionSeleccionada = loca.util.ui.establecimientos.obtenerLocacionSeleccionada();

        // si hay un cambio en el mapa y se habia seleccionado una locacion, dejamos la misma
        // en el listado porque consideramos que puede interesarle al usuario no perder esa referencia
        if (locacionSeleccionada && $.inArray(locacionSeleccionada, locacionesVisibles) === -1) {
            locacionesVisibles.unshift(locacionSeleccionada);
        }

        loca.util.ui.establecimientos.mostrarLocaciones(locacionesVisibles);

    }

    function cambioEnFiltros() {

        var locacionesVisibles = obtenerLocacionesVisibles();

        var locacionSeleccionada = loca.util.ui.establecimientos.obtenerLocacionSeleccionada();

        // si la locacion seleccionada no esta dentro de los filtros aplicados
        // entonces la desseleccionamos y cerramos su pop-up
        if (locacionSeleccionada && $.inArray(locacionSeleccionada, locacionesVisibles) === -1) {
            locacionSeleccionada.infowindow = null;
            infowindow.close();
            loca.util.ui.establecimientos.desSeleccionar();
        }

        loca.util.ui.establecimientos.mostrarLocaciones(locacionesVisibles);
    }

    function obtenerLocacionesVisibles() {
        var locacionesVisibles = [];
        var bounds = map.getBounds();

        for (var i = 0; i < locaciones.length; i++) {

            if (locaciones[i].marker.getVisible() && bounds.contains(locaciones[i].marker.getPosition())) {
                locacionesVisibles.push(locaciones[i]);
            }
        }

        return ordenarLocacionesPorDistanciaAlCentro(locacionesVisibles);
    }


    function ordenarLocacionesPorDistanciaAlCentro(locaciones) {

        var centro = map.getCenter();

        for (var i = 0; i < locaciones.length; i++) {
            locaciones[i].distanciaAlCentro = google.maps.geometry.spherical.computeDistanceBetween(locaciones[i].marker.getPosition(), centro);
        }

        return locaciones.sort(function(a, b) {
            return a.distanciaAlCentro - b.distanciaAlCentro;
        });
    }

    function centrarEnGooglePlace(googlePlace) {
        loca.util.ui.establecimientos.desSeleccionar();
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

        infowindow.setContent('<div class="loca-info"><strong>' + googlePlace.name + '</strong><br>' + address);
        infowindow.open(map, marker);

    }

    function filtrarLocaciones(filtros) {

        hacerVisibleLocaciones(locaciones, true);

        if (filtros.length) {

            var locacionesCoincidentes = [];

            for (var i = 0; i < locaciones.length; i++) {
                for (var j = 0; j < locaciones[i].establecimiento.tags.length; j++) {
                    if ($.inArray(locaciones[i].establecimiento.tags[j], filtros) !== -1) {
                        locacionesCoincidentes.push(locaciones[i]);
                        break;
                    }
                }
            }

            var locacionesNoCoincidentes = [];

            for (var i = 0; i < locaciones.length; i++) {
                if ($.inArray(locaciones[i], locacionesCoincidentes) === -1) {
                    locacionesNoCoincidentes.push(locaciones[i]);
                }
            }

            hacerVisibleLocaciones(locacionesNoCoincidentes, false);
        }

        cambioEnFiltros();
    }

    function hacerVisibleLocaciones(locaciones, visible) {
        for (var i = 0; i < locaciones.length; i++) {
            locaciones[i].marker.setVisible(visible);
        }
    }

    function resaltarLocacion(location) {
        infowindow.setContent(mapaPopUpTemplate.render(location.establecimiento));
        infowindow.open(map, location.marker);
        location.infowindow = infowindow;
    }

    return {
        init: init,
        centrarEnGooglePlace: centrarEnGooglePlace,
        filtrarLocaciones: filtrarLocaciones,
        resaltarLocacion: resaltarLocacion
    };

})();