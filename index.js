var PI=3.1415926535, M_WIDTH=800, M_HEIGHT=450, game_tick;
var app, game_res, game_tick=0, objects={}, towers=[], emojies=[], bullets=[], explosions=[], expl_textures=[];
var screen_0, screen_1, screen_2, screen_3;
g_process=function(){};


var tower_upgrades={"range":[[100,0,0],[110,5,3],[120,7,3],[130,9,3],[140,11,3],[150,13,3],[160,15,3],[170,17,3],[180,19,3],[190,21,3],[200,23,3],[210,25,3],[220,27,3],[230,29,3],[240,31,3],[250,33,3]],"rate":[[1,0,0],[1.1,5,3],[1.2,7,3],[1.3,9,3],[1.4,11,3],[1.5,13,3],[1.6,15,3],[1.7,17,3],[1.8,19,3],[1.9,21,3],[2,23,3],[2.1,25,3],[2.2,27,3],[2.3,29,3],[2.4,31,3],[2.5,33,3]],"damage":[[25,0,0],[30,5,3],[35,7,3],[40,9,3],[45,11,3],[50,13,3],[55,15,3],[60,17,3],[65,19,3],[70,21,3],[75,23,3],[80,25,3],[85,27,3],[90,29,3],[95,31,3],[100,33,3]],"count":[[1,0,0],[2,20,3],[3,22,3]],"tlp_chance":[[0,0,0],[0.03,5,3],[0.06,7,3],[0.09,9,3],[0.12,11,3],[0.15,13,3],[0.18,15,3],[0.21,17,3],[0.24,19,3],[0.27,21,3],[0.3,23,3],[0.33,25,3],[0.36,27,3],[0.39,29,3],[0.42,31,3],[0.45,33,3]],"tlp_damage":[[0,0,0],[5,5,3],[10,7,3],[15,9,3],[20,11,3],[25,13,3],[30,15,3],[35,17,3],[40,19,3],[45,21,3],[50,23,3],[55,25,3],[60,27,3],[65,29,3],[70,31,3],[75,33,3]],"tlp_dist":[[50,0,0],[60,5,3],[70,7,3],[80,9,3],[90,11,3],[100,13,3],[110,15,3],[120,17,3],[130,19,3],[140,21,3],[150,23,3],[160,25,3],[170,27,3],[180,29,3],[190,31,3],[200,33,3]],"frz_chance":[[0,0,0],[0.03,5,3],[0.06,7,3],[0.09,9,3],[0.12,11,3],[0.15,13,3],[0.18,15,3],[0.21,17,3],[0.24,19,3],[0.27,21,3],[0.3,23,3],[0.33,25,3],[0.36,27,3],[0.39,29,3],[0.42,31,3],[0.45,33,3]],"frz_slow_down":[[0.2,0,0],[0.25,5,3],[0.3,7,3],[0.35,9,3],[0.4,11,3],[0.45,13,3],[0.5,15,3],[0.55,17,3],[0.6,19,3],[0.65,21,3],[0.7,23,3],[0.75,25,3],[0.8,27,3],[0.85,29,3],[0.9,31,3],[0.95,33,3]],"frz_time":[[2,0,0],[2.2,5,3],[2.4,7,3],[2.6,9,3],[2.8,11,3],[3,13,3],[3.2,15,3],[3.4,17,3],[3.6,19,3],[3.8,21,3],[4,23,3],[4.2,25,3],[4.4,27,3],[4.6,29,3],[4.8,31,3],[5,33,3]],"frz_damage":[[0.2,0,0],[0.25,5,3],[0.3,7,3],[0.35,9,3],[0.4,11,3],[0.45,13,3],[0.5,15,3],[0.55,17,3],[0.6,19,3],[0.65,21,3],[0.7,23,3],[0.75,25,3],[0.8,27,3],[0.85,29,3],[0.9,31,3],[0.95,33,3]]};

var init_tower_parameters={"price":[10,"price"],"range":[100,"range"],"rate":[1,"rate of fire"],"damage":[25,"damage"],"count":[1,"double/triple fire"],"tlp_chance":[0,"chance of teleport"],"tlp_damage":[0,"damage when teleport"],"tlp_dist":[50,"teleport distance"],"frz_chance":[0,"chance of freeze"],"frz_slow_down":[0.2,"slow down when freeze"],"frz_time":[2,"freeze duration"],"frz_damage":[0.2,"freeze damage"]};

var ind_to_param={0:"range",1:"rate",2:"damage",3:"count",4:"tlp_chance",5:"tlp_damage",6:"tlp_dist",7:"frz_chance",8:"frz_slow_down",9:"frz_time",10:"frz_damage"};

var emoji_params=[[1,0.7,1,1,1,1,3600,1],[1,0.72,0.8,0.8,0.8,0.8,3600,1],[1,0.74,0.64,0.64,0.64,0.64,3600,1],[2,0.76,0.51,0.51,0.51,0.51,4,2],[2,0.78,1,0.41,1,0.41,3600,1],[2,0.8,0.33,0.8,0.33,0.8,3600,1],[2,0.82,0.26,0.26,0.64,0.26,3600,1],[3,0.84,0.21,0.51,0.21,0.21,4,2],[3,0.86,0.17,0.17,0.17,0.17,3600,1],[3,0.88,0.33,0.13,0.26,0.13,4,2],[3,0.9,0.11,0.11,0.11,0.11,3600,1],[3,0.92,0.09,0.21,0.09,0.09,3600,1],[3,0.94,0.41,0.07,0.07,0.07,4,2],[4,0.96,0.11,0.05,0.11,0.13,3600,1],[4,0.98,0.04,0.17,0.11,0.09,3600,1]];



//подцвета эмодзи
const red=1;
const blue=2;

//тип башни
const slot=0;
const tower=1;

//сосотяния эмодзи
e_go=0;
e_frozen=1;
e_t_start=2;
e_t_end=3;
e_hidden=4;
e_inactive=5;

class bullet_class
{
	constructor(id)
	{
		this.id=id;
		this.spd=12;
		this.tar_emoji=0;
		this.type="b_gun";
		this.parent_tower_id=0;
	}
	
	activate(type, x, y, tar_emoji, parent_tower_id)
	{		
		objects.bullets_array[this.id].x=x;
		objects.bullets_array[this.id].y=y;
		objects.bullets_array[this.id].texture=game_res.resources[type].texture;
		objects.bullets_array[this.id].visible=true;
		
		var damage=towers[parent_tower_id].damage;
		objects.bullets_array[this.id].width=12+damage*0.24;
		objects.bullets_array[this.id].height=12+damage*0.24;
		
		this.parent_tower_id=parent_tower_id;
		this.tar_emoji=tar_emoji;
		this.type=type;		
	}
	
