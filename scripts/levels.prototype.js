rince.level_prototype = (function() {

	Level.prototype.obstacle_types = [];
	Level.prototype.item_types = [];
	Level.prototype.monster_types = [];

	Level.prototype.boss = {};

	Level.prototype.needed_potatoes = 0;

	Level.prototype.landscape = new Image();
	Level.prototype.sky = new Image();

	Level.prototype.spawnObstacles = function (){
        var obstacles = [],
            obstacle,
            o;

        for (var i = 0; i < obstacle_types.length; i++){
            o = obstacle_types[i];
            if (o.probability > Math.random()){
                obstacle = new Obstacle(o.name, o.image, o.w, o.h, o.x, o.y, o.hitAction)
                obstacles.push(obstacle);
                obstacle.y = Math.floor(Math.random()*(0.75*rows*cellSize - (o.h - o.y)) + 0.25*rows*cellSize);
            }
        }
        return obstacles;
    }

    Level.prototype.spawnItems = function() {
        var items = [],
            item,
            i;

        for (var j = 0; j < item_types.length; j++){
            i = item_types[j];
            if (i.probability > Math.random()){
                item = new Item(i.name, i.image, i.x, i.y, i.hitAction);
                items.push(item);
                item.y = Math.floor(Math.random()*(0.75*rows*cellSize - (i.h - i.y)) + 0.25*rows*cellSize);
            }
        }
        return items;
    }

    Level.prototype.spawnMonsters = function(){
        var monsters = [],
            monster,
            m;

        for (var i = 0; i < monster_types.length; i++) {
            m = monster_types[i];
            if (m.probability > Math.random()){
                monster = new Monster(m.name, m.image, m.w, m.h, m.x, m.y, m.animName, 
                        m.monsterAnimations, m.hitAction, m.tickAction, m.hitArea);
                monsters.push(monster);
                monster.y = Math.floor(Math.random()*(0.75*rows*cellSize - (m.h - m.y)) + 0.25*rows*cellSize);
            }
        }

        return monsters;
    }

    Level.prototype.spawnBoss = function() {
        var b = new Boss(boss.name, boss.image, boss.w, boss.h, boss.x, boss.y, boss.animName,
                        boss.bossAnimations, boss.hitAction, boss.tickAction, boss.hitArea);
        b.y = Math.random()*210 + 100;
        return b;
    }

    return {
    	Level: Level
    }
})();