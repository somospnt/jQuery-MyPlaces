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