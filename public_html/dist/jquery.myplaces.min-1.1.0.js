var somospnt={};
somospnt.util={};
somospnt.util.ui={};
somospnt.util.ui.filter=(function(){var a={};
function d(f){a=f;
filterTemplate=$.templates("#"+a.filterTemplateId);
e(a.places);
$("."+a.filterContainerClass).on("click",b)
}function e(f){var g=c(f);
$("."+a.filterMainContainerClass).append(filterTemplate.render(g))
}function c(g){var k=[];
if(g){for(var h=0;
h<g.length;
h++){if(g[h].tags){for(var f=0;
f<g[h].tags.length;
f++){if($.inArray(g[h].tags[f],k)===-1){k.push(g[h].tags[f])
}}}}}return k
}function b(f){var g=[];
$(this).toggleClass(a.filterActiveClass);
$("."+a.filterActiveClass).each(function(h,i){g.push($(i).attr("id"))
});
somospnt.util.ui.map.filterLocations(g);
f.stopPropagation();
f.preventDefault()
}return{init:d}
})();
somospnt.util.ui.map=(function(){var d,h,i,f;
var k=[];
function p(r,s,q){f=$.templates(s);
n(q);
g(r)
}function n(q){d=new google.maps.Map($(".myplaces-map").get(0),q);
h=new google.maps.InfoWindow();
i=new google.maps.Marker({map:d});
google.maps.event.addListener(d,"idle",c)
}function g(q){k=[];
for(var r=0;
r<q.length;
r++){(function(){var s={};
s.place=q[r];
s.place.id=r;
s.marker=new google.maps.Marker({position:new google.maps.LatLng(q[r].lat,q[r].lng),map:d,title:q[r].name,icon:q[r].mapIcon});
k.push(s);
google.maps.event.addListener(s.marker,"click",function(){somospnt.util.ui.places.selecteById(s.place.id)
})
})()
}}function c(){var r=a();
var q=somospnt.util.ui.places.getSelectedLocation();
if(q&&$.inArray(q,r)===-1){r.unshift(q)
}somospnt.util.ui.places.showLocations(r)
}function b(){var r=a();
var q=somospnt.util.ui.places.getSelectedLocation();
if(q&&$.inArray(q,r)===-1){q.infowindow=null;
h.close();
somospnt.util.ui.places.unselect()
}somospnt.util.ui.places.showLocations(r)
}function a(){var s=[];
var r=d.getBounds();
for(var q=0;
q<k.length;
q++){if(k[q].marker.getVisible()&&r.contains(k[q].marker.getPosition())){s.push(k[q])
}}return e(s)
}function e(r){var q=d.getCenter();
for(var s=0;
s<r.length;
s++){r[s].distanceToCenter=google.maps.geometry.spherical.computeDistanceBetween(r[s].marker.getPosition(),q)
}return r.sort(function(u,t){return u.distanceToCenter-t.distanceToCenter
})
}function m(r){somospnt.util.ui.places.unselect();
h.close();
i.setVisible(false);
if(r.geometry.viewport){d.fitBounds(r.geometry.viewport)
}else{d.setCenter(r.geometry.location);
d.setZoom(17)
}i.setPosition(r.geometry.location);
i.setVisible(true);
var q="";
if(r.address_components){q=[(r.address_components[0]&&r.address_components[0].short_name||""),(r.address_components[1]&&r.address_components[1].short_name||""),(r.address_components[2]&&r.address_components[2].short_name||"")].join(" ")
}h.setContent('<div class="myplaces-info"><strong>'+r.name+"</strong><br>"+q);
h.open(d,i)
}function l(u){j(k,true);
if(u.length){var r=[];
for(var t=0;
t<k.length;
t++){for(var s=0;
s<k[t].place.tags.length;
s++){if($.inArray(k[t].place.tags[s],u)!==-1){r.push(k[t]);
break
}}}var q=[];
for(var t=0;
t<k.length;
t++){if($.inArray(k[t],r)===-1){q.push(k[t])
}}j(q,false)
}b()
}function j(q,s){for(var r=0;
r<q.length;
r++){q[r].marker.setVisible(s)
}}function o(q){h.setContent(f.render(q.place));
h.open(d,q.marker);
q.infowindow=h
}return{init:p,focusOnGooglePlace:m,filterLocations:l,highlightPlace:o}
})();
somospnt.util.ui.places=(function(){var d,h;
var k="myplaces-place-";
var a,f;
function j(l,o,m,n){d=$.templates(l);
h=$.templates(o);
a=m;
f=n;
$(".myplaces-placesList ul").on("click","li",b);
$(".myplaces-infoContenido").append('<p class="myplaces-info-results">To see the details of a place please click on it.</p>')
}function b(){var m=$(this);
var l=m.data("location");
$(".myplaces-selectedPlaces").removeClass("myplaces-selectedPlaces");
m.addClass("myplaces-selectedPlaces");
$(".myplaces-infoContenido").empty().append(h.render(l.place));
somospnt.util.ui.map.highlightPlace(l);
f()
}function g(l){var n=$(".myplaces-selectedPlaces").data("location");
var o=$(".myplaces-placesList ul");
o.empty();
if(l.length){for(var m=0;
m<l.length;
m++){o.append($(d.render(l[m].place)).addClass(k+l[m].place.id).data("location",l[m]))
}}else{o.append('<p class="myplaces-info-results">No results to display in this area</p>')
}if(n){$("."+k+n.place.id).addClass("myplaces-selectedPlaces")
}a()
}function i(l){$("."+k+l).click()
}function e(){return $(".myplaces-selectedPlaces").data("location")
}function c(){$(".myplaces-selectedPlaces").removeClass("myplaces-selectedPlaces");
$(".myplaces-infoContenido").empty().append('<p class="myplaces-info-results">To see the details of a place please click on it.</p>')
}return{init:j,showLocations:g,selecteById:i,getSelectedLocation:e,unselect:c}
})();
somospnt.util.ui.searcher=(function(){var c,b,e;
function f(i,g){var h={componentRestrictions:{country:i}};
e=new google.maps.Geocoder(h);
b=$("."+g);
c=new google.maps.places.Autocomplete(b.get(0),h);
$(".myplaces-buscar").on("click",d);
b.on("keypress",function(k){var j=k.charCode?k.charCode:k.keyCode;
if(j===13){d()
}});
google.maps.event.addListener(c,"place_changed",a)
}function a(){b.removeClass("notfound");
var g=c.getPlace();
if(!g.geometry){b.addClass("notfound");
return
}somospnt.util.ui.map.focusOnGooglePlace(g)
}function d(){var g=b.val();
e.geocode({address:g},function(i,h){if(h===google.maps.GeocoderStatus.OK){i[0].name=i[0].name||g;
somospnt.util.ui.map.focusOnGooglePlace(i[0])
}})
}return{init:f}
})();
(function(a){a.fn.extend({myplaces:function(c){var d=a(this);
var b={places:[],country:"AR",placeListTemplate:"<li>Enter a template for the list of places</li>",placeInfoTemplate:"<div>Enter a template for the information of the place</div>",popUpMapTemplate:"<div>Enter a template for the pop-up of the place</div>",mapOptions:{zoom:12,center:new google.maps.LatLng(-34.6090944,-58.389152),mapTypeId:google.maps.MapTypeId.ROADMAP},onLoad:function(){},onPlacesChange:function(){},onClickPlace:function(){},searcherInputClass:"myplaces-searcher-input",filterMainContainerClass:"myplaces-categories",filterContainerClass:"myplaces-filter-container",filterClass:"myplaces-check",filterActiveClass:"myplaces-check-on",filterTemplateId:"filtersTemplate",mainTemplateId:"mainTemplate"};
a.extend(b,c);
d.append("<div class='myplaces-spinner'></div>");
d.append(a.templates("#"+b.mainTemplateId).render());
somospnt.util.ui.places.init(b.placeListTemplate,b.placeInfoTemplate,b.onPlacesChange,b.onClickPlace);
somospnt.util.ui.map.init(b.places,b.popUpMapTemplate,b.mapOptions);
somospnt.util.ui.searcher.init(b.country,b.searcherInputClass);
somospnt.util.ui.filter.init(b);
b.onLoad();
d.find(".myplaces-spinner").remove()
}})
}(jQuery));
