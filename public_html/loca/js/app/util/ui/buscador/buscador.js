loca.util.ui.buscador = (function() {

    var autocomplete, autocompletarInput, geocoder;

    function init(pais) {

        var opciones = {
            componentRestrictions: {country: pais}
        };

        geocoder = new google.maps.Geocoder(opciones);

        autocompletarInput = $('.loca-buscador-input').get(0);
        autocomplete = new google.maps.places.Autocomplete(autocompletarInput, opciones);

        $('.loca-buscar').on('click', buscarPorInputBusqueda);

        $('.loca-buscador input').on('keypress', function(e) {
            var key = e.charCode ? e.charCode : e.keyCode;
            if (key === 13) {
                buscarPorInputBusqueda();
            }
        });

        google.maps.event.addListener(autocomplete, 'place_changed', buscarPorAutocompletar);


    }


    function buscarPorAutocompletar() {
        autocompletarInput.className = '';

        var resultado = autocomplete.getPlace();

        if (!resultado.geometry) {
            autocompletarInput.className = 'notfound';
            return;
        }

        loca.util.ui.mapa.centrarEnGooglePlace(resultado);

    }

    function buscarPorInputBusqueda() {
        var textoBuscado = $(".loca-buscador input").val();

        geocoder.geocode({'address': textoBuscado}, function(resultados, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                resultados[0].name = resultados[0].name || textoBuscado;

                loca.util.ui.mapa.centrarEnGooglePlace(resultados[0]);
            }
        });

    }

    return {
        init: init
    };

})();