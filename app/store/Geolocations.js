Ext.require(['Ext.data.proxy.SQL','EvaluateIt.model.Geolocation']);
Ext.require(['Ext.data.proxy.SQL','EvaluateIt.model.Geolocation']);

Ext.define('EvaluateIt.store.Geolocations', {
    extend: 'Ext.data.Store',
    requires: ['Ext.data.proxy.SQL','EvaluateIt.model.Geolocation'],
    config:{
        model: 'EvaluateIt.model.Geolocation',
        autoLoad: true
    }
});
