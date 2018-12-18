define([
    "dojo/i18n!js/config/nls/local",
    "esri/layers/FeatureLayer"

], function (i18n, FeatureLayer) {

    return {
        // the feature layers needs to be published in 10.3 or higher version of arcgis server
        sources: [
            {
                featureLayer: new FeatureLayer("http://services.arcgis.com/P8Cok4qAP1sTVE59/arcgis/rest/services/ALG_ADMLEVEL2/FeatureServer/0"),
                searchFields: ["FIRST_NAME"],
                suggestionTemplate: "${FIRST_NAME}",
                exactMatch: false,
                outFields: ["*"],
                name: i18n.algeria,                
                placeholder: i18n.algeria,
                maxResults: 6,
                maxSuggestions: 6,
                enableSuggestions: true,
                minCharacters: 0,
                localSearchOptions: {
                    distance: 5000
                }
            }           
        ],
        getSources() {
            return this.srouces;
        }

    }
});