function startExp() {
	document.getElementById("start").disabled = true;
	var elem = document.getElementById("rectangle");	
	var movementTimes = [];
	var pos = 0, counter = 0, startTime = 0, endTime = 0, result = 0, diff = 0;
	var currentBoxWidth, currentBoxHeight, startPos, endPos;
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
			startPos = pos + currentBoxWidth/2;
		} else{
			
			endTime = (new Date()).getTime();
			endPos = pos + currentBoxWidth/2;

			result = endTime - startTime;
			diff = Math.abs(endPos - startPos);

			movementTimes.push(result);
			distances.push(diff);

			console.log("time between clicks in ms: " + result);
			console.log("abstand zwischen zielen in px: " + diff);

			startTime = endTime;
			startPos = endPos;
		}

		placeRectangle();
		
		console.log("counter: " + counter);

		if(counter == 50){
			window.localStorage.clear;
			elem.removeEventListener('mousedown',rectangleClicked);
			elem.style.visibility = 'hidden';
			console.log(movementTimes.length);
			console.log(distances.length); 
			console.log(widths.length);
			window.localStorage.setItem("movementtimes", JSON.stringify(movementTimes)); // Saving movementtimes
			window.localStorage.setItem("distances", JSON.stringify(distances)); // Saving saving distances
			window.localStorage.setItem("widths", JSON.stringify(widths)); // Saving saving widths
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

		console.log("Breite: " + currentBoxWidth);

		var min=0; 
		var max=window.innerWidth - currentBoxWidth;
		var random = 0;
    	random = Math.random() * (+max - +min) + +min;
		while(!((random > (pos + currentBoxWidth + (10*oneMMinPx)))||(random < (pos - (currentBoxWidth +(10*oneMMinPx) ))))){
			random = Math.random() * (+max - +min) + +min;	
		}
		pos = random;
		elem.style.left = pos + 'px';
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
