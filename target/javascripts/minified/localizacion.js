var loca={};
loca.service={};
loca.service.establecimiento=(function(){function b(d,e){a(d,e)
}function a(d,e){googleDocsSimpleParser.parseSpreadsheetCellsUrl({url:d,done:function(f){est=f;
e&&e(f)
},transformer:c})
}function c(d){d.tags=d.tags.split("|");
d.lat=parseFloat(d.lat);
d.lng=parseFloat(d.lng);
return d
}return{obtenerEstablecimientos:b}
})();
loca.util={};
loca.util.ui={};
loca.util.ui.buscador=(function(){var b,d,c;
function f(g){var h={componentRestrictions:{country:g}};
c=new google.maps.Geocoder(h);
d=$(".loca-buscador-input").get(0);
b=new google.maps.places.Autocomplete(d,h);
$(".loca-buscar").on("click",e);
$(".loca-buscador input").on("keypress",function(j){var i=j.charCode?j.charCode:j.keyCode;
if(i===13){e()
}});
google.maps.event.addListener(b,"place_changed",a)
}function a(){d.className="";
var g=b.getPlace();
if(!g.geometry){d.className="notfound";
return
}loca.util.ui.mapa.centrarEnGooglePlace(g)
}function e(){var g=$(".loca-buscador input").val();
c.geocode({address:g},function(i,h){if(h===google.maps.GeocoderStatus.OK){i[0].name=i[0].name||g;
loca.util.ui.mapa.centrarEnGooglePlace(i[0])
}})
}return{init:f}
})();
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
loca.util.ui.filtro=(function(){var c;
function d(f){c=$.templates('<li class="loca-category"><label class="loca-check" for="{{:#data}}">{{:#data}}<input type="checkbox" id="{{:#data}}" /></label></li>');
e(f);
$(".loca-category").on("click",b)
}function e(g){var f=a(g);
$(".loca-categories").append(c.render(f))
}function a(k){var g=[];
if(k){for(var h=0;
h<k.length;
h++){if(k[h].tags){for(var f=0;
f<k[h].tags.length;
f++){if($.inArray(k[h].tags[f],g)===-1){g.push(k[h].tags[f])
}}}}}return g
}function b(){var f=[];
$(".loca-check").removeClass("loca-check-on");
$(".loca-check input[type=checkbox]:checked").each(function(g,h){f.push($(h).attr("id"));
$(h).parent("label").addClass("loca-check-on")
});
loca.util.ui.mapa.filtrarLocaciones(f)
}return{init:d}
})();
loca.util.ui.mapa=(function(){var b,i,j,p;
var f=[];
function o(q,r){p=$.templates(r);
l();
g(q)
}function l(){var q={zoom:12,center:new google.maps.LatLng(-34.6090944,-58.389152),mapTypeId:google.maps.MapTypeId.ROADMAP};
b=new google.maps.Map($(".loca-mapa").get(0),q);
i=new google.maps.InfoWindow();
j=new google.maps.Marker({map:b});
google.maps.event.addListener(b,"idle",d)
}function g(r){for(var q=0;
q<r.length;
q++){(function(){var s={};
s.establecimiento=r[q];
s.establecimiento.id=q;
s.marker=new google.maps.Marker({position:new google.maps.LatLng(r[q].lat,r[q].lng),map:b,title:r[q].nombre,icon:r[q].iconoMapa});
f.push(s);
google.maps.event.addListener(s.marker,"click",function(){loca.util.ui.establecimientos.seleccionarPorId(s.establecimiento.id)
})
})()
}}function d(){var r=m();
var q=loca.util.ui.establecimientos.obtenerLocacionSeleccionada();
if(q&&$.inArray(q,r)===-1){r.unshift(q)
}loca.util.ui.establecimientos.mostrarLocaciones(r)
}function e(){var r=m();
var q=loca.util.ui.establecimientos.obtenerLocacionSeleccionada();
if(q&&$.inArray(q,r)===-1){q.infowindow=null;
i.close();
loca.util.ui.establecimientos.desSeleccionar()
}loca.util.ui.establecimientos.mostrarLocaciones(r)
}function m(){var q=[];
var s=b.getBounds();
for(var r=0;
r<f.length;
r++){if(f[r].marker.getVisible()&&s.contains(f[r].marker.getPosition())){q.push(f[r])
}}return h(q)
}function h(s){var r=b.getCenter();
for(var q=0;
q<s.length;
q++){s[q].distanciaAlCentro=google.maps.geometry.spherical.computeDistanceBetween(s[q].marker.getPosition(),r)
}return s.sort(function(u,t){return u.distanciaAlCentro-t.distanciaAlCentro
})
}function n(r){loca.util.ui.establecimientos.desSeleccionar();
i.close();
j.setVisible(false);
if(r.geometry.viewport){b.fitBounds(r.geometry.viewport)
}else{b.setCenter(r.geometry.location);
b.setZoom(17)
}j.setPosition(r.geometry.location);
j.setVisible(true);
var q="";
if(r.address_components){q=[(r.address_components[0]&&r.address_components[0].short_name||""),(r.address_components[1]&&r.address_components[1].short_name||""),(r.address_components[2]&&r.address_components[2].short_name||"")].join(" ")
}i.setContent('<div class="loca-info"><strong>'+r.name+"</strong><br>"+q);
i.open(b,j)
}function k(r){a(f,true);
if(r.length){var u=[];
for(var s=0;
s<f.length;
s++){for(var q=0;
q<f[s].establecimiento.tags.length;
q++){if($.inArray(f[s].establecimiento.tags[q],r)!==-1){u.push(f[s]);
break
}}}var t=[];
for(var s=0;
s<f.length;
s++){if($.inArray(f[s],u)===-1){t.push(f[s])
}}a(t,false)
}e()
}function a(r,s){for(var q=0;
q<r.length;
q++){r[q].marker.setVisible(s)
}}function c(q){i.setContent(p.render(q.establecimiento));
i.open(b,q.marker);
q.infowindow=i
}return{init:o,centrarEnGooglePlace:n,filtrarLocaciones:k,resaltarLocacion:c}
})();
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