	process()
	{		
		if (objects.bullets_array[this.id].visible==false)
			return;
		
        var tarx = objects.emoji_array[this.tar_emoji].x;
        var tary = objects.emoji_array[this.tar_emoji].y;
        var dx = tarx - objects.bullets_array[this.id].x;
        var dy = tary - objects.bullets_array[this.id].y;
        var d = Math.sqrt(dx * dx + dy * dy);
        dx = 0.5*this.spd * dx / d;
        dy = 0.5*this.spd * dy / d;
        objects.bullets_array[this.id].x += dx;
        objects.bullets_array[this.id].y += dy;
		
        if (d < (this.spd +0.1))
		{
			
			switch(this.type)
			{
				
				
				case "b_gun":
					var tar_em_state=emojies[this.tar_emoji].state==e_go || emojies[this.tar_emoji].state==e_frozen;
					if (tar_em_state==true)
					{
						var damage=towers[this.parent_tower_id].damage;
						emojies[this.tar_emoji].damage_bullet(damage);	
					}						
					break;					
					
					
				case "b_tlp":
					var tar_em_state=emojies[this.tar_emoji].state==e_go;
					if (tar_em_state==true)
					{
						//урон от базовой пули
						var damage=towers[this.parent_tower_id].damage;
						emojies[this.tar_emoji].damage_bullet(damage);
						
						//дополнительный урон
						var t_dist=towers[this.parent_tower_id].tlp_dist;
						var t_damage=towers[this.parent_tower_id].tlp_damage;
						emojies[this.tar_emoji].set_state(e_t_start,t_dist+Math.random()*20-10,t_damage);	
						
					}
					break;
					
					
					
					
				case "b_frz":

					var tar_em_state=emojies[this.tar_emoji].state==e_go;
					if (tar_em_state==true)
					{
						
						//урон от базовой пули
						var damage=towers[this.parent_tower_id].damage;
						emojies[this.tar_emoji].damage_bullet(damage);
						
						
						//дополнительный урон
						var frz_time=towers[this.parent_tower_id].frz_time;
						var frz_damage=towers[this.parent_tower_id].frz_damage;
						var frz_slow_down=towers[this.parent_tower_id].frz_slow_down;
						
						emojies[this.tar_emoji].set_state(e_frozen,frz_time, frz_damage, frz_slow_down);					
					}
					break;
			}
			
			
			objects.bullets_array[this.id].visible=false;	
		}
	}
	
}

class explosion_class
{	
	constructor(id)
	{		
		this.expl=objects.expl_array[id];		
	}
	
	place(x,y)
	{
		this.expl.x=x;
		this.expl.y=y;
		var rnd_text=Math.floor(Math.random() * 3);
		this.expl.textures=expl_textures[rnd_text];
		this.expl.rotation=Math.random() * PI * 2;
		this.expl.visible=true;
		this.expl.animationSpeed = 0.5;
		this.expl.gotoAndPlay(0);	
	}
	
	process()
	{
		if (this.expl.visible==false)
			return;
		
		if (this.expl.currentFrame == (this.expl.totalFrames - 1))
					this.expl.visible=false;		
	}
	
}

class emoji_class 
{
	constructor(id)
	{		
	
		this.emoji=objects.emoji_array[id];
		this.h_back=objects.h_back_array[id];
		this.h_front=objects.h_front_array[id];
		
		this.spd=0.1;
		this.frz_spd=0;
		this.dx=0;
		this.dy=0;
		this.tar_x=0;
		this.tar_y=0;		
		this.visible=false;
						
		//это для башень замораживания
		this.frz_time=0;
		this.frz_damage=0;
		this.prv_time=0;
		this.slow_down=1;
		
		
		//это для телепорта
		this.t_dist=0;
		this.t_damage=0;
			
		
		this.state=e_inactive;
		this.process=function(){this.process_empty();};	
		
	}	
	
	init(emoji_face)
	{
		this.emoji_face=emoji_face;
		
		
		this.bonus=emoji_params[emoji_face][0];		
		this.spd=emoji_params[emoji_face][1];
		
		this.susceptibility_bullet=emoji_params[emoji_face][2];
		this.susceptibility_laser=emoji_params[emoji_face][3];
		this.susceptibility_teleport=emoji_params[emoji_face][4];
		this.susceptibility_freeze=emoji_params[emoji_face][5];
		
		this.hidden_start=emoji_params[emoji_face][6];
		this.hidden_long=emoji_params[emoji_face][7];

		this.prv_time=0;
		this.next_node=1;
		this.life=100;
			
				
		this.tx_id=0;
		this.textures=[];
		this.textures[0]=game_res.resources["em"+this.emoji_face].texture;
		this.textures[1]=game_res.resources["em"+this.emoji_face+"r"].texture;
		this.textures[2]=game_res.resources["em"+this.emoji_face+"b"].texture;	
		this.emoji.texture=this.textures[this.tx_id];	
				
				
				
		//красный цвет после попадания
		this.red_trace=false;
		this.red_trace_start=0;			
		
		this.path_id=Math.floor(Math.random() * screen_3.paths.length);
		this.emoji.x=screen_3.paths[this.path_id][0][0]+Math.random()*10-5;
		this.emoji.y=screen_3.paths[this.path_id][0][1]+Math.random()*10-5;		
		
		this.h_back.x=this.emoji.x-this.h_back.width/2;
		this.h_back.y=this.emoji.y-30;
		
		this.h_front.scale.x=1;				
		this.h_front.x=this.h_back.x+(this.h_back.width-this.h_front.width)/2;
		this.h_front.y=this.h_back.y+(this.h_back.height-this.h_front.height)/2;

		
		this.tar_x=screen_3.paths[this.path_id][1][0]+Math.random()*10-5;;
		this.tar_y=screen_3.paths[this.path_id][1][1]+Math.random()*10-5;;
		
		var dx=this.tar_x-this.emoji.x;
		var dy=this.tar_y-this.emoji.y;
		
		var d=Math.sqrt(dx*dx+dy*dy);
		this.dx=dx/d;
		this.dy=dy/d;
		
		this.emoji.visible=true;
		this.h_back.visible=true;
		this.h_front.visible=true;
		this.emoji.alpha=1;
				
		//это копия из функции set_state и только отсюда можно вовскресить эмодзи
		this.state = e_go;
		this.prv_time = game_tick;
		this.emoji.alpha=1;
		this.tx_id=0;
		this.emoji.texture=this.textures[this.tx_id];
		this.process=function(){this.process_go();};	
	}
	
	set_next_node(node)
	{

		this.next_node=node;
		if (this.next_node==screen_3.paths[this.path_id].length)
		{			
			this.set_state(e_inactive);
			screen_3.damage_gate(1);
			screen_3.completed_emoji += 1;
			return;		
		}
	
		this.tar_x=screen_3.paths[this.path_id][this.next_node][0]+Math.random()*30-15;;
		this.tar_y=screen_3.paths[this.path_id][this.next_node][1]+Math.random()*30-15;;
		
		var dx=this.tar_x-this.emoji.x;
		var dy=this.tar_y-this.emoji.y;
		
		var d=Math.sqrt(dx*dx+dy*dy);
		
		this.dx=dx/d;
		this.dy=dy/d;
		
	}
	
	add_life_level_notion()
	{		
		app.stage.addChild(this.life_lev_back,this.life_lev_front);
	}
		
	make_me_red()
	{
		//инициируем красный цвет
		if (this.tx_id!=red)
		{
			this.tx_id=red;
			this.emoji.texture=this.textures[this.tx_id];
			
		}
		this.red_trace=true;
		this.red_trace_start=game_tick;
	}
		
	damage(amount)
	{
		this.life-=amount;		
		this.update_life_level();
		if (this.life<=0 && this.state!==e_inactive)
		{
			screen_3.completed_emoji += 1;
			screen_3.change_balance(this.bonus);
			screen_3.place_explosion(this.emoji.x,this.emoji.y);
			this.set_state(e_inactive);			
		}
	}
		
	damage_bullet(amount)
	{		
		this.damage(amount*this.susceptibility_bullet);
		
		//не делаем красным если попадает по замороженному эмодзи
		if (this.state!==e_frozen)
			this.make_me_red();
	}
	
	damage_laser(amount)
	{		
		this.damage(amount*this.susceptibility_laser);
		this.make_me_red();
	}
	
