import * as TWEEN from "@tweenjs/tween.js";

import * as THREE from 'three';
import { TextGeometry } from "three";

import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Stats from 'three/examples/jsm/libs/stats.module.js';

import { AdditiveBlending, Float32BufferAttribute } from 'three'

function canvasCore() {

  let container, stats;
  let camera, scene, raycaster, renderer, dragControls, ghostObj
  let sceneContainer = document.querySelector('#sceneCanvas')
  let clock = new THREE.Clock()

  let INTERSECTED;
  let theta = 0
  var firstScene = false, firstSceneInterval

  var planets = []
  var mainPlanet, coords
  var controls
  var bgStarsGeometry = null
  var bgStarsMaterial = null
  var bgStars = null
  var points = null
  var thetaFlag = true

  const pointer = new THREE.Vector2();
  const radius = 100;

  const textureLoader = new THREE.TextureLoader()
  const shape = textureLoader.load('/assets/images/particle.png')
  const parameters = {}

  parameters.count = 10000
  parameters.size = 0.3
  parameters.radius = 5
  parameters.branches = 8
  parameters.spin = 1
  parameters.randomness = 0.3
  parameters.randomnessPower = 5
  parameters.stars = 600
  parameters.starColor = '#1b3984'
  parameters.insideColor = '#3776ff'
  parameters.outsideColor = '#935CF2'


  init();
  animate();

  function init() {

    camera = new THREE.PerspectiveCamera(70, sceneContainer.clientWidth / sceneContainer.clientHeight, 1, 10000);
    camera.position.set(1, 1, 100)
    camera.lookAt(0, 0, 0)
    coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z }

    scene = new THREE.Scene();
    //scene.background = new THREE.Color( 0x040F1A );

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(20, -20, 100).normalize();
    scene.add(light);

    /*const hemisLight = new THREE.HemisphereLight( 0xDEFFFF, 0x0f0f20, 1 )
    hemisLight.position.set( 10, -10, 10 ).normalize();
    scene.add(hemisLight)*/
    const ambientLight = new THREE.AmbientLight(0x404040)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x404040, 2, 500, 2)
    pointLight.position.set(-75, 25, -5)
    scene.add(pointLight)

    /*
    * GEOMETRIES - SHAPES GENERATION
    */

    // Spheres generation
    // mainPlanet
    const geometrySphere = new THREE.SphereGeometry(20, 64, 32);
    const materialSphere = new THREE.MeshLambertMaterial({ color: 0x935CF2 });
    console.log(materialSphere)
    materialSphere.transparent = true
    materialSphere.opacity = 0.9
    mainPlanet = new THREE.Mesh(geometrySphere, materialSphere);
    scene.add(mainPlanet);
    /*
    mainPlanet.position.x = -58
    mainPlanet.position.y = -5
    mainPlanet.position.z = -15
    */
    mainPlanet.position.x = 0
    mainPlanet.position.y = 0
    mainPlanet.position.z = 24
    mainPlanet.scale.set(3, 3, 3)
    mainPlanet.material.opacity = 0
    mainPlanet.txtInfo = "mainPlanet text"

    // planetOne
    const geometryPlanetOne = new THREE.SphereGeometry(8, 64, 32);
    const materialPlanetOne = new THREE.MeshLambertMaterial({ color: 0x935CF2 });
    materialPlanetOne.transparent = true
    materialPlanetOne.opacity = 1
    var planetOne = new THREE.Mesh(geometryPlanetOne, materialPlanetOne);
    scene.add(planetOne);
    planetOne.position.x = -25
    planetOne.position.y = 11
    planetOne.position.z = 30
    planetOne.scale.set(0, 0, 0)
    planetOne.txtInfo = "planetOne text"
    planetOne.planetName = "planetOne"
    planets.push(planetOne)

    // planetTwo
    const geometryPlanetTwo = new THREE.SphereGeometry(8, 64, 32);
    const materialPlanetTwo = new THREE.MeshLambertMaterial({ color: 0x935CF2 });
    materialPlanetTwo.transparent = true
    materialPlanetTwo.opacity = 1
    var planetTwo = new THREE.Mesh(geometryPlanetTwo, materialPlanetTwo);
    scene.add(planetTwo);
    planetTwo.position.x = -11
    planetTwo.position.y = -6
    planetTwo.position.z = 46
    planetTwo.scale.set(0, 0, 0)
    planetTwo.txtInfo = "planetTwo text"
    planetTwo.planetName = "planetTwo"
    planets.push(planetTwo)

    // planetThree
    const geometryPlanetThree = new THREE.SphereGeometry(8, 64, 32);
    const materialPlanetThree = new THREE.MeshLambertMaterial({ color: 0x935CF2 });
    materialPlanetThree.transparent = true
    materialPlanetThree.opacity = 1
    var planetThree = new THREE.Mesh(geometryPlanetThree, materialPlanetThree);
    scene.add(planetThree);
    planetThree.position.x = 16
    planetThree.position.y = 14
    planetThree.position.z = 30
    planetThree.scale.set(0, 0, 0)
    planetThree.txtInfo = "planetThree text"
    planetThree.planetName = "planetThree"
    planets.push(planetThree)

    // planetFour
    const geometryPlanetFour = new THREE.SphereGeometry(8, 64, 32);
    const materialPlanetFour = new THREE.MeshLambertMaterial({ color: 0x935CF2 });
    materialPlanetFour.transparent = true
    materialPlanetFour.opacity = 1
    var planetFour = new THREE.Mesh(geometryPlanetFour, materialPlanetFour);
    scene.add(planetFour);
    planetFour.position.x = 22
    planetFour.position.y = -10
    planetFour.position.z = 30
    planetFour.scale.set(0, 0, 0)
    planetFour.txtInfo = "planetFour text"
    planetFour.planetName = "planetFour"
    planets.push(planetFour)

    debug.push(mainPlanet)
    debug.push(planets)
    camero = camera
    console.log(debug)

    /*
    * Constellation generation
    * https://github.com/the-halfbloodprince/GalaxyM1199/blob/master/src/script.js
    * 
    */
    let geometry = null
    let material = null

    function generateGalaxy() {

      if (points !== null) {
        geometry.dispose()
        material.dispose()
        scene.remove(points)
      }

      geometry = new THREE.BufferGeometry()

      const positions = new Float32Array(parameters.count * 3)
      const colors = new Float32Array(parameters.count * 3)

      const colorInside = new THREE.Color(parameters.insideColor)
      const colorOutside = new THREE.Color(parameters.outsideColor)

      for (let i = 0; i < parameters.count; i++) {

        //Position
        const x = Math.random() * parameters.radius
        const branchAngle = (i % parameters.branches) / parameters.branches * 2 * Math.PI
        const spinAngle = x * parameters.spin

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

        positions[i * 3] = Math.sin(branchAngle + spinAngle) * x * 15 + randomX
        positions[i * 3 + 1] = randomY * 15
        positions[i * 3 + 2] = Math.cos(branchAngle + spinAngle) * x * 15 + randomZ

        //Color

        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, x / parameters.radius)

        colors[i * 3 + 0] = mixedColor.r
        colors[i * 3 + 1] = mixedColor.g
        colors[i * 3 + 2] = mixedColor.b
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

      material = new THREE.PointsMaterial({
        color: 'white',
        size: parameters.size,
        depthWrite: false,
        sizeAttenuation: true,
        blending: AdditiveBlending,
        vertexColors: true,
        transparent: true,
        alphaMap: shape
      })

      points = new THREE.Points(geometry, material)
      //points.scale.set(10,10,10)
      //points.position.set(-3,-1,0.5)
      points.rotation.x = 0.15
      points.rotation.z = -0.25
      points.material.opacity = 0
      points.scale.set(0, 0, 0)
      console.log(points)
      scene.add(points)


    }
    generateGalaxy()
    //

    raycaster = new THREE.Raycaster();

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    //renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight)
    //container.appendChild( renderer.domElement );
    sceneContainer.appendChild(renderer.domElement)

    stats = new Stats();
    document.querySelector("body").appendChild(stats.dom);

    /*
    * CONTROLS
    */
    setTimeout(() => {
      console.log("controls ready - NOT!")
      dragControls = new DragControls([...scene.children], camera, renderer.domElement);
      dragControls.addEventListener('drag', render);
      dragControls.enabled = false
    }, 1000);

    // orbitControl
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = false
    controlz = controls

    document.addEventListener('mousemove', onPointerMove);

    //sceneContainer.addEventListener("dbclick", doubleClick)
    //sceneContainer.addEventListener("click", checkUIEvents)

    //

    window.addEventListener('resize', onWindowResize);

    // POST FIRST SCENE OPENING
    if (firstScene === false) {
      firstSceneInterval = setInterval(() => {
        if (document.querySelector(".scene__one").classList.contains("disabled")) {
          firstScene = true
          clearInterval(firstSceneInterval)
          console.log("attivi")

          document.querySelector(".head").classList.add("active")
          document.querySelector(".head__inner").classList.add("active")
          document.querySelector(".head__title").classList.add("active")
          document.querySelector(".head__title").innerText = "break it! quick!"

          new TWEEN.Tween(points.material).to({ opacity: 1 }, 750).easing(TWEEN.Easing.Quadratic.In).start()
          new TWEEN.Tween(points.scale).to({ x: 1, y: 1, z: 1 }, 500).easing(TWEEN.Easing.Quadratic.Out).start()

          new TWEEN.Tween(mainPlanet.material).to({ opacity: 1 }, 750).easing(TWEEN.Easing.Quadratic.In).start()
          new TWEEN.Tween(mainPlanet.scale).to({ x: 1, y: 1, z: 1 }, 500).easing(TWEEN.Easing.Quadratic.In).start()

          setTimeout(() => {
            document.querySelector(".scene__two__floating").classList.add("active")
          }, 500);
        }
      }, 500)
    }

    document.querySelector(".scene__two__btn").addEventListener("click", () => {
      document.querySelector(".scene__two__btn").classList.add("clicked")

      document.querySelector(".head__inner").classList.remove("active")
      document.querySelector(".head__title").classList.remove("active")
      document.querySelector(".head__title").innerText = "pick a planet"
      setTimeout(() => {
        document.querySelector(".head__inner").classList.add("active")
        document.querySelector(".head__title").classList.add("active")
      }, 500);


      new TWEEN.Tween(mainPlanet.material).to({ opacity: 0 }, 450).easing(TWEEN.Easing.Quadratic.In).start()
      new TWEEN.Tween(mainPlanet.scale).to({ x: 3, y: 3, z: 3 }, 250).easing(TWEEN.Easing.Quadratic.In).onComplete(() => {
        mainPlanet.visible = false
        mainPlanet.scale.set(0, 0, 0)
        goPlanets()
      }).start()
    })

    /*
    * SECOND SCENE
    * Button clicked -> going to planets 
    */
    function goPlanets() {
      console.log("SECOND SCENE")

      new TWEEN.Tween(planetOne.scale).to({ x: 1, y: 1, z: 1 }, 500).easing(TWEEN.Easing.Back.Out).start()
      new TWEEN.Tween(planetTwo.scale).to({ x: 1, y: 1, z: 1 }, 250).easing(TWEEN.Easing.Back.Out).start()
      new TWEEN.Tween(planetThree.scale).to({ x: 1, y: 1, z: 1 }, 750).easing(TWEEN.Easing.Back.Out).start()
      new TWEEN.Tween(planetFour.scale).to({ x: 1, y: 1, z: 1 }, 625).easing(TWEEN.Easing.Back.Out).start()

      //parameters.insideColor = "#ff3c00"
      //generateGalaxy()

      //new TWEEN.Tween(points.material).to({opacity: 1}, 450).easing(TWEEN.Easing.Quadratic.In).start()
      new TWEEN.Tween(points.scale).to({ x: 3, y: 3, z: 4.5 }, 350).easing(TWEEN.Easing.Quadratic.In).start()
      //new TWEEN.Tween(points.material.color).to({ r:0.95,g:0.25,b:0.25 }, 350).easing(TWEEN.Easing.Quadratic.In).start()

      points.rotation.x = points.rotation.x + 0.1
      points.rotation.z = points.rotation.z - 0.1
      thetaFlag = false

      punti = points

      document.querySelector(".scene__two__maxifloat").classList.add("active")

      planets.forEach((element, key) => {
        console.log("---")
        console.log(element)
        let position = new THREE.Vector3(250, 250, 250)
        let projectedPosition = position.applyMatrix4(element.matrixWorld).project(camera)
        console.log((projectedPosition.x + 1) / 2 * sceneContainer.clientWidth)
        document.querySelectorAll(".scene__two__floating--small")[key].style.left = ((projectedPosition.x + 1) / 2 * sceneContainer.clientWidth)+"px"
        document.querySelectorAll(".scene__two__floating--small")[key].style.top = 25+(-(projectedPosition.y - 1) / 2 * sceneContainer.clientHeight)+"px"
      })

    }

    /*
    * THIRD SCENE
    * Planet event -> opening its "page"
    */
    function planetPage(planetN) {
      document.querySelector(".scene__three").style.width = "calc(60% - " + document.querySelector(".band").clientWidth + "px)"
      document.querySelector(".scene__three").style.height = "calc(100vh - " + document.querySelector(".head").clientHeight + "px)"
      document.querySelector(".scene__three").style.right = document.querySelector(".band").clientWidth + "px"
      sceneContainer.classList.add("blockcanvas")

      setTimeout(() => {
        document.querySelector(".scene__three").classList.add("active")
        document.querySelector(".goback").classList.add("active")
      }, 250)

      switch (planetN) {
        case "one":
          new TWEEN.Tween(camera.position).to({ x: -16, y: 27, z: 66 }, 250).onComplete(() => camera.lookAt(planetOne.position)).start()

          setTimeout(() => {
            document.querySelector("#planetOne").classList.add("active")
          }, 500)

          document.querySelector(".head__inner").classList.remove("active")
          document.querySelector(".head__title").classList.remove("active")
          document.querySelector(".head__title").innerText = "observing planetOne"
          setTimeout(() => {
            document.querySelector(".head__inner").classList.add("active")
            document.querySelector(".head__title").classList.add("active")
          }, 500);

          break;
        //planetOne end

        case "two":
          new TWEEN.Tween(camera.position).to({ x: 10, y: -20, z: 69 }, 250).onComplete(() => camera.lookAt(planetTwo.position)).start()

          setTimeout(() => {
            document.querySelector("#planetTwo").classList.add("active")
          }, 500)

          document.querySelector(".head__inner").classList.remove("active")
          document.querySelector(".head__title").classList.remove("active")
          document.querySelector(".head__title").innerText = "observing planetTwo"
          setTimeout(() => {
            document.querySelector(".head__inner").classList.add("active")
            document.querySelector(".head__title").classList.add("active")
          }, 500);

          break;
        //planetTwo end

        case "three":
          new TWEEN.Tween(camera.position).to({ x: 55, y: 24, z: 26 }, 250).onComplete(() => camera.lookAt(planetThree.position)).start()

          setTimeout(() => {
            document.querySelector("#planetThree").classList.add("active")
          }, 500)

          document.querySelector(".head__inner").classList.remove("active")
          document.querySelector(".head__title").classList.remove("active")
          document.querySelector(".head__title").innerText = "observing planetThree"
          setTimeout(() => {
            document.querySelector(".head__inner").classList.add("active")
            document.querySelector(".head__title").classList.add("active")
          }, 500);

          break;
        //planetThree end

        case "four":
          new TWEEN.Tween(camera.position).to({ x: 57, y: -18, z: 26 }, 250).onComplete(() => camera.lookAt(planetFour.position)).start()

          setTimeout(() => {
            document.querySelector("#planetFour").classList.add("active")
          }, 500)

          document.querySelector(".head__inner").classList.remove("active")
          document.querySelector(".head__title").classList.remove("active")
          document.querySelector(".head__title").innerText = "observing planetFour"
          setTimeout(() => {
            document.querySelector(".head__inner").classList.add("active")
            document.querySelector(".head__title").classList.add("active")
          }, 500);

          break;
        //planetFour end

        default:
          break;
      }
    }

    /*
    * Buttons logic to advance to each planet (enabling scene__three)
    */
   function goToPlanet() {
    document.querySelectorAll(".scene__two__floating--small").forEach(element => {
       element.addEventListener("click", () => {
         let planetID = element.id.split("goto-")[1]
         document.querySelector(".scene__two__maxifloat").classList.remove("active")
         planetPage(planetID)
       })
     })
   }
   goToPlanet()

    /*
    *  UI events - click and interactions
    */
    function checkUIEvents(event) {
      if (ghostObj.planetName) {
        console.log("You clicked a planet")
        console.log(ghostObj.planetName)
        planetPage(ghostObj.planetName)
      }
    }

    /*
    * goBack, aka going back from scene__three to scene__two
    */
    function goBack() {
      document.querySelector(".goback").addEventListener("click", function () {
        this.classList.remove("active")
        document.querySelector(".scene__three").classList.remove("active")
        sceneContainer.classList.remove("blockcanvas")
        document.querySelector(".planetpage.active").classList.remove("active")
        new TWEEN.Tween(camera.position).to({ x: 1, y: 1, z: 100 }, 250).onComplete(() => camera.lookAt(scene.position)).start()

        document.querySelector(".head__inner").classList.remove("active")
        document.querySelector(".head__title").classList.remove("active")
        document.querySelector(".head__title").innerText = "pick a planet"
        setTimeout(() => {
          document.querySelector(".head__inner").classList.add("active")
          document.querySelector(".head__title").classList.add("active")
          document.querySelector(".scene__two__maxifloat").classList.add("active")
        }, 500);
      })
    }
    goBack()

  }

  function onWindowResize() {

    //camera.aspect = window.innerWidth / window.innerHeight;
    camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);

  }

  function onPointerMove(event) {
    const { top, left, width, height } = renderer.domElement.getBoundingClientRect();

    pointer.x = ((event.clientX - left) / width) * 2 - 1;
    pointer.y = - ((event.clientY - top) / height) * 2 + 1;

  }

  function doubleClick(event) {
    console.log(ghostObj)
    document.querySelector(".ghostinfo").innerHTML =
      `
    <div><em>name</em>: ${ghostObj.txtInfo}</div>
    <div><em>position</em>: x = ${ghostObj.position.x}, y = ${ghostObj.position.y}, z = ${ghostObj.position.z}</div>
    <div><em>scale</em>: x = ${ghostObj.scale.x}, y = ${ghostObj.scale.y}, z = ${ghostObj.scale.z}</div>
    `
    console.log(coords)
    //document.querySelector(".popup").innerText = ghostObj.txtInfo
    //new TWEEN.Tween(camera.position).to({x: coords.x + 150, y: ghostObj.position.y - 250, z: 250},750).onComplete(() => camera.lookAt(ghostObj.position)).start()
    //document.querySelector("#scene canvas").classList.add("moved")
    //document.querySelector(".popup").classList.add("active")
  }

  //

  function animate() {

    requestAnimationFrame(animate);

    TWEEN.update()
    controls.update();
    render();
    stats.update();
  }

  function render() {

    theta += 0.01;
    /*
    camera.position.x = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
    camera.position.y = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
    camera.position.z = radius * Math.cos( THREE.MathUtils.degToRad( theta ) );
    */
    camera.lookAt(scene.position);

    camera.updateMatrixWorld();

    // find intersections

    raycaster.setFromCamera(pointer, camera);

    let t = clock.getElapsedTime()

    mainPlanet.position.x = mainPlanet.position.x + (Math.sin(theta) * 0.025)
    mainPlanet.position.y = mainPlanet.position.y + (Math.sin(theta) * 0.025)

    planets[0].position.x = planets[0].position.x + (Math.sin(theta) * - 0.0125)
    planets[0].position.y = planets[0].position.y + (Math.sin(theta) * 0.0125)

    planets[1].position.x = planets[1].position.x + (Math.cos(theta) * 0.0125)
    planets[1].position.y = planets[1].position.y + (Math.cos(theta) * 0.0125)

    planets[2].position.x = planets[2].position.x + (Math.sin(theta) * 0.0125)
    planets[2].position.y = planets[2].position.y + (Math.cos(theta) * - 0.0125)

    planets[3].position.x = planets[3].position.x + (Math.cos(theta) * - 0.0125)
    planets[3].position.y = planets[3].position.y + (Math.sin(theta) * 0.0125)

    if (thetaFlag) {
      points.rotation.y = theta * - 0.05
    } else {
      points.rotation.y = theta * - 0.01
    }
    points.rotation.x = points.rotation.x + Math.sin(theta) * 0.00001
    points.rotation.z = points.rotation.z + Math.cos(theta) * 0.00001
    //bgStars.rotation.y = - theta*0.05


    planets.forEach(element => {
      //let magicNumber = (Math.abs(Math.cos(t))+3.5)/3.75

      //element.position.y = element.position.y + magicNumber
      //element.position.y =  radius * Math.sin( THREE.MathUtils.degToRad( theta ) )

      /*
      element.scale.x = magicNumber
      element.scale.y = magicNumber
      element.scale.z = magicNumber
      */
    })

    const intersects = raycaster.intersectObjects(scene.children, false);

    if (intersects.length > 0) {
      if (INTERSECTED != intersects[0].object) {
        INTERSECTED = intersects[0].object
        ghostObj = intersects[0].object
      }
    } else {
      INTERSECTED = null
    }

    renderer.render(scene, camera);

  }
}

export default canvasCore;