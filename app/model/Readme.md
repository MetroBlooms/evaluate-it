# This folder contains the models for evaluateIt!

TODO: Expand detail

# The current model:

**SiteEvaluation** (A flattened representation of the desired model)

* hasOne: Evaluator

# The desired model:

**Site**

* hasMany: Evaluation,
	     SiteMaintainer

* hasOne:  Geolocation,
		 Address 

**Evaluation**

* hasMany: EvaluationFactorScorecard,
		 EvaluationFeature,
		 EvaluationImage (TODO: implement as per http://code.medula.cl/article_Picture-capture-and-uploader-app-with-ST2.html)

* hasOne:  EvaluationAward,
		 Evaluator


Attribute descriptions located in each model's class description




		