	damage_teleport(amount)
	{		
		this.damage(amount*this.susceptibility_teleport);
		this.make_me_red();
	}	
			
	damage_freeze(amount)
	{		
		this.damage(amount*this.susceptibility_freeze);		
	}
	
	update_life_level()
	{		
		this.h_front.scale.x=this.life/100;		
	}
	
	set_state(state,arg1, arg2, arg3)
	{
		if (this.state==state)
			return;


		//изменить состояние из инактива нельзя
		if (this.state==e_inactive)
			return;

        this.state = state;
        this.prv_time = game_tick;
				
		
        switch (this.state)
		{
            case e_go:
				this.emoji.alpha=1;
				this.tx_id=0;
				this.emoji.texture=this.textures[this.tx_id];
				this.process=function(){this.process_go();};
                break;
			case e_frozen:
				this.tx_id=blue;
				this.emoji.texture=this.textures[this.tx_id];
				this.frz_time=arg1;
				this.frz_damage=arg2;
				this.frz_spd=this.spd-this.spd*arg3;
				this.process=function(){this.process_frozen();};
				break;
            case e_hidden:		
				this.emoji.alpha=0.3;
				this.process=function(){this.process_hidden();};	
                break;
			case e_t_start:
			
				//вероятно
				var rnd=Math.random();
				if (rnd>this.susceptibility_teleport)
				{
					this.state=e_go;					
					return;
				}
			
				this.t_dist=arg1;
				this.t_damage=arg2;				
				this.process=function(){this.process_t_start();};				
				break;
			case e_t_end:
				var d_traveled = this.dist_traveled();
				var tar_dist = Math.max(0, d_traveled - this.t_dist);
				this.move_to_dist(tar_dist);				
				this.process=function(){this.process_t_end();};		
				break;
			case e_inactive:
				this.emoji.visible=false;
				this.h_back.visible=false;
				this.h_front.visible=false;
				this.process=function(){this.process_empty();};	
				break;
				
			break;
			
			
        }
	}
	
	process_go()
	{
		
		//показываем красным цветом при попадании
		if (this.red_trace==true)
		{
			if (game_tick>this.red_trace_start+0.5)
			{
				this.red_trace=false;
				this.tx_id=0;
				this.emoji.texture=this.textures[this.tx_id];
			}			
		}
		
		//включаем скрытый режим
		if (game_tick>this.prv_time+this.hidden_start)
			this.set_state(e_hidden);
		
		var dx=this.dx*this.spd;
		var dy=this.dy*this.spd;
		
		this.emoji.x+=dx;
		this.emoji.y+=dy;
		
		this.h_back.x+=dx;
		this.h_back.y+=dy;
		
		this.h_front.x+=dx;
		this.h_front.y+=dy;
			
		dx=this.tar_x-this.emoji.x;
		dy=this.tar_y-this.emoji.y;
		
		var d=Math.sqrt(dx*dx+dy*dy);
		if (d<(this.spd+0.15))
		{			
			var next_node=this.next_node+1;
			this.set_next_node(next_node);			
		}
	}

	process_frozen()
	{	
	
		this.damage_freeze(this.frz_damage);	
		
		var dx=this.dx*this.frz_spd;
		var dy=this.dy*this.frz_spd;
		
		this.emoji.x+=dx;
		this.emoji.y+=dy;
		
		this.h_back.x+=dx;
		this.h_back.y+=dy;
		
		this.h_front.x+=dx;
		this.h_front.y+=dy;
		
		
		var dx=this.tar_x-this.emoji.x;
		var dy=this.tar_y-this.emoji.y;
		
		var d=Math.sqrt(dx*dx+dy*dy);
		
		if (d<(this.frz_spd+0.15))
		{
			var next_node=this.next_node+1;
			this.set_next_node(next_node);			
		}

				
		if (game_tick>this.prv_time+this.frz_time)
			this.set_state(e_go);
	}
	
	process_hidden()
	{
		
		
		//вЫключаем скрытый режим
		if (game_tick>this.prv_time+this.hidden_long)
			this.set_state(e_go);
		
		
		
		var dx=this.dx*this.spd;
		var dy=this.dy*this.spd;
		
		this.emoji.x+=dx;
		this.emoji.y+=dy;
		
		this.h_back.x+=dx;
		this.h_back.y+=dy;
		
		this.h_front.x+=dx;
		this.h_front.y+=dy;
			
		dx=this.tar_x-this.emoji.x;
		dy=this.tar_y-this.emoji.y;
		
		var d=Math.sqrt(dx*dx+dy*dy);
		if (d<(this.spd+0.15))
		{
			var next_node=this.next_node+1;
			this.set_next_node(next_node);			
		}

	}
	
	process_t_start()
	{
			
		this.emoji.alpha-=0.02;
		if (this.emoji.alpha<=0)
		{
			this.emoji.alpha=0;
			this.set_state(e_t_end);			
		}

	}
	
	process_t_end()
	{		
		this.emoji.alpha+=0.02;
		if (this.emoji.alpha>=1)
		{
			this.emoji.alpha=1;
			this.damage_teleport(this.t_damage);
			this.set_state(e_go);			
		}

	}
	
	dist_traveled()
	{
        var dist_on_path = 0;
        for (var p = 0; p < screen_3.paths[this.path_id].length - 1; p++)
		{
            if (p == (this.next_node - 1))
			{
                var dx = this.emoji.x - screen_3.paths[this.path_id][p][0];
                var dy = this.emoji.y - screen_3.paths[this.path_id][p][1];
                var d = Math.sqrt(dx * dx + dy * dy);
                dist_on_path += d;
                return dist_on_path;
            }
            else
			{
                var dx = screen_3.paths[this.path_id][p + 1][0] - screen_3.paths[this.path_id][p][0];
                var dy = screen_3.paths[this.path_id][p + 1][1] - screen_3.paths[this.path_id][p][1];
                var d = Math.sqrt(dx * dx + dy * dy);
                dist_on_path += d;
            }
        }
    }
    
	move_to_dist(dist)
	{
        var dist_on_path = 0;
        for (var p = 0; p < screen_3.paths[this.path_id].length - 1; p++)
		{
            var dx = screen_3.paths[this.path_id][p + 1][0] - screen_3.paths[this.path_id][p][0];
            var dy = screen_3.paths[this.path_id][p + 1][1] - screen_3.paths[this.path_id][p][1];
            var d = Math.sqrt(dx * dx + dy * dy);
            dist_on_path += d;
            if (dist_on_path > dist)
			{
                var residual_dist = dist - dist_on_path + d;
                this.emoji.x = screen_3.paths[this.path_id][p][0] + dx * residual_dist / d;
                this.emoji.y = screen_3.paths[this.path_id][p][1] + dy * residual_dist / d;
				this.h_back.x=this.emoji.x-18;
				this.h_back.y=this.emoji.y-28;		
				this.h_front.x=this.emoji.x-16;
				this.h_front.y=this.emoji.y-26;


                //if new target reached
                var dx = screen_3.paths[this.path_id][p + 1][0] - this.emoji.x;
                var dy = screen_3.paths[this.path_id][p + 1][1] - this.emoji.y;
                var d = Math.sqrt(dx * dx + dy * dy);
                if (d < (this.cur_spd / 2 + 0.01))
                    this.set_next_node(p + 2);
                else
                    this.set_next_node(p + 1);

                return;
            }
        }
    }	
	
	process_empty()
	{
		
		
		
	}

}

