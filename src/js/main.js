define([
    "js/initWidgets",
    "js/config/mapConfig",
    "js/config/layerConfig",
    "js/config/searchConfig",
    "js/loader",
    "esri/dijit/Search",
    "esri/dijit/Scalebar",
    "dojo/domReady!"

], function (initWidgets, mapConfig, layerConfig, searchConfig, loader, Search, Scalebar) {

    return {

        map: null,
        startup: function () {

            this.initLanguage();

            this.initMap();

            $(window).on('load', function () {
                loader.windowLoaded = true;
                loader.onLoad();
            });

        },
        initMap: function () {

            this.map = mapConfig.initMap();

            this.map.on("load", () => {

                this.initLayers();
                this.initScaleBar();
                this.initSearch();

                initWidgets.startup(this.map);

            });

        },
        initLayers: function () {

            this.map.addLayers(layerConfig.initLayers());

        },
        initSearch: function () {

            let searchWidget = $("<div/>", {
                class: "searchWidget"
            }).appendTo("#main");

            let searchBox = document.createElement("div");
            searchWidget.append(searchBox);

            let search = new Search({
                map: this.map,
                sources: searchConfig.sources
            }, searchBox);

            search.startup();

        },
        initScaleBar: function () {

            let scalebar = new Scalebar({
                map: this.map,
                attachTo: "bottom-right",
                // "dual" displays both miles and kilometers
                // "english" is the default, which displays miles
                // use "metric" for kilometers
                scalebarUnit: "dual"
            });
        },

        initLanguage: function () {

            if (localStorage.getItem('locale') == 'ar') {
                $('body').addClass('rightToLeft');

            } else {
                $('body').removeClass('rightToLeft');
            }
        }
    }


});