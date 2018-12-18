define([
    "dojo/i18n!js/config/nls/local",
    "esri/layers/FeatureLayer",
    'esri/dijit/PopupTemplate'

], function (i18n, FeatureLayer, PopupTemplate) {

    return {
        _layers: [],
        initLayers() {
            this._layers = [
                new FeatureLayer('http://services.arcgis.com/P8Cok4qAP1sTVE59/arcgis/rest/services/ALG_ADMLEVEL2/FeatureServer/0', {
                    title: i18n.algeria,
                    id: i18n.algeria,
                    mode: FeatureLayer.MODE_SNAPSHOT,
                    outFields: ["*"],
                    infoTemplate: new PopupTemplate({
                        title: "{FIRST_NAME}",
                        description: "{FIRST_NAME}"
                    })
                })
            ]
            return this._layers;
        },
        getLayers() {
            return this._layers;
        }


    }
});