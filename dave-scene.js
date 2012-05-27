/*
 @author derickson
 Messing around with SceneJS

 
 */

// define the scene
SceneJS.createScene({
    type: "scene",
    id: "theScene",
    canvasId: "theCanvas",
    loggingElementId: "theLoggingDiv",

    flags: {
        backfaces: false
    },

    nodes: [
        {
            type: "lookAt",
			id: "look",
            eye : { x: 25.0, y: 25.0, z: 10.0 },
            look : { x: -5, y:0.0, z:-5 },
            up : { y: 1.0 },

            nodes: [
                {
                    type: "camera",
                    optics: {
                        type: "perspective",
                        fovy : 25.0,
                        aspect : 2.0,
                        near : 0.10,
                        far : 300.0
                    },

                    nodes: [

                        {
                            type: "light",
                            mode:                   "dir",
                            color:                  { r: 0.5, g: 0.2, b: 0.5 },
                            dir: {  x: 1, y: 1, z: 1 }
                        },
                        {
                            type: "light",
                            mode:                   "dir",
                            color:                  { r: 0.5, g: 0.5, b: 0.2 },
                            dir: {  x: 1, y: -1, z: -1 }
                        },
                        {
                            type: "light",
                            mode:                   "dir",
                            color:                  { r: 0.2, g: 5.0, b: 5.0 },
                            dir: {  x: -1, y: -0.2, z: -1 },
                        },


                        {
                            type: "rotate",
                            id: "pitch",
                            angle: 0.0,
                            x : 1.0,

                            nodes: [
                                {
                                    type: "rotate",
                                    id: "yaw",
                                    angle: 0.0,
                                    y : 1.0
                                	/*
									nodes: [{ 
										type: "material", 
					                    baseColor:      { r: 1.0, g: 1.0, b: 1.0 },
					                    specularColor:  { r: 0.4, g: 0.4, b: 0.4 },
					                    specular:       0.2,
					                    shine:          6.0,
					                    emit: 0.1,
										nodes: [{type: "teapot"}]
									}]
									*/
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});


// library for mutating scene

var chart3D = {
    addToScene: function(data) {
        SceneJS.Message.sendMessage( {
            command: "update",
            target: "yaw",
            insert: { 
              node: data
            } 
        });
    },
    
    removeFromScene: function(item, container) {
        SceneJS.Message.sendMessage({
            command:"update",
            target:container,
            remove:{node: item}
        })
    },
    
    addToScene: function(data) {
        SceneJS.Message.sendMessage( {
            command: "update",
            target: "yaw",
            add: { 
              node: data
            } 
        });
    },
    
    addBox: function(yScale, xPos, zPos) {
        var data = this.genBox(yScale, xPos, zPos);
        this.addToScene ( data );
    },
    
    addBoxNamed: function(myId, yScale, xPos, zPos) {
    
        var data = this.genBoxNamed(myId, yScale, xPos, zPos);
        this.addToScene ( data );
        
    },
    
    genBox: function(yScale, xPos, zPos) {
        return {
            type: "translate",
            
            x: xPos * 1.5,
            z: zPos * 1.5,
            
            nodes: [{
            
                type: "scale",

                x: 1.0,
                y: yScale,
                z: 1.0,    // Default is 0.0

                nodes: [{

                    type: "material", 
                    baseColor:      { r: 1.0, g: 1.0, b: 1.0 },
                    specularColor:  { r: 0.4, g: 0.4, b: 0.4 },
                    specular:       0.2,
                    shine:          6.0,
                    emit: 0.1,

                    nodes: [ this.box ]// end material
                }]//end scale
            }]//end translate
        }//end object
    }, //end function
    
    genBoxNamed: function(myId, yScale, xPos, zPos) {
        return {
            type: "translate",
            id: myId,
            
            x: xPos * 1.5,
            z: zPos * 1.5,
            
            nodes: [{
            
                type: "scale",

                x: 1.0,
                y: yScale,
                z: 1.0,    // Default is 0.0

                nodes: [{

                    type: "material", 
                    baseColor:      { r: 1.0, g: 1.0, b: 1.0 },
                    specularColor:  { r: 0.4, g: 0.4, b: 0.4 },
                    specular:       0.2,
                    shine:          6.0,
                    emit: 0.1,

                    nodes: [ this.box ]// end material
                }]//end scale
            }]//end translate
        }//end object
    }, //end function

    box: {
        //type: "teapot",
        type: "geometry",

        // Optional geometry core ID. If some other geometry node with this core
        // has previously been defined in the scene graph then this geometry will just
        // re-use the geometry buffers (IE. vertex buffers etc.) that were created for that.

        coreId: "cube_1_1_1",   // Optional

        // Primitive type - "points", "lines", "line-loop", "line-strip", "triangles",
        // "triangle-strip" or "triangle-fan".

        primitive: "triangles",

        // 3D positions - eight for our cube, each one spanning three array elements for X,Y and Z.

        positions : [

            0.5, 1, 0.5,   -0.5, 1, 0.5,  -0.5, 0, 0.5,   0.5, 0, 0.5,    // v0-v3-v4-v5 right
            0.5, 1, 0.5,    0.5, 0, 0.5,   0.5, 0,-0.5,   0.5, 1,-0.5,      // v0-v3-v4-v5 front
            0.5, 1, 0.5,    0.5, 1,-0.5,  -0.5, 1,-0.5,  -0.5, 1, 0.5,   // v0-v5-v6-v1 top
            -0.5, 1, 0.5,  -0.5, 1,-0.5,  -0.5, 0,-0.5,  -0.5, 0, 0.5, // v1-v6-v7-v2 left
            -0.5, 0,-0.5,   0.5, 0,-0.5,   0.5, 0, 0.5,  -0.5, 0, 0.5,   // v7-v4-v3-v2 bottom
             0.5, 0,-0.5,  -0.5, 0,-0.5,  -0.5, 1,-0.5,   0.5, 1,-0.5    // v4-v7-v6-v5 back
         ],

         // Optional normal vectors, one for each vertex. If you omit these, then the
         // geometry will not be shaded.

         normals : [

            0, 0, -1, 0, 0, -1, 0, 0, -1,0, 0, -1,  // v0-v1-v2-v3 right
            -1, 0, 0,-1, 0, 0, -1, 0, 0,-1, 0, 0,   // v0-v3-v4-v5 front
            0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, // v0-v5-v6-v1 top
            1,  0, 0, 1, 0, 0,1, 0, 0, 1, 0, 0,     // v1-v6-v7-v2 left
            0,  1, 0, 0,1, 0, 0,1, 0, 0,1, 0,       // v7-v4-v3-v2 bottom
            0,  0,1, 0, 0,1, 0, 0,1, 0, 0,1         // v4-v7-v6-v5 back
         ],

         // Optional 2D texture coordinates corresponding to the 3D  positions defined above - eight
         // for our cube, each one spanning two array elements for X and Y. If you omit these,
         // then the geometry will not be textured.

         uv : [

             1, 1, 0, 1, 0, 0, 1, 0, // v0-v1-v2-v3 right
             0, 1, 0, 0, 1, 0, 1, 1, // v0-v3-v4-v5 front
             1, 0, 1, 1, 0, 1, 0, 0, // v0-v5-v6-v1 top
             1, 1, 0, 1, 0, 0, 1, 0, // v1-v6-v7-v2 left
             0, 0, 1, 0, 1, 1, 0, 1, // v7-v4-v3-v2 bottom
             0, 0, 1, 0, 1, 1, 0, 1  // v4-v7-v6-v5 back
         ],

         // Optional coordinates for a second UV layer - just to illustrate their availability

         uv2 : [
         ],

         // Mandatory indices - these organise the positions, normals and uv texture coordinates
         // into geometric primitives in accordance with the "primitive" parameter, in this case a
         // set of three indices for each triangle.
         // Note that each triangle in this example is specified in counter-clockwise winding order.
         // You can specify them in clockwise order if you configure the renderer node's frontFace
         // property as "cw", instead of the default "ccw".

         indices : [

               0, 1, 2, 0, 2, 3,   // Right
               4, 5, 6, 4, 6, 7,   // Front
               8, 9,10, 8,10,11,   // Top
               12,13,14, 12,14,15, // Left
               16,17,18, 16,18,19, // Bottom
               20,21,22, 20,22,23  // Back
        ]
    
    }
    
};




var scene = SceneJS.scene("theScene");
var pitchRotate = scene.findNode("pitch");
var yawRotate = scene.findNode("yaw");
var canvas = document.getElementById("theCanvas");


var pitch = 0;
var yaw = 0;
var lastX;
var lastY;
var dragging = false;


function mouseDown(event) {
    lastX = event.clientX;
    lastY = event.clientY;
    dragging = true;
}

function touchStart(event) {
    lastX = event.targetTouches[0].clientX;
    lastY = event.targetTouches[0].clientY;
    dragging = true;
}

function mouseUp() {
    dragging = false;
}

function touchEnd() {
    dragging = false;
}

function mouseMove(event) {
    var posX = event.clientX;
    var posY = event.clientY;
    actionMove(posX,posY);
}

function touchMove(event) {
    var posX = event.targetTouches[0].clientX;
    var posY = event.targetTouches[0].clientY;
    actionMove(posX,posY);
}

// On a mouse/touch drag, we'll re-render the scene, passing in
// incremented angles in each time.
//
function actionMove(posX, posY) {
    if (dragging) {
        yaw += (posX - lastX) * 0.5;
        pitch += (posY - lastY) * -0.5;

        lastX = posX;
        lastY = posY;

        pitchRotate.set("angle", pitch);
        yawRotate.set("angle", yaw);
    }
}

canvas.addEventListener('mousedown', mouseDown, true);
canvas.addEventListener('mousemove', mouseMove, true);
canvas.addEventListener('mouseup', mouseUp, true);
canvas.addEventListener('touchstart', touchStart, true);
canvas.addEventListener('touchmove', touchMove, true);
canvas.addEventListener('touchend', touchEnd, true);


scene.start();
/*
chart3D.addBox(1, -1, -1);
chart3D.addBox(2, -1, -2);
chart3D.addBox(3, -1 , -3);
chart3D.addBox(4, -1 , -4);
chart3D.addBox(5, -1 , -5);
chart3D.addBox(6, -1 , -6);*/

for (var row = 0; row < 5; row += 1){
	for( var col = 0; col < 5; col += 1) {
		chart3D.addBox( (1 + (0.5 * row) + col), (-1 * row) , (-1 * col));
	}
}
