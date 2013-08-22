#jQuery Places

##Description
jQuery Places uses Google Maps API (v.3) to locate and display a set of determined places on the map.

It allows:
* To locate an address on the map and display the nearby determined places.
* Show customized information about the location.
* To define the template for customizing user interface (maps, search bar, location information)

##Requirements
* jQuery v. 1.10+
* JsRender

## Getting Started

Link to the JS file:

```html
<script type="text/javascript" src="../../loca/js/app/loca.js"></script>
<script type="text/javascript" src="../../loca/js/app/service/service.js"></script>
<script type="text/javascript" src="../../loca/js/app/service/establecimiento/establecimiento.js"></script>
<script type="text/javascript" src="../../loca/js/app/util/util.js"></script>
<script type="text/javascript" src="../../loca/js/app/util/ui/ui.js"></script>
<script type="text/javascript" src="../../loca/js/app/util/ui/establecimientos/establecimientos.js"></script>
<script type="text/javascript" src="../../loca/js/app/util/ui/mapa/mapa.js"></script>
<script type="text/javascript" src="../../loca/js/app/util/ui/buscador/buscador.js"></script>
<script type="text/javascript" src="../../loca/js/app/util/ui/filtro/filtro.js"></script>
<script type="text/javascript" src="../../loca/js/app/plugin/loca.js"></script>
```

Add the CSS file (or append contents to your own stylesheet):

```html
<link href="../css/localizacion.css" type="text/css" rel="stylesheet">
```

Add the container:
```html
  <div class="container">
  </div>
```
To initialize:

```javascript
// places
var places = [
    {
        "nombre" : "Place with required attributes",
        "iconoMapa" : "http://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/300px-The_Earth_seen_from_Apollo_17.jpg",
        "lat" : -34.6090944,
        "lng" : -58.389152,
        "tags" : ["place", "test", "required"]
    },
    {
        "id" : "1",
        "nombre" : "The Simpsons house",
        "direccion" : "742 Evergreen Terrace",
        "localidad" : "Springfield",
        "provincia" : "Fox",
        "descripcionCorta" : "The Simpsons house",
        "descripcionLarga" : "The Simpsons House was designed by Kaufman and Broad homebuilders",
        "iconoLista" : "http://upload.wikimedia.org/wikipedia/en/thumb/c/ca/742_Evergreen_Terrace.png/300px-742_Evergreen_Terrace.png",
        "iconoMapa" : "https://www.google.com.ar/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&docid=V-mdufPKgXG56M&tbnid=JyDhc1R3w2FQRM:&ved=0CAUQjRw&url=http%3A%2F%2Fes.simpsons.wikia.com%2Fwiki%2FThe_Simpsons&ei=iFYWUvLCC8S4igLLpoG4BA&psig=AFQjCNGBWz6ee5G22nwjMKlkCAX2g3x9Ng&ust=1377282042039516",
        "lat" : -34.6190943,
        "lng" : -58.389159,
        "tags" : ["simpson", "house"]
    }
];


// default
$('.container').loca();

// or with custom settings
$('.container').loca({
    country: 'AR',
    onLoad: function() {
      alert('Congratulation');
    }
});
```

## Settings

| Key            | Default       | Values                     |  Description                                     |
| ---------------|:-------------:|---------------------------:|-------------------------------------------------:|
| establecimientos             | `[]`                                                                       | Array                   |                                                                              |
| pais                         | `AR`                                                                     | ISO 3166-1 country code | Two letter ISO 3166-1 country code used for suggest adress in the search bar |
| establecimientoListaTemplate | `<li>Ingrese un template para la lista de establecimientos</li>`         | String                  | Template or its id to render the locations list with jsRender                |
| establecimientoInfoTemplate  | `<div>Ingrese un template para la información del establecimiento</div>` | String                  | Template or its id to render the selected location detail with jsRender      |
| popUpMapaTemplate            | `<div>Ingrese un template el pop-up del establecimiento</div>`           | String                  | Template or its id to render the selected location tooltip in the map with jsRender |
| onLoad                       |                                                                          | function                | Callback function, which is called when the map has been loaded |
| onPlacesChange               |                                                                          | function                | Callback function, which is called when the locations list change|
| onClickPlace                 |                                                                          | function                | Callback function, which is called when click in a place |


### Required attributes of establecimientos key
| Attribute            | Description |
| ---------------|:-------------:|
|lat| location latitude |
|lng| location longitude|
|iconoMapa| icon that represent the place in the map |
|nombre| place name|
|tags| to categorized places|


## License