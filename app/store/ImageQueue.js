Ext.define('EvaluateIt.store.ImageQueue',{
	extend: 'Ext.data.Store',
	xtype:'imagesqueue',
	requires:['Ext.data.proxy.LocalStorage'],
config: {
		fields:['src'],
		storeId:'theImageQueue',
		autoLoad:true,
		proxy:{
			type:'localstorage',
			id:'idImagesQueue',
			reader: {
				type: 'json'
			}
		}
	}
});
