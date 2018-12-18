define([
    "dojo/i18n!js/config/nls/local",
    "esri/map",
    'esri/dijit/Basemap',
    "esri/dijit/BasemapLayer",
    "esri/geometry/Extent"

], function (i18n, Map, Basemap, BasemapLayer, Extent) {

    //create a div with id=mapDiv where the map will be displayed
    $('<div/>', {
        id: 'mapDiv',
    }).appendTo('#main');

    return {

        _map: null,
        _basemaps: [],

        initMap() {

            this._map = new Map("mapDiv", {
                zoom: 6, // Sets zoom level based on level of detail (LOD)            
                center: [3.262939, 36.618283], // Sets center point of view using longitude,latitude
                basemap: "streets"
            });
            return this._map;

        },
        initBasemaps() {
            // a list of basemaps that will be used in basemap gallery
            this._basemaps = [
                new Basemap({
                    layers: [new BasemapLayer({
                        url: "http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/"
                    })],
                    id: "streets",
                    title: i18n.streets,
                    thumbnailUrl: "https://stamen-tiles.a.ssl.fastly.net/terrain/10/177/409.png"
                }),
                new Basemap({
                    layers: [new BasemapLayer({
                        url: "http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
                    })],
                    id: "satellite",
                    title: i18n.satellite,
                    thumbnailUrl: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/4/5/4"
                }),
                new Basemap({
                    layers: [new BasemapLayer({
                        type: 'WebTiledLayer',
                        url: "https://{subDomain}.tile.openstreetmap.org/{level}/{col}/{row}.png",
                        subDomains: ["a", "b", "c"]
                    })],
                    id: "osm",
                    title: i18n.osm,
                    thumbnailUrl: "https://a.tile.openstreetmap.org/6/31/25.png"
                })
            ];
            return this._basemaps;
        },
        getMapView() {
            return this._map;
        },

        getBasemaps() {
            return this._basemaps;
        }

    }
});