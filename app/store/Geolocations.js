Ext.define('EvaluateIt.store.Geolocations', {
    extend: 'Ext.data.Store',
    alias: 'store.Geolocations',
    config:{
        model: 'EvaluateIt.model.Geolocation',
        autoLoad: true
    }
});
