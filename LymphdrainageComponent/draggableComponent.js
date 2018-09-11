draggableComponent = {
	
	getRadiatio(elemType, x, y){
		
		rect = $(document.createElementNS("http://www.w3.org/2000/svg", 'rect')).addClass('emleGraphicOutline').attr({x: 35, y: 25, width: 200, height: 50});
		

		var g = $(document.createElementNS("http://www.w3.org/2000/svg", 'g')).attr({"class": "draggableGroup", id: "radiatio", transform: "matrix(1 0 0 1 "+x+" "+y+")", "background-color": "white"});
		g.context.transform.baseVal.getItem(0).matrix.e = parseInt(x, 10);
		g.context.transform.baseVal.getItem(0).matrix.f = parseInt(y, 10);
		
		
		var path = $(document.createElementNS("http://www.w3.org/2000/svg", 'path')).attr({"d": "M25.920159532057482,18.06967482391445 L12.431788037337174,32.95339509395065", "stroke": "#0b0bd5"});
		g.append(path);
		var path = $(document.createElementNS("http://www.w3.org/2000/svg", 'path')).attr({"d": "M21.18755071453972,2.764012787972373 L7.699179219819417,17.64773305800857", "stroke": "#0b0bd5"});
		g.append(path);
		var path = $(document.createElementNS("http://www.w3.org/2000/svg", 'path')).attr({"d": "M7.859062465230534,37.381663578737474 L7.859062465230534,29.474688716049158 L15.766037327919003,37.381663578737474 L7.859062465230534,37.381663578737474 z", "stroke": "#0b0bd5"});
		g.append(path);
		var path = $(document.createElementNS("http://www.w3.org/2000/svg", 'path')).attr({"d": "M6.710545344801567,17.810123835855382 L26.752740405412204,17.810123835855382", "stroke": "#0b0bd5"});
		g.append(path);
		
		var rect = $(document.createElementNS("http://www.w3.org/2000/svg", 'rect')).attr({stroke:"#0b0bd5", "stroke-width":"2", "stroke-linejoin":"round", "fill-rule":"nonzero", x:"3.5780563354492188", y:"3.4767933998973604", width:"27.780590057373047", height:"34.36286926269531", style:"color: rgb(0, 0, 0);", opacity:"0"});
		g.append(rect);
		
		return g;
	},
	
	init: function(json)
	{
		//var initJsonMock = "[{\"x\": \"100\", \"y\": \"50\", \"elemType\": \"radiatio\"}, {\"x\": \"100\", \"y\": \"150\", \"elemType\": \"radiatio\"}]";
		var parsed = JSON.parse(json);
		if(parsed.length > 0)
		{
			for(var i = 0; i < parsed.length; i++)
			{
				$("#mySvgId").append(this.getRadiatio(parsed[i].elemType, parsed[i].x, parsed[i].y));
			}
		}
	},
	
	drawRadiatio: function(e)
	{
		console.log('called drawRadiatio');
		
		$("#mySvgId").append((draggableComponent.getRadiatio("radiatio", 0, 0)));
		$(document).ready(draggableComponent.makedraggableGroup);
	},
	
	makedraggableGroup: function(e)
	{
		console.log('called makedraggableGroup');
		var selectedElement, offset, isDragging;
		
		$("#svgContainer").on("mousedown", selectElement);
		$("#svgContainer").on("mousemove", drag);
		$("#svgContainer").on("mouseup", endDrag);
		$(document).on("keyup", removeElement);

		function removeElement(e) {
			if (e.which == 46 && selectedElement != null) {
				selectedElement.remove();
			}	
		}
		
		function selectElement(e) 
		{
			console.log('called selectElement');
			if($(e.target.parentNode).attr('class') != undefined && $(e.target.parentNode).attr('class').indexOf('draggableGroup') != -1)
			{
				selectedElement = e.target.parentNode;
				isDragging = true;

				offset = getMousePosition(e);
				offset.x -= selectedElement.transform.baseVal.getItem(0).matrix.e;
				offset.y -= selectedElement.transform.baseVal.getItem(0).matrix.f;
			}
			else
			{
				selectedElement = null;
			}
				
		}
		
		function drag(e) 
		{
			if (isDragging) 
			{
				e.preventDefault();
				
				var cords = getMousePosition(e);
				if(cords != null){
					var x = cords.x - offset.x;
					var y = cords.y - offset.y;

					if(x > 0 && y > 0)
					{
						selectedElement.transform.baseVal.getItem(0).matrix.e = x;
						selectedElement.transform.baseVal.getItem(0).matrix.f = y;
					}
					console.log(selectedElement.transform.baseVal.getItem(0).matrix.e);
					console.log(selectedElement.transform.baseVal.getItem(0).matrix.f);
				}
			}
		}
		
		function endDrag(e) 
		{
			console.log('called endDrag');
			isDragging = false;
		}
		
		function getMousePosition(e) 
		{
			if (typeof e.target.getScreenCTM === "function") {
				  var CTM = e.target.getScreenCTM();
				  
				  return {
					x: e.clientX,
					y: e.clientY
				  };
			}
			else {
				console.error('e.target.getScreenCTM is not a function');
				return null;
			}
		}
	}
}