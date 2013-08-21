(function(a){a.fn.extend({loca:function(c){var b=this;
loca.service.establecimiento.obtenerEstablecimientos(c.urlGoogleDocs,function(d){c.establecimientos=d;
var f={establecimientos:[],pais:"AR",establecimientoListaTemplate:"<li>Ingrese un template para la lista de establecimientos</li>",establecimientoInfoTemplate:"<div>Ingrese un template para la información del establecimiento</div>",popUpMapaTemplate:"<div>Ingrese un template el pop-up del establecimiento</div>",onLoad:function(){},onPlacesChange:function(){},onClickPlace:function(){}};
a.extend(f,c);
var e='<div class="loca-buscador"><input class="loca-buscador-input" type="text" /><ul><li class="loca-buscar">Buscar</li></ul></div><ul class="loca-categories"></ul><div class="loca-establecimientos"><div class="loca-listaEstablecimientos"><ul></ul></div><div class="loca-infoEstablecimiento"><div class="loca-infoContenido"></div></div></div><div class="loca-mapa"></div>';
a(b).append(e);
loca.util.ui.establecimientos.init(f.establecimientoListaTemplate,f.establecimientoInfoTemplate,f.onPlacesChange,f.onClickPlace);
loca.util.ui.mapa.init(f.establecimientos,f.popUpMapaTemplate);
loca.util.ui.buscador.init(f.pais);
loca.util.ui.filtro.init(f.establecimientos);
f.onLoad()
})
}})
}(jQuery));