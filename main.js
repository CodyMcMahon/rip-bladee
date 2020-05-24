draw_count = 0;
state_count = 0;
skull_ani = 0;

me = {
	mouse_down : 0,
	y : 0,
	x : 0,
	up :0,
	down:0,
	left:0,
	right:0
};

girl = {
	x:25,
	y:25
}
rockets = [];
last_rocket_time = 0;

skulls = [];


monkeys = [];

screen =0;
paint_brush = 0;

var gun_girl = new Image();
gun_girl.src = 'gungirl.png';

var missle = new Image();
missle.src = 'missile.png';

var background = new Image();
background.src = 'background.jpg';

var monkey = new Image();
monkey.src = 'monkey.png';

var boom = new Image();
boom.src = 'boom.png';

var skull = new Image();
skull.src = 'skull.png';

monkeydie = document.createElement("audio");
monkeydie.src = "monkeys1.mp3";
monkeydie.setAttribute("preload", "auto");
monkeydie.setAttribute("controls", "none");
monkeydie.style.display = "none";
monkeydie.volume = 0.2;

rocketlaunch = document.createElement("audio");
rocketlaunch.src = "shoot_01.ogg";
rocketlaunch.setAttribute("preload", "auto");
rocketlaunch.setAttribute("controls", "none");
rocketlaunch.style.display = "none";
rocketlaunch.volume = 0.2;

music = document.createElement("audio");
music.src = "music.mp3";
music.setAttribute("preload", "auto");
music.setAttribute("controls", "none");
music.style.display = "none";
music.volume = 0.5;

explodee = document.createElement("audio");
explodee.src = "explosion_02.ogg";
explodee.setAttribute("preload", "auto");
explodee.setAttribute("controls", "none");
explodee.style.display = "none";
explodee.volume = 0.5;

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback,element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

function keyDown(e){
  //alert(e.keyCode);
  switch(e.keyCode){
    case 65 : 
   		me.left = 1;
      break;
    case 68 : 
   		me.right = 1;
      break;
    case 83 : 
   		me.down = 1;
      break;
      
    case 87 : 
   		me.up = 1;
      break;
  }
}


function keyUp(e){
  //alert(e.keyCode);
  switch(e.keyCode){
    case 65 : 
   		me.left = 0;
      break;
    case 68 : 
   		me.right = 0;
      break;
    case 83 : 
   		me.down = 0;
      break;
      
    case 87 : 
   		me.up = 0;
      break;
  }
}

