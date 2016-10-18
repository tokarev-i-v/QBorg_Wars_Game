/*Класс описывает оружие, которое производит выстрелы.
 *PlasmaGun стреляет кубами с шейдерами, которые будут напоминать выстрелы. 
 */

var _PlasmaGun = function (json_params)
{
	this.Bullets = [];
	this.Scene = json_params.scene;
	this.Clock = new THREE.Clock();
	
	
	this.BulletTypes = {};
	
	this.BulletTypes.CubeGreenBulletParameters = {
			distance: 5000,
			speed: 6000,
			direction: {x:100,y:100,z:100},
			start_position: {x:0,y:0,z:0},
			source_mesh: new THREE.Mesh(new THREE.CubeGeometry(20, 20, 20), new THREE.MeshStandardMaterial({emissive: "#00ff00"})),
			bullet_type: "cube_green_bullet",
			damage: 500
	};
	this.BulletTypes.CubeGreenBulletParameters.distance = 5000;

	this.BulletTypes.CubeRedBulletParameters = {
				distance: 10000,
				speed: 8000,
				direction: {x:100,y:100,z:100},
				start_position: {x:0,y:0,z:0},
				source_mesh: new THREE.Mesh(new THREE.CubeGeometry(20, 20, 20), new THREE.MeshStandardMaterial({emissive: "#ff0000"})),
			  bullet_type: "cube_red_bullet",
			  damage: 500
	};	
};

/*По переданному типу пули мы производим копирование ее характеристик
 * и затем возвращаем их 
 *
 */
_PlasmaGun.prototype.getBulletParametersByBulletType = function (json_params)
{
	ret = {}
//	console.log(json_params.bullet_type);


	if(json_params.bullet_type !== undefined)
	{
		for(var bullet_params in this.BulletTypes)
		{
			if(this.BulletTypes[bullet_params]["bullet_type"] == json_params.bullet_type)
			{
				for(param in this.BulletTypes[bullet_params])
				{
					// source_mesh нам копировать не нужно для пересылки!
					if(param !== "source_mesh")
						ret[param] = this.BulletTypes[bullet_params][param];
				}
//				console.log(ret);
				return ret;
			}
		}
	}
	return ret;
}


/*Метод производит выстрел.
 *В параметре приходят параметры для создания пули
 */ 
_PlasmaGun.prototype.shoot = function (json_params)
{
	bullet = new _PlasmaBullet(json_params);
	this.Scene.add(bullet.Mesh);
	this.Bullets.push(bullet);
};

/*Возвращает mesh объект в зависимости от параметров:
 * IN:
 * json_params = {
 * 	bullet_type: type
 * }
 * OUT:
 * THREE.Mesh().clone();
 */
_PlasmaGun.prototype.getBulletMeshByBulletType = function (json_params)
{
	if(json_params.bullet_type !== undefined)
	{
		for(bullet_params in this.BulletTypes)
		{
			if(this.BulletTypes[bullet_params]["bullet_type"] === json_params.bullet_type)
			{
				return this.BulletTypes[bullet_params]["source_mesh"].clone();
			}
		}
	}
	throw Error("Problems int _PlasmaGun.prototype.getBulletMeshByBulletType");
	return undefined;	
};

/*Метод обрабатывает движение пули!
 */
_PlasmaGun.prototype.bulletsMovingControl = function (time_delta)
{
	for(i=0; i<this.Bullets.length; i++)
	{
		console.log(this.Bullets[i].Direction);
		if(this.Bullets[i].Distance  > 0)
		{
			del = this.Bullets[i].Speed * time_delta;
			vec = this.Bullets[i].Direction.clone();
			vec.multiplyScalar(del);
			this.Bullets[i].Mesh.position.add(vec);
			this.Bullets[i].Distance -= vec.length();
		}else
		{
			this.Scene.remove(this.Bullets[i].Mesh);
			this.Bullets.splice(i,1);
			i--;
		}
	}
};

_PlasmaGun.prototype.update = function ()
{
	delta = this.Clock.getDelta();
	this.bulletsMovingControl(delta);
}

var _PhaserGun = function ()
{
};

/*Метод производит выстрел.
 */ 
_PhaserGun.prototype.shoot = function ()
{
	
};
