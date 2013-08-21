loca.util.ui.establecimientos=(function(){var i,c,j;
var g="loca-establecimiento-";
var a,h;
function l(m,p,n,o){i=$.templates(m);
c=$.templates(p);
a=n;
h=o;
$(".loca-listaEstablecimientos ul").on("click","li",b);
$(".loca-infoContenido").append('<p class="loca-info-results">Para ver el detalle de un establecimiento haga click sobre el mismo.</p>')
}function b(){var n=$(this);
var m=n.data("locacion");
$(".loca-establecimientoSelected").removeClass("loca-establecimientoSelected");
n.addClass("loca-establecimientoSelected");
$(".loca-infoContenido").empty().append(c.render(m.establecimiento));
loca.util.ui.mapa.resaltarLocacion(m);
h()
}function e(p){var m=$(".loca-establecimientoSelected").data("locacion");
var n=$(".loca-listaEstablecimientos ul");
n.empty();
if(p.length){for(var o=0;
o<p.length;
o++){n.append($(i.render(p[o].establecimiento)).addClass(g+p[o].establecimiento.id).data("locacion",p[o]))
}}else{n.append('<p class="loca-info-results">No hay resultados para mostrar en esta zona</p>')
}if(m){$("."+g+m.establecimiento.id).addClass("loca-establecimientoSelected")
}a()
}function f(m){$("."+g+m).click()
}function k(){return $(".loca-establecimientoSelected").data("locacion")
}function d(){$(".loca-establecimientoSelected").removeClass("loca-establecimientoSelected");
$(".loca-infoContenido").empty().append('<p class="loca-info-results">Para ver el detalle de un establecimiento haga click sobre el mismo.</p>')
}return{init:l,mostrarLocaciones:e,seleccionarPorId:f,obtenerLocacionSeleccionada:k,desSeleccionar:d}
})();