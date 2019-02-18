var canvas = document.getElementById('renderCanvas');
const ANIM_DURATION = 15;

// load the 3D engine
var engine = new BABYLON.Engine(canvas, true, { stencil: true });

var scene,
    camera,
    light1,
    light2,
    light3,
    sphere,
    ground;

var loadedModel = [];
let n_HighlightTimeCount = 0;
var createScene = function(){
    scene = new BABYLON.Scene(engine);
    
    camera = new BABYLON.ArcRotateCamera("Camera", 4, 1, 400, new BABYLON.Vector3(0,30,0), scene);
    camera.attachControl(canvas, false);
    camera.upperBetaLimit = 1.57;
    camera.lowerBetaLimit = 0.4;
    
    camera.upperRadiusLimit = 600;
    camera.lowerRadiusLimit = 200;

    light1 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(200, 200, 100), scene);
    light2 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(-400, 500, -400), scene);

    //load babylon model
    var assetsManager = new BABYLON.AssetsManager(scene);
    var meshTask = assetsManager.addMeshTask("model task", "", "assets/models/babylon/", "cillindro-03.babylon");

    meshTask.onSuccess = function (task) {
        loadedModel = task.loadedMeshes;
    }

    meshTask.onError = function(task,message,exception){
        console.log(task,message,exception);
    }

    assetsManager.load();

    return scene;
}

// call the createScene function
var scene = createScene();

// run the render loop
engine.runRenderLoop(function(){
    scene.render();
});

// the canvas/window resize event handler
window.addEventListener('resize', function(){
    engine.resize();
});

function addSectionAnimation(model,offset){
    var animBox = new BABYLON.Animation("anim-"+model.name,"position.y",30,BABYLON.Animation.ANIMATIONTYPE_FLOAT);
    var keys = [];
    keys.push({
        frame : 0,
        value : model.position.y,
    });
    keys.push({
        frame : ANIM_DURATION,
        value : model.position.y + offset,
    })
    animBox.setKeys(keys);
    model.animations.push(animBox);
    scene.beginAnimation(model, 0, ANIM_DURATION, false);
}

function addIlluminateAnimation(model){
    var hl = new BABYLON.HighlightLayer("hl", scene);
    hl.blurHorizontalSize   = 2;
    hl.blurVerticalSize     = 2;
    hl.addMesh(model, BABYLON.Color3.Green());
}

document.getElementById('btn-remove').addEventListener('click',function(){
    document.getElementById('input-panel').style.display = 'none';
    document.getElementById('reset').style.display = 'block';
    var num = parseInt(document.getElementById('input-num').value);
    if(num <= 0 || num > 20) return;
    console.log('num ',num)
    for(var i in loadedModel){
        if(num <= 4){
            if(loadedModel[i].name.includes('Tube-')){
                var tubeNum = parseInt(loadedModel[i].name.substring(5,8));
                if(tubeNum == num){
                    let tmpModel = loadedModel[i];
                    addIlluminateAnimation(tmpModel);
                }
            }
        }
        else{
            if(num > 4 && num <= 8){
                if(loadedModel[i].name == 'section-001') addSectionAnimation(loadedModel[i],120);
                if(loadedModel[i].name == 'section-002') addSectionAnimation(loadedModel[i],29);
                if(loadedModel[i].name.includes('Tube-')){
                    var tubeNum = parseInt(loadedModel[i].name.substring(5,8));
                    if(tubeNum <= 4) addSectionAnimation(loadedModel[i],120);
                    else if(tubeNum > 4 && tubeNum <= 8) addSectionAnimation(loadedModel[i],29);
                }
            }
            else if(num > 8 && num <= 12){
                if(loadedModel[i].name == 'section-001') addSectionAnimation(loadedModel[i],160);
                if(loadedModel[i].name == 'section-002') addSectionAnimation(loadedModel[i],140);
                if(loadedModel[i].name == 'section-003') addSectionAnimation(loadedModel[i],51);
                if(loadedModel[i].name.includes('Tube-')){
                    var tubeNum = parseInt(loadedModel[i].name.substring(5,8));
                    
                    if(tubeNum <= 4) addSectionAnimation(loadedModel[i],160);
                    else if(tubeNum > 4 && tubeNum <= 8) addSectionAnimation(loadedModel[i],140);

                    else if(tubeNum > 8 && tubeNum <= 12) addSectionAnimation(loadedModel[i],51);
                }
            }
            else if(num > 12 && num <= 16){
                if(loadedModel[i].name == 'section-001') addSectionAnimation(loadedModel[i],210);
                if(loadedModel[i].name == 'section-002') addSectionAnimation(loadedModel[i],190);
                if(loadedModel[i].name == 'section-003') addSectionAnimation(loadedModel[i],170);
                if(loadedModel[i].name == 'section-004') addSectionAnimation(loadedModel[i],75);
                if(loadedModel[i].name.includes('Tube-')){
                    var tubeNum = parseInt(loadedModel[i].name.substring(5,8));
                    
                    if(tubeNum <= 4) addSectionAnimation(loadedModel[i],210);
                    else if(tubeNum > 4 && tubeNum <= 8) addSectionAnimation(loadedModel[i],190);
                    else if(tubeNum > 8 && tubeNum <= 12) addSectionAnimation(loadedModel[i],170);

                    else if(tubeNum > 12 && tubeNum <= 16) addSectionAnimation(loadedModel[i],75);
                }
            }
            else if(num > 16 && num <= 20){
                if(loadedModel[i].name == 'section-001') addSectionAnimation(loadedModel[i],240);
                if(loadedModel[i].name == 'section-002') addSectionAnimation(loadedModel[i],220);
                if(loadedModel[i].name == 'section-003') addSectionAnimation(loadedModel[i],200);
                if(loadedModel[i].name == 'section-004') addSectionAnimation(loadedModel[i],180);
                if(loadedModel[i].name == 'section-005') addSectionAnimation(loadedModel[i],100);
                if(loadedModel[i].name.includes('Tube-')){
                    var tubeNum = parseInt(loadedModel[i].name.substring(5,8));
                    
                    if(tubeNum <= 4) addSectionAnimation(loadedModel[i],240);
                    else if(tubeNum > 4 && tubeNum <= 8) addSectionAnimation(loadedModel[i],220);
                    else if(tubeNum > 8 && tubeNum <= 12) addSectionAnimation(loadedModel[i],200);
                    else if(tubeNum > 12 && tubeNum <= 16) addSectionAnimation(loadedModel[i],180);

                    else if(tubeNum > 16 && tubeNum <= 20) addSectionAnimation(loadedModel[i],100);
                }
            }
            if(loadedModel[i].name.includes('Tube-')){
                var tubeNum = parseInt(loadedModel[i].name.substring(5,8));
                if(tubeNum == num){
                    var tmpModel = loadedModel[i];
                    setTimeout(() => {
                        addIlluminateAnimation(tmpModel);
                    }, 1000);
                }
            }
        }
    }
})

document.getElementById('btn-reset').addEventListener('click',function(){
    location.reload();
})