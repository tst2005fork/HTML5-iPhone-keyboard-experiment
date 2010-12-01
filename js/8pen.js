
/* DOM */
var board = document.getElementById('board');
var txtA = document.getElementById('textarea');
var bttn_ret = document.getElementById('bttn_ret');

/* VARS */
var startedFromCenter = false,
	inCenter = false,
	buildLetter = false,
	quadrant = 0,
	lastQuadrant = 0,
	quadrantsVisited = new Array(),
	emphasizedNode = 0,
	didReturn = false,
	centerPoint = {
		'x': 240,
		'y': 445
	};
	
/* RETURNING USER? */
if(localStorage['8pen_text']){
	txtA.value = localStorage['8pen_text'];
}

/* ADD EVENT LISTENERS */
board.addEventListener('touchstart', function(event) {handleTouchstart(event)}, false);
board.addEventListener('touchmove', function(event) {handleTouchmove(event)}, false);
board.addEventListener('touchend', function(event) {handleTouchend(event)}, false);

bttn_ret.addEventListener('touchstart', function(event) {handleReturnStart(event)}, false);
bttn_ret.addEventListener('touchend', function(event) {handleReturnEnd(event)}, false);

/* TOUCH START */
function handleTouchstart(event) {
	
	var touch = event.touches[0];		
	startedFromCenter = isInCenter(touch.pageX,touch.pageY);
	
};

/* TOUCH MOVE */
function handleTouchmove(event) {
	event.preventDefault();
	if(startedFromCenter)
	{
		var touch = event.touches[0];
		inCenter = isInCenter(touch.pageX,touch.pageY);
		
		//Moved out of center
		if(!inCenter)
		{
			buildLetter = false;
			
			//transfer coordinates
			var transC = transferCoords(touch.pageX - centerPoint.x,touch.pageY - centerPoint.y);
						
			//compute quadrant
			lastQuadrant = quadrant;
			quadrant = computeQuadrant(transC.tx, transC.ty);
			
			//still in the same quadrant?
			if(lastQuadrant != quadrant)
			{
				//add this quadrant to the array
				quadrantsVisited.push(quadrant);
				
				//emphasize letter
				if(quadrantsVisited.length > 1){
					if(emphasizedNode){
						toggleEmphasizeNode(emphasizedNode, 0);
					}
					emphasizedNode = document.getElementById(generateLetter());
					if(emphasizedNode){
						toggleEmphasizeNode(emphasizedNode, 1);
					}
				}
			}
			
		}
		else //in center
		{
			if(quadrantsVisited.length > 1 && !buildLetter){
				
				//update text
				txtA.value += generateLetter();
				updateLocalStorage(txtA.value);
			}
			
			//reset
			buildLetter = true;
			lastQuadrant = 0;
			quadrant = 0;
			quadrantsVisited = new Array();
			if(emphasizedNode){
				toggleEmphasizeNode(emphasizedNode, 0);
			}		
		}
	}
};

/* TOUCH END */
function handleTouchend(event){

	if(startedFromCenter && inCenter)
	{
		txtA.value += ' ';
	}
	if(emphasizedNode){
		toggleEmphasizeNode(emphasizedNode, 0);
	}
	quadrantsVisited = new Array();
};

/* IN CENTER? */
function isInCenter(x,y){
	var centerA = {
		'tl_x': 207,
		'tl_y': 412,
		'br_x': 272,
		'br_y': 477
	};

	if(x > centerA.tl_x && x < centerA.br_x && y > centerA.tl_y && y < centerA.br_y)
	{
		return true;
	}
	else
	{
		return false;
	}
}

/* TURN COORDINATES BY 45° */
function transferCoords(x,y){
	// PI/4 = 45° in rad
	var cos45 = Math.cos(Math.PI/4);
	var transC = {
		'tx': x * cos45 - y * cos45,
		'ty': x * cos45 + y * cos45
	};
	return transC;
}

