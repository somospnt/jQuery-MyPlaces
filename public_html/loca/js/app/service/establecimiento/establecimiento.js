loca.service.establecimiento = (function() {

    function obtenerEstablecimientos(urlJson, callback) {
        obtenerEstablecimientosServicio(urlJson, callback);
    }

    function obtenerEstablecimientosServicio(urlJson, callback) {
        googleDocsSimpleParser.parseSpreadsheetCellsUrl({
            url: urlJson,
            done: function(resultado) {
                est = resultado;
                callback && callback(resultado);
            },
            transformer: transformarEstablecimiento
        });
    }

    function transformarEstablecimiento(establecimiento) {
        establecimiento.tags = establecimiento.tags.split("|");
        establecimiento.lat = parseFloat(establecimiento.lat);
        establecimiento.lng = parseFloat(establecimiento.lng);
        return establecimiento;
    }

    return {
        obtenerEstablecimientos: obtenerEstablecimientos
    };

})();
