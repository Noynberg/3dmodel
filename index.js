import { RGBELoader } from 'https://threejs.org/examples/jsm/loaders/RGBELoader.js';
import { RoomEnvironment  } from 'https://threejs.org/examples/jsm/environments/RoomEnvironment.js';

const webgl = document.querySelector('#webgl');
const width = webgl.offsetWidth;
const height = webgl.offsetHeight;
const btndown = document.querySelector('.button-down');
const btnup = document.querySelector('.button-up');
const arrowdown = document.querySelector('.arrow-down');
const arrowup = document.querySelector('.arrow-up');
const leveltext = document.querySelector('#level');

let currentstage = 1;

const textupdate = () => {
    leveltext.innerText = 'Level No ' + currentstage;
}


let Stage4x;
let Stage4y;
let Stage4z;

let Stage5x;
let Stage5y;
let Stage5z;

function clickbtndown(){


		if(currentstage == 2){

			camera.lookAt(Stage5x,Stage5y + 2,Stage5z); 
			// controls.target = new THREE.Vector3(Stage5x,Stage5y + 3 ,Stage5z); 

			btndown.addEventListener('click', ()=>{
			   currentstage = 1;
			controls.enablePan = false;
			controls.maxPolarAngle = Math.PI / 2.5;
			controls.maxAzimuthAngle = Math.PI;
	
			let animate2 =  anime({
				targets: camera.position,
				x: [camera.position.x, 4],
				y: [camera.position.y,2.49 ],
				z: [camera.position.z ,3.5], // from 100 to 250
				easing: 'easeOutCubic' ,
			  });

			
	        
			  animate2.play();
		      textupdate();
	
	});
	
		};
	
		if(currentstage == 2){
			btndown.style.cursor = 'pointer';
			arrowdown.style.color = '#3050E9';
		   
		}
	
		else {
			btndown.style.cursor = 'default';
			arrowdown.style.color = '#E2E2E2';
		}
		


};

function clickbtnup(){

	Stage4x = Stage4.position.x;
	Stage4y = Stage4.position.y;
	Stage4z = Stage4.position.z;

	Stage5x = Stage5.position.x;
	Stage5y = Stage5.position.y;
	Stage5z = Stage5.position.z;

	if(currentstage == 1){
       camera.lookAt(Stage4x,Stage4y + 1,Stage4z); 
		//  controls.target = new THREE.Vector3(Stage4x,Stage4y,Stage4z); 

		btnup.addEventListener('click', ()=>{
			currentstage = 2;
		controls.enablePan = false;
		controls.maxPolarAngle = Math.PI / 2.5;
		controls.maxAzimuthAngle = Math.PI;
        camera.lookAt(0,4,0);

		let animate1 =  anime({
			targets: camera.position,
			x: [camera.position.x, 6],
			y: [camera.position.y,6],
			z: [camera.position.z ,0], // from 100 to 250
			easing: 'easeOutCubic' ,
		  });

		  

		  animate1.play();
		  textupdate();

});

	};

	if(currentstage == 1){
	   btnup.style.cursor = 'pointer';
	   arrowup.style.color = '#3050E9';

	}

	else {
		btnup.style.cursor = 'default';
		arrowup.style.color = '#E2E2E2';
	}
};




//-- Scene
    		const scene = new THREE.Scene();

//-- Camera			
            const camera = new THREE.PerspectiveCamera( 35, width / height, 0.1, 1000 );
            scene.add( camera );
			camera.position.set(6.5,2.5,3.9); 


//--Renderer	
			const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.querySelector('#webgl')});
			renderer.setSize( window.innerWidth, window.innerHeight );
			renderer.setPixelRatio(window.devicePixelRatio /1.3);
			renderer.outputEncoding = THREE.sRGBEncoding;
		    renderer.toneMapping = THREE.ACESFilmicToneMapping;	
			renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;			

//-- Scene Background		

const pmremGenerator = new THREE.PMREMGenerator( renderer );

scene.background = new THREE.Color( 0xeeeeee );
scene.environment = pmremGenerator.fromScene( new RoomEnvironment() ).texture;
scene.fog = new THREE.Fog( 0xeeeeee, 10, 50 );	

const PlaneGeometry = new THREE.BoxGeometry(100,0.2,100);
const planematerial = new THREE.MeshStandardMaterial({
	color: 'white',
});

const bottomsurface = new THREE.Mesh(PlaneGeometry,planematerial);
bottomsurface.position.set(0,-0.4,0);
bottomsurface.receiveShadow = true;
bottomsurface.castShadow = true;
scene.add(bottomsurface);

//-- Screen Resize
window.addEventListener('resize', () =>{
	onWindowResize()
});
			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
	
				renderer.setSize( window.innerWidth, window.innerHeight );
	
			};

//-- Orbit-Controls			
			const controls = new THREE.OrbitControls( camera, renderer.domElement );
		
            controls.autoRotateSpeed = 1;
	
			controls.maxPolarAngle = 1.58;
			controls.minDistance = 1;
			controls.maxDistance = 14;
	
//-- Materials	

//-- Lights 

const directionalLight = new THREE.DirectionalLight( 0xffffff, 5 );
scene.add( directionalLight );
const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
scene.add( helper );
directionalLight.castShadow = true; 
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.bias = - 0.0005
directionalLight.position.set(0,4,5);
directionalLight.rotation.set(1,3,0);

//-- Objects 

			let loader = new THREE.GLTFLoader();
			let loader2 = new THREE.GLTFLoader();
			let charaterloader = new THREE.GLTFLoader();
			let character;
			let Stage4,Stage5;
			let focuspoint;

			loader.load('model/Stage4.glb', function(gltf){
				
	            Stage4 = gltf.scene;
			    Stage4.scale.set(1.5,1.5,1.5);
				Stage4.position.set(0,0,0);
				Stage4.traverse( c => {
                   c.castShadow = true;
				   c.receiveShadow = true;
				});
                scene.add(Stage4);			  
		


			});

			loader2.load('model/Stage5.glb', function(gltf){
				
	            Stage5 = gltf.scene;
			    Stage5.scale.set(1.5,1.5,1.5);
				Stage5.position.set(3.356,-0.192,-3.598);
				Stage5.traverse( c => {
					c.castShadow = true;
					c.receiveShadow = true;
				 });
                scene.add(Stage5);			  
        
			});

			charaterloader.load('model/character.glb', function(gltf){
				character = gltf.scene;
			    character.scale.set(0.3,0.3,0.3);
				character.position.set(0.4,0.2,0.36);
				character.rotation.set(0,1,0);
				character.traverse( c => {
					c.castShadow = true;
					c.receiveShadow = true;
				 });
                scene.add(character);			  
        
			});
	
		
            function render() {
                requestAnimationFrame(render);
			
                  clickbtndown();
				  clickbtnup();
                renderer.render(scene, camera);
                }
render();      