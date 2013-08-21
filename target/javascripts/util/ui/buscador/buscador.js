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