//require jquery
var memory = function(){
	var current_up = null;
	var states = {
		begin: { 
			started: function(){
				console.log("begin: started -> wait_turn_first");
				state = states.wait_turn_first;
			} },
		wait_turn_first: {
			turn: function(tile){
				console.log("wait_turn_first: turn -> wait_turn_second");
				state = states.wait_turn_second;
				current_up = tile;
			}
		},
		wait_turn_second: {
			turn: function(tile){
				console.log("wait_turn_second: turn -> ...");
				state = states.wait_turn_first;
				if (tile.matches(current_up)) {
					console.log("match");
				} else {
					console.log("no match");
				}
			}
		},
		won: ""
	};
	var state = states.begin;

	var createImage = function(i){
		var img = document.createElement("img");
		var src = "images/butterfly-0"+(i+1)+".jpg";
		img.setAttribute("src", src);
		img.setAttribute("class", "front");
		img.matches = function(other){
			var other_src = other.getAttribute("src");
			return src == other_src;
		};
		return img;
	};

	var createBack = function(i){
		var img = document.createElement("img");
		img.setAttribute("src", "images/back.jpg");
		img.setAttribute("class", "back");
		return img;
	};

	var createTile = function(i){
		var tile = document.createElement("div");
		var img = createImage(i);
		tile.appendChild(img);
		tile.img = img;
		var back = createBack(i);
		tile.appendChild(back);
		tile.setAttribute("class", "face-down");
		tile.matches = function(other){
			return tile.img.matches(other.img);
		};
		var up = function(){
			tile.setAttribute("class", "face-up");
			state.turn(tile);
			next = down;
		};
		var down = function(){
			tile.setAttribute("class", "face-down");
			next = up;
		};
		var next = up;
		$(tile).click(function(){
			next();
		});
		return tile;
	};

	var shuffled = function(elements) {
		return elements;
	};

	var memory = {
		build: function(element){
				var tiles = [];
				for (var i=0; i != 9; ++i) {
					tiles.push(createTile(i));
					tiles.push(createTile(i));
				}
				tiles = shuffled(tiles);
				for (var i=0; i != tiles.length; ++i){
					element.append(tiles[i]);
				}
		},
		start: function(){ 
			state.started();
		}
	};
	return memory;
}();