class tower_control_class
{	

	static selected_tower = -1;

	constructor(id)
	{
		
		this.id=id;		
		this.range=100;
		
		this.count=1;	
		
		this.tlp_chance=0;
		this.tlp_damage=0;
		this.tlp_dist=0;	
		
		this.frz_chance=0;
		this.frz_slow_down_perc=0;
		this.frz_time=0;
		this.frz_damage=0;

		
		this.type=slot;
		this.upg_level=0;
		this.tower_price=0;
		

		//копируем апргрейды из листа с криталами
		this.upgrade_levels={};
		
		
		//это для расчетов эмодзи в пределах башни
		this.emoji_in_range=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
		this.emoji_in_range_shuffled=[];
		this.emoji_in_range_count=0;
		
		//функция процессинга
		this.process=function(){};
		
		//ежесекундные проверки
		this.sec_check=0;
	}
	
	count_emoji_in_range(arr)
	{
		
		//определяем сколько эмодзи в пределах башни
		this.emoji_in_range_count=0;
		for (var e=0;e<emojies.length;e++)
		{
			if (arr.includes(emojies[e].state))
			{					
				var dx=emojies[e].emoji.x-this.x;
				var dy=emojies[e].emoji.y-this.y;
				
				var d=Math.sqrt(dx*dx+dy*dy);
				if (d<this.range)
				{						
					this.emoji_in_range[this.emoji_in_range_count]=e;
					this.emoji_in_range_count++;
				}				
			}
		}		
		
		//перемешиваем массив
		var arr=this.emoji_in_range.slice(0, this.emoji_in_range_count);
		this.emoji_in_range_shuffled = arr.sort(() => 0.5 - Math.random());
	}
	
	place(x,y)
	{		
	
		this.x=x;
		this.y=y;
		this.type=slot;	
		
		objects.towers_array[this.id].x=x;
		objects.towers_array[this.id].y=y;
		objects.towers_array[this.id].texture=game_res.resources["slot"].texture;
		objects.towers_array[this.id].visible=true;
		objects.towers_array[this.id].pointerdown=this.show_upgrades.bind(this,true);
		
		//в начале игры никакая башня не выбрана
		tower_control_class.selected_tower=-1;
		
		//это стрелка вверх обозначающая наличие апгрейда
		objects.up_icons[this.id].x=x;
		objects.up_icons[this.id].y=y;	
		objects.up_icons[this.id].visible=false;	
				
		this.prv_time=game_tick;		
		this.process=this.process_slot.bind(this);
	}
	
	show_upgrades(as_pressed=false)
	{		
	
		//скрываем все что открыто
		towers.forEach(e=>e.hide_attributes())
		
		//если это нажатие на открытую уже башню то просто закрываем
		if (tower_control_class.selected_tower==this.id && as_pressed==true)
		{
			
			tower_control_class.selected_tower=-1;
			return;			
		}
		
		if (this.type==slot)
		{			
			towers.forEach(e=>e.hide_attributes())
			//сразу покупаем единственную которая есть в игре башню
			this.buy_tower_down(0);
			return;
		}
		else
		{
			
			//устанавливаем на место башни круг радиуса дейтсвия
			objects.range_circle.visible=true;
			objects.range_circle.x=this.x;
			objects.range_circle.y=this.y;
			objects.range_circle.width=this.range*2;
			objects.range_circle.height=this.range*2;			
			
			
			//определяем сдвиг данныех
			var shift_x=20;
			
			if (this.x>M_WIDTH/2)
				shift_x=-360;				
			
					
			var s_xy=[[0,0],[0,60],[0,120],[0,180],[0,240],[0,300],[160,0],[160,60],[160,120],[160,180],[160,240],[160,300]];
			var ind=0;
			for (var param in tower_upgrades)
			{
				
				//отображаем кнопки апгрейда
				objects.upg_bcg_array[ind].visible=true;
				objects.upg_bcg_array[ind].x=this.x+s_xy[ind][0]+shift_x;
				objects.upg_bcg_array[ind].y=s_xy[ind][1]+50;
				
				//отображаем кнопки апгрейда
				objects.upg_bar_array[ind].visible=true;
				objects.upg_bar_array[ind].x=this.x+s_xy[ind][0]+shift_x+10;
				objects.upg_bar_array[ind].y=s_xy[ind][1]+50+10;
				
				//отображаем кнопки апгрейда
				objects.upg_frame_array[ind].visible=true;
				objects.upg_frame_array[ind].x=this.x+s_xy[ind][0]+shift_x;
				objects.upg_frame_array[ind].y=s_xy[ind][1]+50;

				//отображаем текст апгрейда
				objects.towers_upg_text_array[ind].visible=true;
				objects.towers_upg_text_array[ind].x=this.x+s_xy[ind][0]+shift_x+15;
				objects.towers_upg_text_array[ind].y=s_xy[ind][1]+10+50;	
									
														
				//текущий уровень и значение параметры
				var cur_lev=this.upgrade_levels[param];
				var cur_val=this[param];
				
				//отображаем уровень достижения апгрейда
				var max_upg=tower_upgrades[param].length;
				objects.upg_bar_array[ind].scale.x=cur_lev/(max_upg-1);			
				
				
				//проверяем наличие апгрейдов
				if (cur_lev==max_upg-1)
				{					
					objects.towers_upg_text_array[ind].text="No more upgrades";
					objects.towers_upg_text_array[ind].alpha=0.3;	
					objects.upg_bcg_array[ind].pointerdown=null;	
				}
				else
				{					
					
					var new_val=tower_upgrades[param][cur_lev+1][0];			
					var new_val_price=tower_upgrades[param][cur_lev+1][1];	
					var long_param_name=init_tower_parameters[param][1];

					objects.towers_upg_text_array[ind].text=long_param_name + "\n"+cur_val+" > "+new_val+"\n                         BUY ( "+new_val_price+"$ )";
					
					
					//проверяем что нельзя покупать апгрейды которые не возможно использовать
					var not_yet=0;
					if (this.upgrade_levels["tlp_chance"]==0)
					{
						if (param=="tlp_damage" || param=="tlp_dist")
						{
							
							objects.towers_upg_text_array[ind].text="upgrade teleport\nchance first";
							not_yet=1;
						}						
					}
						
					if (this.upgrade_levels["frz_chance"]==0)
					{
						if (param=="frz_slow_down" || param=="frz_time" || param=="frz_damage")
						{
							
							objects.towers_upg_text_array[ind].text="upgrade freeze\nchance first";
							not_yet=1;
						}		
					}
					
					
					//проверяем если деньги есть на апгрейды
					if (new_val_price>screen_3.money || not_yet==1)
					{
						objects.towers_upg_text_array[ind].alpha=0.3;	
						objects.upg_bcg_array[ind].pointerdown=null;									
					}
					else
					{
						objects.towers_upg_text_array[ind].alpha=1;						
						objects.upg_bcg_array[ind].pointerdown=this.upgrade_down.bind(this,ind);	
					}						
					
				}

				ind++;
				
			}				
			
			//отображаем кнопку продажи башни	
			objects.sell_button.visible=true;
			objects.sell_button.x=this.x+160+shift_x;
			objects.sell_button.y=300+50;	
			
			//устанавливаем колбэк на конпку продажи
			objects.sell_button.pointerdown=this.sell_down.bind(this);	
			
			//запоминаем выбранную башеню
			tower_control_class.selected_tower=this.id;
			

		}
	}
	