/* GENERATE LETTER */
function generateLetter(){

	if(quadrantsVisited.length == 2)
	{
		if(quadrantsVisited[0] == 1 && quadrantsVisited[1] == 2){
			return 'i';
		}
		else if(quadrantsVisited[0] == 1 && quadrantsVisited[1] == 4)
		{
			return 'y';
		}
		else if(quadrantsVisited[0] == 2 && quadrantsVisited[1] == 1)
		{
			return 'a';
		}
		else if(quadrantsVisited[0] == 2 && quadrantsVisited[1] == 3)
		{
			return 'o';
		}
		else if(quadrantsVisited[0] == 3 && quadrantsVisited[1] == 2)
		{
			return 't';
		}
		else if(quadrantsVisited[0] == 3 && quadrantsVisited[1] == 4)
		{
			return 'e';
		}
		else if(quadrantsVisited[0] == 4 && quadrantsVisited[1] == 3)
		{
			return ',';
		}
		else if(quadrantsVisited[0] == 4 && quadrantsVisited[1] == 1)
		{
			return '.';
		}
	}
	
	else if(quadrantsVisited.length == 3)
	{
		if(quadrantsVisited[0] == 1 && quadrantsVisited[1] == 2){
			return 'd';
		}
		else if(quadrantsVisited[0] == 1 && quadrantsVisited[1] == 4){
			return 'x';
		}
		else if(quadrantsVisited[0] == 2 && quadrantsVisited[1] == 3){
			return 'u';
		}
		else if(quadrantsVisited[0] == 2 && quadrantsVisited[1] == 1){
			return 'r';
		}
		else if(quadrantsVisited[0] == 3 && quadrantsVisited[1] == 4){
			return 'l';
		}
		else if(quadrantsVisited[0] == 3 && quadrantsVisited[1] == 2){
			return 'h';
		}
		else if(quadrantsVisited[0] == 4 && quadrantsVisited[1] == 1){
			return 's';
		}
		else if(quadrantsVisited[0] == 4 && quadrantsVisited[1] == 3){
			return 'n';
		}
	}
	
	else if(quadrantsVisited.length == 4)
	{
		if(quadrantsVisited[0] == 1 && quadrantsVisited[1] == 2){
			return 'g';
		}
		else if(quadrantsVisited[0] == 1 && quadrantsVisited[1] == 4){
			return 'k';
		}
		else if(quadrantsVisited[0] == 2 && quadrantsVisited[1] == 3){
			return 'w';
		}
		else if(quadrantsVisited[0] == 2 && quadrantsVisited[1] == 1){
			return 'f';
		}
		else if(quadrantsVisited[0] == 3 && quadrantsVisited[1] == 4){
			return 'p';
		}
		else if(quadrantsVisited[0] == 3 && quadrantsVisited[1] == 2){
			return 'b';
		}
		else if(quadrantsVisited[0] == 4 && quadrantsVisited[1] == 1){
			return 'c';
		}
		else if(quadrantsVisited[0] == 4 && quadrantsVisited[1] == 3){
			return 'm';
		}
	}
	
	else if(quadrantsVisited.length == 5)
	{
		if(quadrantsVisited[0] == 1 && quadrantsVisited[1] == 2){
			return 'z';
		}
		else if(quadrantsVisited[0] == 1 && quadrantsVisited[1] == 4){
			return "'";
		}
		else if(quadrantsVisited[0] == 2 && quadrantsVisited[1] == 3){
			return '!';
		}
		else if(quadrantsVisited[0] == 2 && quadrantsVisited[1] == 1){
			return '?';
		}
		else if(quadrantsVisited[0] == 3 && quadrantsVisited[1] == 4){
			return 'q';
		}
		else if(quadrantsVisited[0] == 3 && quadrantsVisited[1] == 2){
			return '@';
		}
		else if(quadrantsVisited[0] == 4 && quadrantsVisited[1] == 1){
			return 'v';
		}
		else if(quadrantsVisited[0] == 4 && quadrantsVisited[1] == 3){
			return 'j';
		}
	}
	else
	{
		return '';
	}
}

function toggleEmphasizeNode(node, emph){
	if (emph)
	{
		node.style.fontWeight = "bold";
		node.style.fontSize = "33px";
	}
	else
	{
		node.style.fontWeight = "normal";
		node.style.fontSize = "28px";
	}
}

function computeQuadrant(tx,ty){
	if (tx > 0 && ty < 0)
	{
		return 1;
	}
	else if (tx > 0 && ty > 0)
	{
		return 2;
	}
	else if (tx < 0 && ty > 0)
	{
		return 3;
	}
	else if (tx < 0 && ty < 0)
	{
		return 4;
	}
}

function handleReturnStart(event){
	didReturn = true;
}

function handleReturnEnd(event){
	var curV = txtA.value;
	var curVstrLen = curV.length;
	txtA.value = curV.slice(0,curVstrLen-1);
	didReturn = false;
	updateLocalStorage(txtA.value);
}

function updateLocalStorage(val){
	if(supports_local_storage()){
		localStorage['8pen_text'] = val;
	}
}

function supports_local_storage(){
	try{
    	return 'localStorage' in window && window['localStorage'] !== null;
  	} catch(e){
    	return false;
  }
}