define([
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dojo/text!app/aside/aside.html",
        "dojo/i18n!app/aside/nls/local",
        "js/config/mapConfig",
        "js/config/layerConfig",
        "esri/dijit/BasemapGallery",
        "esri/dijit/Legend",
        "esri/dijit/LayerList",
        "esri/dijit/Measurement",
        "esri/units"

    ],
    function (
        declare,
        _WidgetBase,
        _TemplatedMixin,
        template,
        i18n,
        mapConfig,
        layerConfig,
        BasemapGallery,
        Legend,
        LayerList,
        Measurement,
        Units


    ) {
        return declare([_WidgetBase, _TemplatedMixin], {
            templateString: template,
            i18n: i18n,
            startup() {

                let basemapContainer = document.createElement("div");
                $(this.domNode).find("#basemapGallery").append(basemapContainer);

                //create basemap gallery to swith between basemaps
                let basemapGallery = new BasemapGallery({
                    showArcGISBasemaps: false,
                    basemaps: mapConfig.initBasemaps(),
                    map: this.map
                }, basemapContainer);

                basemapGallery.startup();

                basemapGallery.on("error", (msg) => {
                    console.log("basemap gallery error:  ", msg);
                });

                //create legend widget to dispaly symbology of layers
                let legendContainer = document.createElement('div');
                $(legendContainer).addClass("legend");
                $(this.domNode).find("#legend").append(legendContainer);
                
                let legendDijit = new Legend({
                    map: this.map
                }, legendContainer);
                legendDijit.startup();

                //create layer list widget to display layers and have show/hide fonctionallity
                let layers = document.createElement("div");
                $(this.domNode).find("#layerList").append(layers);
                
                var layerList = new LayerList({
                    map: this.map,
                    layers: layerConfig.getLayers()
                }, layers);
                layerList.startup();
                
                //create Measurement widget
                var measure = document.createElement("div");
                $(this.domNode).find("#measure").append(measure);

                console.log(this.map.spatialReference.wkid);
                

                var measurement = new Measurement({
                    map: this.map,
                    defaultLengthUnit: Units.METERS
                }, measure);

                measurement.startup();

            }
        });
    });