	sell_down()
	{	
	
		//скрываем все чтобы открыто около башни
		this.hide_attributes();
		tower_control_class.selected_tower=-1;
	
		this.type=slot;	
		objects.towers_array[this.id].texture=game_res.resources["slot"].texture;
		objects.towers_array[this.id].visible=true;
		this.process=this.process_slot.bind(this);
		
		//возвращаем баланс и стоимости
		screen_3.change_balance(this.tower_price);
		this.tower_price=0;
		
		//скрываем стрелку вверх
		objects.up_icons[this.id].visible=false;
		
	}
	
	buy_tower_down(i)
	{
		
		
		var c_price=init_tower_parameters.price[0];
		if (screen_3.money<c_price)
		{			
			screen_3.send_message("You need "+c_price+"$ to build this tower",red);
			return;
		}
		
		
		//копируем уровни апгрейда из зафиксированных апгрейдов
		this.upgrade_levels = Object.assign({}, screen_2.upgrade_levels);
			
		//теперь это уже не слот а работающая башня
		this.type=tower;
		
		//меняем баланс и стоимости
		screen_3.change_balance(-c_price);
		this.tower_price=c_price;
		
		objects.towers_array[this.id].visible=true;				
		objects.towers_array[this.id].texture=game_res.resources["b_twr"].texture;
	
		
		//загружаем начальные значения параметров башни
		for (var key in tower_upgrades)
		{
			var cur_lev=this.upgrade_levels[key];
			this[key]=tower_upgrades[key][cur_lev][0];			
		}

		this.inv_rate=1/this.rate;
		
		//устанавливаем размер орба
		objects.range_circle.width=this.range*2;
		objects.range_circle.height=this.range*2;
				

		objects.towers_array[this.id].alpha=1;
		this.process=this.process_b_twr.bind(this);
		
		//устанавливаем начальное время
		this.prv_time=game_tick;
		
		//ежесекундные проверки
		this.sec_check=game_tick;		
		
		//отправляем сообщение что была построена новая башня
		screen_3.send_message("new tower built",blue);
		
		//скрываем все чтобы открыто около башни
		//this.hide_attributes();
		tower_control_class.selected_tower=-1;
	
		
	}
	
	hide_attributes()
	{
		objects.sell_button.visible=false;		
		objects.range_circle.visible=false;
		
		
		for (var u=0;u<11;u++)
		{
			objects.upg_bcg_array[u].visible=false;
			objects.upg_frame_array[u].visible=false;
			objects.upg_bar_array[u].visible=false;
			objects.towers_upg_text_array[u].visible=false;				
		}
	
	}
	
	upgrade_down(upg_ind)
	{		
		
		
		var param=ind_to_param[upg_ind];
		var cur_lev=this.upgrade_levels[param];
		var cur_val=this[param];
		var new_val=tower_upgrades[param][cur_lev+1][0];			
		var new_val_price=tower_upgrades[param][cur_lev+1][1];	

				
	
		//обновляем балансы и стоимости
		screen_3.change_balance(-new_val_price);
		this.tower_price+=new_val_price;
		
		this[param]=new_val;
		var long_param_name=init_tower_parameters[param][1];
		screen_3.send_message(long_param_name+" upgraded: "+cur_val+" >>> "+new_val,blue);
		
		//увеличиваем уровень апгрейда
		this.upgrade_levels[param]++;
		
		//обновляем на всякий случай темп
		this.inv_rate=1/this.rate;
		
		//изменяем на всякий случай размер орба
		objects.range_circle.width=this.range*2;
		objects.range_circle.height=this.range*2;
		
		//скрываем открытое
		this.show_upgrades(false);		

	}
	
	process_slot()
	{
		
		objects.towers_array[this.id].alpha=Math.sin(game_tick * 3) * 0.5 + 0.5;
		
	}
	
	check_new_upgrades()
	{
		
		//проверяем апргейды только для башень а не для слотов
		if (this.type==slot)
			return;
		
		
		//проверяем наличие апгрейда
		objects.up_icons[this.id].visible=false;
		for (var param in tower_upgrades)
		{		
			var cur_lev=this.upgrade_levels[param];
			
			
			//проверяем не достигнут ли максимум апгрейда
			if (cur_lev<tower_upgrades[param].length-1)
			{
				var next_lev=cur_lev+1;
				var next_upg_price=tower_upgrades[param][next_lev][1];			
				
				if (screen_3.money>=next_upg_price)
				{					
					objects.up_icons[this.id].visible=true;
					break;					
				}					
			}
		}	
		
		//обновляем меню апгрейдов если оно открыто
		if (tower_control_class.selected_tower==this.id)
			this.show_upgrades(false);
		
	}

	process_b_twr()
	{
		

		
		
		
		//подсвечиваем башню если есть апгрейд
		if (objects.up_icons[this.id].visible==true)
			objects.up_icons[this.id].alpha=Math.sin(game_tick * 7) * 0.5 + 0.5;			
		
		
		if (game_tick>this.prv_time+this.inv_rate)
		{
			//вычисляем количество эмодзи в пределах башни
			this.count_emoji_in_range([e_go,e_frozen]);
			
			//стреляем в емодзи
			var num_of_targets=Math.min(this.count, this.emoji_in_range_count);
			if (num_of_targets>0)
			{				
				for (var i=0;i<num_of_targets;i++)
				{
					var r_num=Math.random();
					if (r_num<this.tlp_chance)
					{						
						screen_3.send_bullet('b_tlp',this.x, this.y, this.emoji_in_range_shuffled[i], this.id);							
					}
					else if (r_num<this.tlp_chance+this.frz_chance)
					{
						screen_3.send_bullet('b_frz',this.x, this.y, this.emoji_in_range_shuffled[i], this.id);
					}
					else
					{
						screen_3.send_bullet('b_gun',this.x, this.y, this.emoji_in_range_shuffled[i], this.id);
					}
				}

				this.prv_time=game_tick;			
			}
		}
	}
	

}

class screen_0_class
{
	constructor(id)
	{
		this.id=id;
	}
	
	draw_and_init()
	{
		
		//скрываем все объекты
		for (var i = 0; i < app.stage.children.length; i++)
			app.stage.children[i].visible=false;	
		
		//загружаем в соответствии с апгредй листом
		for (var i=0;i<load_list[this.id].length;i++)
		{	
			var obj_class=load_list[this.id][i][0];	
			var obj_name=load_list[this.id][i][1];
			
			if (obj_class=="block" || obj_class=="sprite" || obj_class=="text" ) 
				objects[obj_name].visible=true;			
		}
		
	}
	
	process()
	{
		
	}	
}

class screen_1_class
{
	constructor(id)
	{
		this.id=id;
		this.selected_map=0;
		this.results=[0,0,0,0,0,0,0,0,0];
	}
	
	draw_and_init()
	{
		
		//скрываем все объекты
		for (var i = 0; i < app.stage.children.length; i++)
			app.stage.children[i].visible=false;	
		
		//загружаем в соответствии с апгредй листом
		for (var i=0;i<load_list[this.id].length;i++)
		{			
			var obj_class=load_list[this.id][i][0];	
			var obj_name=load_list[this.id][i][1];
			
			if (obj_class=="block" || obj_class=="sprite" || obj_class=="text" ) 
			{
				objects[obj_name].visible=true;		
				eval(load_list[this.id][i][5]);
			}
		
		}
		
		
		//выделяем текущую карту
		objects.selected_window.visible=true;
		objects.selected_window.x=objects["map_"+this.selected_map].x;
		objects.selected_window.y=objects["map_"+this.selected_map].y;
		
		
		//Отображаем статус карту
		for (var m=0;m<9;m++)
		{
			if (this.results[m]==0)
				objects["stars_stat_"+m].visible=false;	
			else
				objects["stars_stat_"+m].texture=game_res.resources["stars_"+this.results[m]].texture;		
		}
	
	
		g_process=this.process.bind(this);
	}
	