function mouseDown(e){
    me.mouse_down = 1;
}
function mouseUp(e){
    me.mouse_down = 0;
}
function mouseMove(e){
    me.x =  e.clientX - screen.getBoundingClientRect().left;
    me.y = e.clientY;
    draw_state();
}
function mouseOut(e){
    me.mouse_down = 0;
}
function get_ani(i){
  switch(i){
    case 0 : 
   		return {x:192,y:192};
    case 1 : 
   		return {x:124,y:192};
      break;
    case 2 : 
   		return {x:64,y:192};
      break;
      
    case 3 : 
   		return {x:0,y:192};
      break;
    case 4 : 
   		return {x:192,y:128};
      break;
    case 5 : 
   		return {x:128,y:128};
      break;
    case 6 : 
   		return {x:64,y:128};
      break;
    case 7 : 
   		return {x:0,y:128};
      break;
    case 8 : 
   		return {x:192,y:64};
      break;
    case 9 : 
   		return {x:128,y:64};
      break;
    case 10 : 
   		return {x:64,y:64};
      break;
    case 11 : 
   		return {x:0,y:64};
      break;
    case 12 : 
   		return {x:192,y:0};
      break;
    case 13 : 
   		return {x:128,y:0};
      break;
    case 14 : 
   		return {x:64,y:0};
      break;
    case 15 : 
   		return {x:0,y:0};
      break;
  }
}
function get_ani_skull(i){
	i = i%12;
  switch(i){
    case 0 : 
   		return {x:96,y:64};
    case 1 : 
   		return {x:64,y:64};
      break;
    case 2 : 
   		return {x:32,y:64};
      break;
      
    case 3 : 
   		return {x:0,y:64};
      break;
    case 4 : 
   		return {x:96,y:32};
      break;
    case 5 : 
   		return {x:64,y:32};
      break;
    case 6 : 
   		return {x:32,y:32};
      break;
    case 7 : 
   		return {x:0,y:32};
      break;
    case 8 : 
   		return {x:96,y:0};
      break;
    case 9 : 
   		return {x:64,y:0};
      break;
    case 10 : 
   		return {x:32,y:0};
      break;
    case 11 : 
   		return {x:0,y:0};
      break;
  }
}
function draw_state(){//640 × 235
	draw_count++;
  	paint_brush.drawImage(background,state_count%640,0,100,235,0,0,screen.width,screen.height);
  	paint_brush.drawImage(background,0,0,100,235,(screen.width / 100)* (640 - state_count%640),0,screen.width,screen.height);

  	paint_brush.drawImage(gun_girl,16*((me.mouse_down?0:8)+(draw_count%4))+1,0,16,16,girl.x-25,girl.y-25,50,50);

	for(var i =0; i < rockets.length; i++){
		if(rockets[i].hit){
			var temp_ani = get_ani(rockets[i].ani);
			paint_brush.drawImage(boom,temp_ani.x,temp_ani.y,64,64,rockets[i].x-12,rockets[i].y-12,24,24);
		} else {
			paint_brush.drawImage(missle,rockets[i].x-12,rockets[i].y-12,24,24);
		}
	}
	for(var i =0; i < monkeys.length; i++){
		paint_brush.drawImage(monkey,monkeys[i].x-50,monkeys[i].y-50,100,100);
	}
	for(var i =0; i < skulls.length; i++){
		var temp_ani_skull = get_ani_skull(skull_ani);
		paint_brush.drawImage(skull,temp_ani_skull.x,temp_ani_skull.y,32,32,skulls[i].x-16,skulls[i].y-16,32,32);
	}
}
function onWindowResize() {
	screen.width = window.innerWidth;
	screen.height = window.innerHeight;
}
function update_state(){
  music.play();
	state_count++;
	if(state_count%6 === 0){
		skull_ani++;
	}
	if((state_count % 100) === 0){
		monkeys[monkeys.length] = {
			x : screen.width,
			y : (Math.random() * (screen.height - 200)) + 100,
			hit:0
		};
	}
	if(me.mouse_down && (last_rocket_time + 4 < state_count)){
		last_rocket_time = state_count;
		rockets[rockets.length] = {
			x : girl.x,
			y : girl.y,
      xd: (me.x - girl.x)/20,
      yd: (me.y - girl.y)/20,
			hit : 0,
			ani : 0,
		};

		rocketlaunch.currentTime = 0;
		rocketlaunch.play();
	}
	for(var i =0; i < rockets.length; i++){
		if(rockets[i].hit === 0){
			rockets[i].x += rockets[i].xd;
			rockets[i].y += rockets[i].yd;
		} else if (state_count%4===0){
			rockets[i].ani += 1;
			if(rockets[i].ani === 16){
				rockets.splice(i,1);
			}
		}
	}
	for(var i =0; i < skulls.length; i++){
			skulls[i].x += (((i%5)*24+12) - skulls[i].x)/100;
			skulls[i].y += (((Math.floor(i/5))*24+12) - skulls[i].y)/100;
		
	}
	for(var i =0; i < monkeys.length; i++){
		monkeys[i].x -= 5;
	}
	var temp_height = girl.y + 5;
	var temp_width = girl.x;
	if(me.up) temp_height -= 12;
	if(me.down) temp_height += 7;
	if(me.right) temp_width += 10;
	if(me.left) temp_width -= 10;
	if(temp_height > screen.height - 25){
		girl.y = screen.height - 25;
	}
	else if(temp_height < 25){
		girl.y = 25;
	} else {
		girl.y = temp_height;
	}
	if(temp_width > screen.width - 25){
		girl.x = screen.width - 25;
	}
	else if(temp_width < 25){
		girl.x = 25;
	} else {
		girl.x = temp_width;
	}
	for(var i = 0; i < rockets.length; i++){
		if(!rockets[i].hit){
			for(var j = 0; j < monkeys.length; j++){
				if(Math.abs(rockets[i].x - monkeys[j].x) < 25 && Math.abs(rockets[i].y - monkeys[j].y) < 25){
					rockets[i].hit = 1;
					monkeys[j].hit++;
          explodee.currentTime = 0;
          explodee.play();
				}
			}
		}
	}
  for(var i = 0; i < monkeys.length; i++){
    if(monkeys[i].x < -25){
      monkeys.splice(i,1);
      i--;
    }
    else if(monkeys[i].hit > 5){
      skulls[skulls.length] = {x:monkeys[i].x,y:monkeys[i].y,ani:0};
      monkeys.splice(i,1);
      i--;
      monkeydie.currentTime = 0;
      monkeydie.play();
    }
  }
  for(var i = 0; i < rockets.length; i++){
    if(rockets[i].x < -25 || rockets[i].x > screen.width + 25){
      rockets.splice(i,1);
      i--;
    }
    else if(rockets[i].y < -25 || rockets[i].y > screen.height + 25){
      rockets.splice(i,1);
      i--;
    }
  }

	setTimeout(update_state,1000/60);
}

function startup(){
	screen =document.getElementById("mat");
	screen.width = window.innerWidth;
	screen.height = window.innerHeight;
	paint_brush = screen.getContext("2d");
	screen.addEventListener("mousedown", mouseDown, false);
	screen.addEventListener("mouseup", mouseUp, false);
	screen.addEventListener("mousedown", keyDown, false);
	screen.addEventListener("mouseup", keyUp, false);
	screen.addEventListener("mousemove", mouseMove, false);
//	screen.addEventListener("mouseout", mouseOut, false);
	window.addEventListener("resize", onWindowResize, false);
	window.addEventListener("keydown", keyDown, false);
	window.addEventListener("keyup", keyUp, false);
	setTimeout(update_state,1000/60);






	(function animationLOOP() {
	    draw_state();
	    requestAnimFrame(animationLOOP, screen);
	})();
}