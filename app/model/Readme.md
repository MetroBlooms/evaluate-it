# This folder contains the models for evaluateIt!

TODO: Expand detail in Confluence

**Evaluator**
 
# The current model:

* hasMany: SiteEvaluation (A flattened representation of the desired model)


# The desired model:

* hasMany: Evaluation (0 or many)

**Site**

* hasMany: Evaluation, (0 or many)
	     SiteMaintainer (0 or many)

* hasOne:  Geolocation, (0 or 1)
		 Address (1 and only 1)

**Evaluation**

* hasMany: EvaluationScorecard, (0-4 when not complete; 5 when complete)
		 EvaluationFeature, (0 or many; TODO: define complete list of relevant features)
		 EvaluationImage (0 or many; TODO: implement as per http://code.medula.cl/article_Picture-capture-and-uploader-app-with-ST2.html)

* hasOne:  EvaluationAward, (0 or 1)
		 Evaluator (1 and only one)

Attribute descriptions located in each model's class description




		