	map_down(i)
	{
		this.selected_map=i;
		objects.selected_window.visible=true;
		objects.selected_window.x=objects["map_"+i].x;
		objects.selected_window.y=objects["map_"+i].y;
	}
	
	set_level_status(level)
	{
		var cur_stat=this.results[this.selected_map];
		this.results[this.selected_map]=Math.max(cur_stat,level);
		var crystals_earned=this.results[this.selected_map]-cur_stat;
		screen_2.crystals += crystals_earned;
	}
	
	process()
	{
		//обрабатываем сообщение
		if (objects.message_line.visible==true)
		{
			objects.message_line.alpha-=0.002;
			objects.message.alpha=objects.message_line.alpha;
			
			if (objects.message_line.alpha<=0)
			{
				objects.message_line.visible=false;
				objects.message.visible=false;
			}			
		}
	}	

	button_2_down()
	{
		if (this.selected_map==0)
		{
			screen_3.load(this.selected_map);			
		}
		else
		{
			//if (this.results[this.selected_map-1]>0)
				screen_3.load(this.selected_map);	
			//else
			//	screen_3.send_message("Complete previous maps",red);
		}
	}

}

class screen_2_class
{
	constructor(id)
	{
		this.id=id;
		
				
		this.crystals=0;
		this.crystals_spent=0;
		this.crystals_mined=0;
		
		this.upgrade_levels={"range":0,"rate":0,"damage":0,"count":0,"tlp_chance":0,"tlp_damage":0,"tlp_dist":0,"frz_chance":0,"frz_slow_down":0,"frz_time":0,"frz_damage":0};
		
		
	}
	
	draw_and_init()
	{
		
		//скрываем все объекты
		for (var i = 0; i < app.stage.children.length; i++)
			app.stage.children[i].visible=false;	
		
		//загружаем в соответствии с загрузочным листом
		for (var i=0;i<load_list[this.id].length;i++)
		{			
			var obj_class=load_list[this.id][i][0];	
			var obj_name=load_list[this.id][i][1];
			
			if (obj_class=="block" || obj_class=="sprite" || obj_class=="text" ) 
			{
				objects[obj_name].visible=true;		
				eval(load_list[this.id][i][5]);
			}		
			
			if (obj_class=="sprite_array" ) 
			{
				
				var a_size=load_list[this.id][i][2];
				for (var n=0;n<a_size;n++)
					eval(load_list[this.id][i][5]);		
				
			}
		
		}
		
				
		//отображаем апгрейды
		this.redraw_upg_text();
				

		g_process=this.process.bind(this);
	}
	
	process()
	{
		//обрабатываем сообщение
		if (objects.message_line.visible==true)
		{
			objects.message_line.alpha-=0.002;
			objects.message.alpha=objects.message_line.alpha;
			
			if (objects.message_line.alpha<=0)
			{
				objects.message_line.visible=false;
				objects.message.visible=false;
			}			
		}
	}	

	redraw_upg_text()
	{
		
		//отображаем количество кристалов
		objects.crystal_info.text="Crystals: "+this.crystals;
		
		
		var ind=0;
		for (var param in tower_upgrades)
		{
			var upg_lev=this.upgrade_levels[param];
			if (upg_lev==tower_upgrades[param].length-1)
			{
				objects["c_upg_"+ind].pointerdown=null;
				objects["text_info"][ind].text="no more/nupgrades";	
				objects["c_upg_"+ind].alpha=0.25;
				objects["text_info"][ind].alpha=0.25;
			}
			else
			{

				
				var cur_lev=this.upgrade_levels[param];
				var cur_val=tower_upgrades[param][cur_lev][0];				
				var new_val=tower_upgrades[param][cur_lev+1][0];					
				new_val=Number((new_val).toFixed(2));
				var upg_price=tower_upgrades[param][cur_lev+1][2];
				objects["text_info"][ind].text=init_tower_parameters[param][1] + "\n"+cur_val+" > "+new_val +"\ncost: "+upg_price;					
				
				if (this.crystals>=upg_price)
				{
					objects["c_upg_"+ind].pointerdown=this.upg_icon_down.bind(this,ind);
					objects["c_upg_"+ind].alpha=1;
					objects["text_info"][ind].alpha=1;	
					objects["c_frame"][ind].alpha=1;						
				}
				else
				{
					objects["c_upg_"+ind].pointerdown=null;
					objects["c_upg_"+ind].alpha=0.25;
					objects["text_info"][ind].alpha=0.25;		
					objects["c_frame"][ind].alpha=0.25;	
				}

			
				
			}
			
			//отображаем уровень достижения апгрейда
			var max_upg=tower_upgrades[param].length;
			objects.c_bar[ind].scale.x=upg_lev/(max_upg-1);	
			
			ind++;
		}
	}
		
	send_message(text,col=blue)
	{
		/*
		if (col==blue)
		{
			objects.message_box.texture=game_res.resources["messgage_box_b"].texture;			
		}
		else
		{
			objects.message_box.texture=game_res.resources["messgage_box_r"].texture;	
		}
			
		
		objects.message_box.visible=true;
		objects.message_box_text.visible=true;
		objects.message_box_text.text=text;
		*/
		
	}
	
	upg_icon_down(ind)
	{
		

		var param=ind_to_param[ind];
		var cur_lev=this.upgrade_levels[param];
		var cur_val=tower_upgrades[param][cur_lev][0];		
		var new_val=tower_upgrades[param][cur_lev+1][0];
		new_val=Number((new_val).toFixed(2));
		var upg_price=tower_upgrades[param][cur_lev+1][2];
		
		
		if (this.crystals>=upg_price)
		{			
			this.upgrade_levels[param]++;		
			this.crystals-=upg_price;
			this.crystals_spent+=upg_price;	
			this.send_message(init_tower_parameters[param][1]+" upgraded:\n"+cur_val+" >>> "+ new_val, blue);	
			this.redraw_upg_text();	
		}
		else
		{
			this.send_message("You need "+upg_price+" crystal(s) for upgrade",red);		
		}

	}


	buy()
	{
		
		FAPI.UI.showPayment("Яблоко", "Это очень вкусно!", 777, 1, null, null, "ok", "true");
		
	}
	reset_down()
	{
		this.upgrade_levels={"range":0,"rate":0,"damage":0,"count":0,"tlp_chance":0,"tlp_damage":0,"tlp_dist":0,"frz_chance":0,"frz_slow_down":0,"frz_time":0,"frz_damage":0};
	
		this.crystals+=this.crystals_spent;
		this.crystals_spent=0;
		this.redraw_upg_text();
		
		this.send_message("All upgrades reset",blue);	
	}
}

class screen_3_class
{
	constructor(id)
	{
		this.id=id;
		
		//создаем контроль для башень
		for(var t=0;t<objects.towers_array.length;t++)
			towers.push(new tower_control_class(t))	
		
		//создаем контроль для эмодзи
		for (var i=0;i<objects.emoji_array.length;i++)
			emojies.push(new emoji_class(i));
		
	}
	
