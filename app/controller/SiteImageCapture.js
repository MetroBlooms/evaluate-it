/**
 *
 * Controls writing image uri to data store
 */

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
            'evaluationForm button[itemId=siteImage]' : {
                tap : 'openCamera'
            }
        }
    },
    openCamera: function(button,eve){
        Ext.device.Camera.capture({
            success: this.onCaptureSuccess,
			failure: this.onCaptureFailure,
            scope: this,
            quality: 10, // 10 as per http://grandiz.com/phonegap-development/phonegap-file-transfer-error-code-3-solved/
            source: 'album',
            destination: 'file'
        });
    },
    onCaptureSuccess: function(uri) {
        console.log('got foto:'+uri);
        var lostor = Ext.getStore('theImageQueue'),
            selectedImage = document.getElementById('selectedImage');;
        lostor.add({
            src: uri
        });
        lostor.sync();

        // display image in form panel
        selectedImage.style.display = 'block';
        selectedImage.src = uri;

    },
	onCaptureFailure: function() {

		console.log('capture failure');
	}
});
