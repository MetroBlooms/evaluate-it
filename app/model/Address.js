Ext.require(['EvaluateIt.model.Site']);

Ext.define('EvaluateIt.model.Address', {
    extend: 'Ext.data.Model',
    //extend: 'EvaluateIt.model.BaseModel',
 
    config: {
        idProperty: 'id', // use with proxy.SQL 
	//identifier: 'uuid', // use with proxy.localstorage 
        fields: [
			{name: 'id', type: 'int'},
	   		{name: 'address', type: 'string'},
            {name: 'city', type: 'string'},
            {name: 'state', type: 'string'},
            {name: 'zipcode', type: 'string'},
			{name: 'county', type: 'string'},
			{name: 'site_id', type: 'string'}
        ],
		proxy: {
           	type: "localstorage",  //"sql"
			reader      : {
            	type : 'json',
            	root : 'data'
       		}
           //database: 'Yo'
        },
		belongsTo: 
		[
			{ 
				model: 'EvaluateIt.model.Site', 
				associationKey: 'siteId',
				name: 'site',
				instanceName: 'site',
				//getterName: 'getSite',
				//setterName: 'setSite',
				primaryKey: 'id',
      			foreignStore: 'Sites',
				foreignKey: 'site_id' 
			}
		],
		hasOne: 
		[
			{
				primaryKey: 'id',
				foreignKey: 'site_id',
				foreignStore: 'Sites', 
				model: 'EvaluateIt.model.Sites',
				name: 'Sites',
				getterName: 'getSite',
				setterName: 'setSite'
			}
		] 


    }
});