	load(map_id)
	{
		this.map_res=0;
		this.map_id=map_id;
		this.map_res=new PIXI.loaders.Loader();
		this.map_res.add("towers", "map_" + map_id + "/towers.txt");
		this.map_res.add("bcg", "map_" + map_id + "/bcg.png");	
		this.map_res.add("paths", "map_" + map_id + "/paths.txt");	
		this.map_res.add("schedule", "map_" + map_id + "/schedule.txt");
		this.map_res.add("init_code", "map_" + map_id + "/init_code.txt");
		
		
		//загружаем остальные ресурсы карты из файла
		for (var i=0;i<other_map_res[map_id].length;i++)
			this.map_res.add(other_map_res[map_id][i][0], other_map_res[map_id][i][1]);	
			
		
		
		this.map_res.load(loaded.bind(this));	
		this.map_res.onProgress.add(progress);
		this.map_res.onError.add(error.bind(this));
		
		function loaded()
		{			

			//переписываем актуальные ресурсы если они есть
			for (var map_res_name in this.map_res.resources)
			{
				for (var game_res_name in game_res.resources)
				{
					if (map_res_name==game_res_name)
					{
						game_res.resources[game_res_name].texture.baseTexture=this.map_res.resources[map_res_name].texture.baseTexture;
					}
				}
			}
	

			//запускаем игру
			this.draw_and_init();		
		}	
		
		function progress(loader, resource)
		{
			//document.getElementById("demo").innerHTML = Math.round(loader.progress)+"%";
		}
		
		function error(loader, resource)
		{
			this.load(this.map_id);
		}
		
	}
	
