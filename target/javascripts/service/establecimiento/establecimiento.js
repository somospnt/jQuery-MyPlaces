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