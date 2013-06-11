Ext.define('EvaluateIt.controller.SiteImageCapture',{
    extend : 'Ext.app.Controller',
    requires: [
        'Ext.device.Camera'
    ],
    config: {
        refs: {
            myEvaluationList: 'evaluationList'
        },
        control:{
            'siteEvaluationForm button[itemId=siteImage]' : {
                tap : 'openCamera'
            }
        }
    },
    openCamera: function(button,eve){
        Ext.device.Camera.capture({
            success: this.onCaptureSuccess,
			//failure: this.onCaptureFailure,
            scope: this,
            quality : 50,//for testing having this at 50 does faster uploads
            source: 'library',
            destination: 'file'
        });
    },
    onCaptureSuccess: function(uri) {
        console.log('got foto:'+uri);
        var lostor = Ext.getStore('theImageQueue');
        lostor.add({
            src: uri
        });
        lostor.sync();
    },
	onCaptureFailure: function() {

		console.log('capture failure');
	}
});