	get_random_int(min, max)
	{
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
		
	draw_and_init()
	{
		
		//скрываем все объекты
		for (var i = 0; i < app.stage.children.length; i++)
			app.stage.children[i].visible=false;	
		
		//загружаем в соответствии с апгредй листом
		for (var i=0;i<load_list[this.id].length;i++)
		{	
			var obj_class=load_list[this.id][i][0];	
			var obj_name=load_list[this.id][i][1];
			
			if (obj_class=="block" || obj_class=="sprite" || obj_class=="text" ) 
			{
				objects[obj_name].visible=true;						
				eval(load_list[this.id][i][5]);
			}
		}
		
		//эти параметры индивидуальны для каждой карты
		this.paths=JSON.parse(this.map_res.resources["paths"].data);
		this.towers=JSON.parse(this.map_res.resources["towers"].data);
		this.schedule=JSON.parse(this.map_res.resources["schedule"].data);
		this.init_code=this.map_res.resources["init_code"].data;
		
		
		//устанавливаем бэкграунд
		objects.bcg_5.texture=this.map_res.resources["bcg"].texture;
		
		//отображаем башни
		for (var t=0;t<this.towers.length;t++)
			towers[t].place(this.towers[t][0],this.towers[t][1]);

		g_process=this.process.bind(this);
		
		
		//обработка волн эмодзи
		this.completed_emoji=0;
		this.schedule2=[];
		var total_time=0;
		this.total_waves=this.schedule.length;
		for (var w=0;w<this.total_waves;w++)
		{
			var wave_time=this.schedule[w][0];
			var wave_size=this.schedule[w][3];
			var t_int=this.schedule[w][4];
			total_time += wave_time;
			for(var e=0;e<wave_size;e++)
			{		
				total_time+=t_int;			
				var em_from=this.schedule[w][1];
				var em_to=this.schedule[w][2];
				var em_id=this.get_random_int(em_from,em_to);	
				var em_line=[total_time,em_id,e==0 ? w+1:-9,wave_size];		
				this.schedule2.push(em_line);				
			}	
		}				
		this.schedule_size=this.schedule2.length;
		this.next_emoji=0;
		this.wave_size=0;
		this.w_emoji=0;		
		this.no_more_waves=false;
		
		
		//основной уровень игры
		this.gate_level=3;
		this.damage_gate(0);
		
		//отключаем все эмодзи
		emojies.forEach(e=>e.set_state(e_inactive));
		
		//устанавливаем и отображаем баланс
		this.money=230;
		this.prv_money=this.money;
		this.change_balance(0);
		
		//секундная проверка событий
		this.sec_check=0;
		
	
		//запуск кода
		eval(this.init_code);
		
		game_tick=0;
	}
	
	place_explosion(x,y)
	{
		for (var e=0;e<explosions.length;e++)
		{
			if (explosions[e].expl.visible==false)
			{
				explosions[e].place(x,y);
				return;				
			}
		}
	}
			
	process()
	{
		
		//добавляем новых эмодзи на сцену в соответствии с графиком		
		if (this.no_more_waves==false)
		{
			
			if (game_tick>this.schedule2[this.next_emoji][0])
			{
				var next_em_id=this.schedule2[this.next_emoji][1];
				var next_wave=this.schedule2[this.next_emoji][2];
				var wave_size=this.schedule2[this.next_emoji][3];
				this.send_emoji(next_em_id);
				if (next_wave>0)
				{
					objects.wave_info.text=next_wave+"/"+this.total_waves;
					//this.wave_size=wave_size;
					//this.w_emoji=0;
				}
				
				this.next_emoji++;
				this.w_emoji++;
				//this.emoji_info.text="emoji: "+this.w_emoji+"/"+this.wave_size;
				
				if (this.next_emoji==this.schedule_size)
					this.no_more_waves=true;
			}			
			
		}
		
		//обрабатываем эмодзи
		emojies.forEach(e=>e.process());
		
		//обрабатываем пули
		bullets.forEach(e=>e.process());
				
		//обрабатываем башни
		towers.forEach(e=>e.process());
		
		//обрабатываем взрывы
		explosions.forEach(e=>e.process());
		
		//обрабатываем сообщение
		if (objects.message_line.visible==true)
		{
			objects.message_line.alpha-=0.002;
			objects.message.alpha=objects.message_line.alpha;
			
			if (objects.message_line.alpha<=0)
			{
				objects.message_line.visible=false;
				objects.message.visible=false;
			}			
		}
		
		
		//изменение баланса произошло
		if (this.money!=this.prv_money)
		{
			//перепроверяем не появились ли новые апгрейды для башень
			towers.forEach(e=>e.check_new_upgrades());

			
			this.prv_money=this.money;
		}
		
		//ежесекундная проверка событий
		if (game_tick>this.sec_check+1)
		{
			//failed
			if (this.gate_level<=0)
			{
				objects.block_scr.visible=true;
				//objects.resume_button.visible=true;
				objects.back_button2.visible=true;
				objects.restart_button.visible=true;
				objects.finish_notice.visible=true;
				objects.finish_notice.texture=game_res.resources['failed_img'].texture;
				g_process=this.process_gameover;
			}
			
			//win
			if (this.completed_emoji==this.schedule_size && this.gate_level>0)
			{
				screen_1.set_level_status(this.gate_level);
				objects.block_scr.visible=true;
				//objects.resume_button.visible=true;
				objects.back_button2.visible=true;
				objects.restart_button.visible=true;
				objects.finish_notice.visible=true;
				objects.finish_notice.texture=game_res.resources['lev_com_'+this.gate_level].texture;
			}
			
			
			
			this.sec_check=game_tick;
		}
		
		
		game_tick += 0.01666666;		
	}	
	
	damage_gate(amount)
	{
		this.gate_level-=amount;
		objects.gate_level.text=this.gate_level
	}
	
	process_pause()
	{

		
	}
	
	process_gameover()
	{
		
		
		
	}
	
	pause_down()
	{
		explosions.forEach(e=>e.expl.stop());
		objects.block_scr.visible=true;
		objects.resume_button.visible=true;
		objects.back_button2.visible=true;
		objects.restart_button.visible=true;
		objects.finish_notice.visible=true;
		objects.finish_notice.texture=game_res.resources["paused_img"].texture;
		
		g_process=this.process_pause;
	}

	resume_down()
	{
		explosions.forEach(e=>e.expl.play());
		
		objects.block_scr.visible=false;
		objects.resume_button.visible=false;
		objects.back_button2.visible=false;
		objects.restart_button.visible=false;
		objects.finish_notice.visible=false;
		
		g_process=this.process.bind(this);
	}
	
	back_button2_down()
	{
		
		screen_1.draw_and_init();
		
	}
	
	restart_down()
	{
		
		this.load(this.map_id);
		
	}
	
	on_map_down()
	{
		//скрываем все башни и их аттрибуты
		towers.forEach(e=>e.hide_attributes());
		tower_control_class.selected_tower=-1;
	}

	change_balance(amount)
	{				
		this.money+=amount;
		objects.money_balance.text=this.money;
	}
	
	send_message(msg, col)
	{
		if (col==red)
			objects.message_line.texture=game_res.resources["message_bcg_red"].texture
		else
			objects.message_line.texture=game_res.resources["message_bcg_blue"].texture
		
		objects.message.text=msg;
		objects.message.visible=true;
		objects.message_line.visible=true;
		objects.message.alpha=1;
		objects.message_line.alpha=1;
		
	}

	send_emoji(emoji_face)
	{
		for (var i=0;i<emojies.length;i++)
		{
			if (emojies[i].state==e_inactive)
			{
				emojies[i].init(emoji_face, i);
				return;
			}
		}
	}
	
	send_bullet(type, x, y, emoji_id, parent_tower_id)
	{
		for (var i=0;i<bullets.length;i++)
		{
			if (objects.bullets_array[i].visible==false)
			{
				bullets[i].activate(type, x, y, emoji_id, parent_tower_id);
				return;				
			}
		}
	}

		
}

function resize()
{
    const vpw = window.innerWidth;  // Width of the viewport
    const vph = window.innerHeight; // Height of the viewport
    let nvw; // New game width
    let nvh; // New game height

    // The aspect ratio is the ratio of the screen's sizes in different dimensions.
    // The height-to-width aspect ratio of the game is HEIGHT / WIDTH.
    
    if (vph / vpw < M_HEIGHT / M_WIDTH) {
      // If height-to-width ratio of the viewport is less than the height-to-width ratio
      // of the game, then the height will be equal to the height of the viewport, and
      // the width will be scaled.
      nvh = vph;
      nvw = (nvh * M_WIDTH) / M_HEIGHT;
    } else {
      // In the else case, the opposite is happening.
      nvw = vpw;
      nvh = (nvw * M_HEIGHT) / M_WIDTH;
    }
    
    // Set the game screen size to the new values.
    // This command only makes the screen bigger --- it does not scale the contents of the game.
    // There will be a lot of extra room --- or missing room --- if we don't scale the stage.
    app.renderer.resize(nvw, nvh);
    
    // This command scales the stage to fit the new size of the game.
    app.stage.scale.set(nvw / M_WIDTH, nvh / M_HEIGHT);
}

function preload_ok()
{
	
	
	var rParams = FAPI.Util.getRequestParameters();

	FAPI.init(rParams["api_server"], rParams["apiconnection"],
			  /*
			  * Первый параметр:
			  * функция, которая будет вызвана после успешной инициализации.
			  */
			  function() {
				  alert("Success");
				  // здесь можно вызывать методы API
				  load();
			  },
			  /*
			  * Второй параметр:
			  * функция, которая будет вызвана, если инициализация не удалась.
			  */
			  function(error) {
				  alert(error);
				  load();
			  }
	);	
	
}

function load()
{
					
	//загружаем ресурсы в соответствии с листом загрузки
	game_res=new PIXI.loaders.Loader();	
	for (var l=0;l<load_list.length;l++)
		for (var i=0;i<load_list[l].length;i++)
			if (load_list[l][i][0]=="sprite" || load_list[l][i][0]=="image") 
				game_res.add(load_list[l][i][1], "res/"+load_list[l][i][1]+".png");
		
	//загружаем взрывы
	for (var i=0;i<anim_list.length;i++)
		for (var j=0;j<anim_list[i];j++)
			game_res.add("expl_"+i+"_"+j, "res/explosions/"+i+"/"+j+".png");
	
	
	game_res.load(load_complete);		
	game_res.onProgress.add(progress);
	
	function load_complete()
	{
		document.getElementById("demo").innerHTML = ""
		app = new PIXI.Application({width:M_WIDTH, height:M_HEIGHT,antialias:true,backgroundColor : 0x060600});
		window.addEventListener("resize", resize());

		
				
		document.body.appendChild(app.view);
		document.body.style.backgroundColor = "blue";
		
		
		//создаем спрайты и массивы спрайтов
		for (var l=0;l<load_list.length;l++)
		{
			for (var i=0;i<load_list[l].length;i++)
			{			
				var obj_class=load_list[l][i][0];
				var obj_name=load_list[l][i][1];

				switch(obj_class)
				{			
					case "sprite":
						objects[obj_name]=new PIXI.Sprite(game_res.resources[obj_name].texture);
						objects[obj_name].x=load_list[l][i][2];
						objects[obj_name].y=load_list[l][i][3];
						eval(load_list[l][i][4]);
						app.stage.addChild(objects[obj_name]);	
					break;
					
					case "block":
						eval(load_list[l][i][4]);
						objects[obj_name].x=load_list[l][i][2];
						objects[obj_name].y=load_list[l][i][3];						
						app.stage.addChild(objects[obj_name]);	
					break;

					case "sprite_array":
						var textures=[game_res.resources["expl_0_0"].texture,game_res.resources["expl_0_1"].texture];
						var a_size=load_list[l][i][2];
						objects[obj_name]=[];
						for (var n=0;n<a_size;n++)
						{			
							eval(load_list[l][i][4]);		
							app.stage.addChild(objects[obj_name][n]);							
						}
					break;
					
					case "anim_array":
						objects[obj_name]=[];
						var n=0;
						for (var key in anim_list)
						{
							var textures=[];
							for (var a=0;a<anim_list[key];a++)
								textures.push(game_res.resources[key+"_"+a].texture);						
							
							eval(load_list[l][i][4]);
							app.stage.addChild(objects[obj_name][n]);								
							n++;
						}

					break;
				}
			}
		}
		
		//Загружаем пули
		for (var i=0; i<objects.bullets_array.length;i++)
			bullets.push(new bullet_class(i))
		
			
		//Организуем анимационные текстуры
		for (var i=0;i<anim_list.length;i++)
		{
			expl_textures.push([]);
			for (var j=0;j<anim_list[i];j++)
				expl_textures[i].push(game_res.resources["expl_"+i+"_"+j].texture);
		}
		
		//загружаем взрывы
		for (var i=0; i<objects.expl_array.length;i++)
			explosions.push(new explosion_class(i))
		
	
		
		screen_0=new screen_0_class(0);
		screen_1=new screen_1_class(1);
		screen_2=new screen_2_class(2);
		screen_3=new screen_3_class(3);
				
		screen_0.draw_and_init();
		
		main_loop();	
	}

	function progress(loader, resource)
	{
		document.getElementById("demo").innerHTML = Math.round(loader.progress)+"%";
	}
	
}

function main_loop()
{
	g_process();
    app.render(app.stage);
	requestAnimationFrame(main_loop);
}


