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