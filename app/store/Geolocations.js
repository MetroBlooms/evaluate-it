Ext.define('EvaluateIt.store.Geolocations', {
    extend: 'EvaluateIt.store.BaseStore',
    alias: 'store.Geolocations',
    config:{
        model: 'EvaluateIt.model.Geolocation',
        autoLoad: true
    }
});
