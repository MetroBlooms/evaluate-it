Ext.define('EvaluateIt.store.FactorTests', {
    extend: 'EvaluateIt.store.BaseStore',
    alias: 'store.FactorTests',
    config:{
        model: 'EvaluateIt.model.FactorTest',
        storeId: 'FactorTests',
        autoLoad: true,
        /*listeners: {
            beforeload: function () {
                var name = document.location.search.slice(1);
                this.getProxy().setExtraParam('name', name);
            }
        }*/

        data: [{
            description: 'Test',
            value: 1
        },{
            description: 'Test 2',
            value: 2
        }]
    }
});