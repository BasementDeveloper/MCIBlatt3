function startExp() {
	document.getElementById("start").disabled = true;
	var elem = document.getElementById("rectangle");	
	var posLeft = 0, posTop = 0, counter = 0, startTime = 0, endTime = 0, result = 0, diffLeft = 0, diffTop = 0, distance = 0;
	var currentBoxWidth, currentBoxHeight, startPosLeft, endPosLeft, startPosTop, endPosTop, alpha;
	var movementTimes = [];
	var distances = [];
	var widths = [];
	// Auflösung 1920x1080 , Bildschirmbreite: 34,5cm, Bildschirmhöhe: 19,4 cm
	const oneMMinPx = 5.565217391304348;
	var targetFigures = [[10*oneMMinPx,5*oneMMinPx],[20*oneMMinPx,10*oneMMinPx],[30*oneMMinPx,15*oneMMinPx],[40*oneMMinPx,20*oneMMinPx],[50*oneMMinPx,25*oneMMinPx]];
	var allTargetFigures = [];
	
	for(var z = 0; z < targetFigures.length; z++){
		for(var w = 0; w < 10; w++){
			allTargetFigures.push(targetFigures[z]);
		}
	}
	allTargetFigures = shuffle(allTargetFigures);

	 

	placeRectangle();
	elem.addEventListener('mousedown',rectangleClicked);
	elem.style.visibility = 'visible';
	
	/**
	 * Gets triggered when the rectangle is clicked.
	 * Logs the movement times and distances.
	 * 
	 */
	function rectangleClicked() {
		counter = counter + 1;
		console.log("Rectangle geklickt");
		

		// Daten die gespeichert werden müssen:
		// - MT (MovementTime) Die Zeit die benötigt wird um von dem einen Ziel auf das andere zu klicken
		// - A (Amplitude)(Abstand) vom startpunkt zum mittelpunkt des ziels
		// - W Breite des Ziels
		if(counter == 1){
			startTime = (new Date()).getTime();
			startPosLeft = posLeft + currentBoxWidth/2;
			startPosTop = posTop + currentBoxHeight/2;
		} else{
			
			endTime = (new Date()).getTime();
			endPosLeft = posLeft + currentBoxWidth/2;
			endPosTop = posTop + currentBoxHeight/2;

			result = endTime - startTime;
			diffLeft = Math.abs(endPosLeft - startPosLeft);
			diffTop = Math.abs(endPosTop - startPosTop);
			distance = Math.sqrt(Math.pow(diffLeft,2) + Math.pow(diffTop,2));
			alpha = Math.asin(diffTop / distance);
			alpha = alpha * 180 / Math.PI;

			movementTimes.push(result);
			distances.push(distance);


			console.log("time between clicks in ms: " + result);
			console.log("abstand zwischen zielen in px: " + distance);
			console.log("Einfallswinkel alpha: " + alpha);

			startTime = endTime;
			startPosLeft = endPosLeft;
			startPosTop = endPosTop;
		}

		placeRectangle();
		
		console.log("counter: " + counter);

		if(counter == 50){
			elem.removeEventListener('mousedown',rectangleClicked);
			elem.style.visibility = 'hidden';
			console.log(movementTimes.length);
			console.log(distances.length); 
			console.log(widths.length);
		}
	}
	
	
	/**
	 * Places a red rectangle on a random position on the black line.
	 * Logs the target widths.
	 */
	function placeRectangle() {
		
		if(counter < 50){
			currentBoxWidth = allTargetFigures[counter][0];
			widths.push(currentBoxWidth);
			currentBoxHeight = allTargetFigures[counter][1];
		}

		elem.style.width = currentBoxWidth + 'px';
		elem.style.height = currentBoxHeight + 'px';

		//console.log("Breite: " + currentBoxWidth);

		var min1=0; 
		var max1=window.innerWidth - 200 - currentBoxWidth;
		var min2=0; 
		var max2=window.innerHeight -200 - currentBoxHeight;
		var random = 0, random2 = 0;
		random = Math.random() * (+max1 - +min1) + +min1;
		random2 = Math.random() * (+max2 - +min2) + +min2;
		while(!((random > (posLeft + currentBoxWidth + (10*oneMMinPx)))||(random < (posLeft - (currentBoxWidth +(10*oneMMinPx) ))))){
			random = Math.random() * (+max1 - +min1) + +min1;	
		}
		while(!((random2 > (posTop + currentBoxHeight + (10*oneMMinPx)))||(random2 < (posTop - (currentBoxHeight +(10*oneMMinPx) ))))){
			random2 = Math.random() * (+max2 - +min2) + +min2;	
		}
		posLeft = random;
		posTop = random2;
		elem.style.left = posLeft + 'px';
		elem.style.top = posTop + 'px';
		console.log("currentBoxHeight: " + currentBoxHeight);
		console.log("innerHeight: " + window.innerHeight);
		console.log("posTop: " + posTop);

	}

	/**
	 * Shuffles an Array in place.
	 * @param arr An Array containing the target figures.
	 */
	function shuffle(arr) {
		var j, x, i;
		for (i = arr.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = arr[i];
			arr[i] = arr[j];
			arr[j] = x;
		}
		return arr;
	}
}