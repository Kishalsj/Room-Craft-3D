
/*
 * Camera Buttons
 */

var CameraButtons = function(roomCraft3d) {

  var orbitControls = roomCraft3d.three.controls;
  var three = roomCraft3d.three;

  var panSpeed = 30;
  var directions = {
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4
  }

  function init() {
    // Camera controls
    $("#zoom-in").click(zoomIn);
    $("#zoom-out").click(zoomOut);  
    $("#zoom-in").dblclick(preventDefault);
    $("#zoom-out").dblclick(preventDefault);

    $("#reset-view").click(three.centerCamera)

    $("#move-left").click(function(){
      pan(directions.LEFT)
    })
    $("#move-right").click(function(){
      pan(directions.RIGHT)
    })
    $("#move-up").click(function(){
      pan(directions.UP)
    })
    $("#move-down").click(function(){
      pan(directions.DOWN)
    })

    $("#move-left").dblclick(preventDefault);
    $("#move-right").dblclick(preventDefault);
    $("#move-up").dblclick(preventDefault);
    $("#move-down").dblclick(preventDefault);
  }

  function preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function pan(direction) {
    switch (direction) {
      case directions.UP:
        orbitControls.panXY(0, panSpeed);
        break;
      case directions.DOWN:
        orbitControls.panXY(0, -panSpeed);
        break;
      case directions.LEFT:
        orbitControls.panXY(panSpeed, 0);
        break;
      case directions.RIGHT:
        orbitControls.panXY(-panSpeed, 0);
        break;
    }
  }

  function zoomIn(e) {
    e.preventDefault();
    orbitControls.dollyIn(1.1);
    orbitControls.update();
  }

  function zoomOut(e) {
    e.preventDefault;
    orbitControls.dollyOut(1.1);
    orbitControls.update();
  }

  init();
}

/*
 * Context menu for selected item
 */ 

var ContextMenu = function(roomCraft3d) {

  var scope = this;
  var selectedItem;
  var three = roomCraft3d.three;

  function init() {
    $("#context-menu-delete").click(function(event) {
        selectedItem.remove();
    });

    three.itemSelectedCallbacks.add(itemSelected);
    three.itemUnselectedCallbacks.add(itemUnselected);

    initResize();

    $("#fixed").click(function() {
        var checked = $(this).prop('checked');
        selectedItem.setFixed(checked);
    });
  }

  function cmToIn(cm) {
    return cm / 2.54;
  }

  function inToCm(inches) {
    return inches * 2.54;
  }

  function itemSelected(item) {
    selectedItem = item;

    $("#context-menu-name").text(item.metadata.itemName);

    $("#item-width").val(cmToIn(selectedItem.getWidth()).toFixed(0));
    $("#item-height").val(cmToIn(selectedItem.getHeight()).toFixed(0));
    $("#item-depth").val(cmToIn(selectedItem.getDepth()).toFixed(0));

    $("#context-menu").show();

    $("#fixed").prop('checked', item.fixed);
  }

  function resize() {
    selectedItem.resize(
      inToCm($("#item-height").val()),
      inToCm($("#item-width").val()),
      inToCm($("#item-depth").val())
    );
  }

  function initResize() {
    $("#item-height").change(resize);
    $("#item-width").change(resize);
    $("#item-depth").change(resize);
  }

  function itemUnselected() {
    selectedItem = null;
    $("#context-menu").hide();
  }

  init();
}

/*
 * Loading modal for items
 */

var ModalEffects = function(roomCraft3d) {

  var scope = this;
  var roomCraft3d = roomCraft3d;
  var itemsLoading = 0;

  this.setActiveItem = function(active) {
    itemSelected = active;
    update();
  }

  function update() {
    if (itemsLoading > 0) {
      $("#loading-modal").show();
    } else {
      $("#loading-modal").hide();
    }
  }

  function init() {
    roomCraft3d.model.scene.itemLoadingCallbacks.add(function() {
      itemsLoading += 1;
      update();
    });

     roomCraft3d.model.scene.itemLoadedCallbacks.add(function() {
      itemsLoading -= 1;
      update();
    });   

    update();
  }

  init();
}

/*
 * Side menu
 */

var SideMenu = function(roomCraft3d, floorplanControls, modalEffects) {
  var roomCraft3d = roomCraft3d;
  var floorplanControls = floorplanControls;
  var modalEffects = modalEffects;

  var ACTIVE_CLASS = "active";

  var tabs = {
    "FLOORPLAN" : $("#floorplan_tab"),
    "SHOP" : $("#items_tab"),
    "DESIGN" : $("#design_tab")
  }

  var scope = this;
  this.stateChangeCallbacks = $.Callbacks();

  this.states = {
    "DEFAULT" : {
      "div" : $("#viewer"),
      "tab" : tabs.DESIGN
    },
    "FLOORPLAN" : {
      "div" : $("#floorplanner"),
      "tab" : tabs.FLOORPLAN
    },
    "SHOP" : {
      "div" : $("#add-items"),
      "tab" : tabs.SHOP
    }
  }

  // sidebar state
  var currentState = scope.states.FLOORPLAN;

  function init() {
    for (var tab in tabs) {
      var elem = tabs[tab];
      elem.click(tabClicked(elem));
    }

    $("#update-floorplan").click(floorplanUpdate);

    initLeftMenu();

    roomCraft3d.three.updateWindowSize();
    handleWindowResize();

    initItems();

    setCurrentState(scope.states.DEFAULT);
  }

  function floorplanUpdate() {
    setCurrentState(scope.states.DEFAULT);
  }

  function tabClicked(tab) {
    return function() {
      // Stop three from spinning
      roomCraft3d.three.stopSpin();

      // Selected a new tab
      for (var key in scope.states) {
        var state = scope.states[key];
        if (state.tab == tab) {
          setCurrentState(state);
          break;
        }
      }
    }
  }
  
  function setCurrentState(newState) {

    if (currentState == newState) {
      return;
    }

    // show the right tab as active
    if (currentState.tab !== newState.tab) {
      if (currentState.tab != null) {
        currentState.tab.removeClass(ACTIVE_CLASS);          
      }
      if (newState.tab != null) {
        newState.tab.addClass(ACTIVE_CLASS);
      }
    }

    // set item unselected
    roomCraft3d.three.getController().setSelectedObject(null);

    // show and hide the right divs
    currentState.div.hide()
    newState.div.show()

    // custom actions
    if (newState == scope.states.FLOORPLAN) {
      floorplanControls.updateFloorplanView();
      floorplanControls.handleWindowResize();
    } 

    if (currentState == scope.states.FLOORPLAN) {
      roomCraft3d.model.floorplan.update();
    }

    if (newState == scope.states.DEFAULT) {
      roomCraft3d.three.updateWindowSize();
    }
 
    // set new state
    handleWindowResize();    
    currentState = newState;

    scope.stateChangeCallbacks.fire(newState);
  }

  function initLeftMenu() {
    $( window ).resize( handleWindowResize );
    handleWindowResize();
  }

  function handleWindowResize() {
    $(".sidebar").height(window.innerHeight);
    $("#add-items").height(window.innerHeight);

  };

  // TODO: this doesn't really belong here
  function initItems() {
    $("#add-items").find(".add-item").mousedown(function(e) {
      var modelUrl = $(this).attr("model-url");
      var itemType = parseInt($(this).attr("model-type"));
      var metadata = {
        itemName: $(this).attr("model-name"),
        resizable: true,
        modelUrl: modelUrl,
        itemType: itemType
      }

      roomCraft3d.model.scene.addItem(itemType, modelUrl, metadata);
      setCurrentState(scope.states.DEFAULT);
    });
  }

  init();

}

/*
 * Change floor and wall textures
 */

var TextureSelector = function (roomCraft3d, sideMenu) {

  var scope = this;
  var three = roomCraft3d.three;
  var isAdmin = isAdmin;

  var currentTarget = null;

  function initTextureSelectors() {
    $(".texture-select-thumbnail").click(function(e) {
      var textureUrl = $(this).attr("texture-url");
      var textureStretch = ($(this).attr("texture-stretch") == "true");
      var textureScale = parseInt($(this).attr("texture-scale"));
      currentTarget.setTexture(textureUrl, textureStretch, textureScale);

      e.preventDefault();
    });
  }

  function init() {
    three.wallClicked.add(wallClicked);
    three.floorClicked.add(floorClicked);
    three.itemSelectedCallbacks.add(reset);
    three.nothingClicked.add(reset);
    sideMenu.stateChangeCallbacks.add(reset);
    initTextureSelectors();
  }

  function wallClicked(halfEdge) {
    currentTarget = halfEdge;
    $("#floorTexturesDiv").hide();  
    $("#wallTextures").show();  
  }

  function floorClicked(room) {
    currentTarget = room;
    $("#wallTextures").hide();  
    $("#floorTexturesDiv").show();  
  }

  function reset() {
    $("#wallTextures").hide();  
    $("#floorTexturesDiv").hide();  
  }

  init();
}

/*
 * Floorplanner controls
 */

var ViewerFloorplanner = function(roomCraft3d) {

  var canvasWrapper = '#floorplanner';

  // buttons
  var move = '#move';
  var remove = '#delete';
  var draw = '#draw';

  var activeStlye = 'btn-primary disabled';

  this.floorplanner = roomCraft3d.floorplanner;

  var scope = this;

  function init() {

    $( window ).resize( scope.handleWindowResize );
    scope.handleWindowResize();

    // mode buttons
    scope.floorplanner.modeResetCallbacks.add(function(mode) {
      $(draw).removeClass(activeStlye);
      $(remove).removeClass(activeStlye);
      $(move).removeClass(activeStlye);
      if (mode == BP3D.Floorplanner.floorplannerModes.MOVE) {
          $(move).addClass(activeStlye);
      } else if (mode == BP3D.Floorplanner.floorplannerModes.DRAW) {
          $(draw).addClass(activeStlye);
      } else if (mode == BP3D.Floorplanner.floorplannerModes.DELETE) {
          $(remove).addClass(activeStlye);
      }

      if (mode == BP3D.Floorplanner.floorplannerModes.DRAW) {
        $("#draw-walls-hint").show();
        scope.handleWindowResize();
      } else {
        $("#draw-walls-hint").hide();
      }
    });

    $(move).click(function(){
      scope.floorplanner.setMode(BP3D.Floorplanner.floorplannerModes.MOVE);
    });

    $(draw).click(function(){
      scope.floorplanner.setMode(BP3D.Floorplanner.floorplannerModes.DRAW);
    });

    $(remove).click(function(){
      scope.floorplanner.setMode(BP3D.Floorplanner.floorplannerModes.DELETE);
    });
  }

  this.updateFloorplanView = function() {
    scope.floorplanner.reset();
  }

  this.handleWindowResize = function() {
    $(canvasWrapper).height(window.innerHeight - $(canvasWrapper).offset().top);
    scope.floorplanner.resizeView();
  };

  init();
}; 

var mainControls = function(roomCraft3d) {
  var roomCraft3d = roomCraft3d;

  function newDesign() {
    roomCraft3d.model.loadSerialized('{"floorplan":{"corners":{"f90da5e3-9e0e-eba7-173d-eb0b071e838e":{"x":204.85099999999989,"y":289.052},"da026c08-d76a-a944-8e7b-096b752da9ed":{"x":672.2109999999999,"y":289.052},"4e3d65cb-54c0-0681-28bf-bddcc7bdb571":{"x":672.2109999999999,"y":-178.308},"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2":{"x":204.85099999999989,"y":-178.308}},"walls":[{"corner1":"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2","corner2":"f90da5e3-9e0e-eba7-173d-eb0b071e838e","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"f90da5e3-9e0e-eba7-173d-eb0b071e838e","corner2":"da026c08-d76a-a944-8e7b-096b752da9ed","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"da026c08-d76a-a944-8e7b-096b752da9ed","corner2":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","corner2":"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}}],"wallTextures":[],"floorTextures":{},"newFloorTextures":{}},"items":[]}');
  }

  function loadDesign() {
    files = $("#loadFile").get(0).files;
    var reader  = new FileReader();
    reader.onload = function(event) {
        var data = event.target.result;
        roomCraft3d.model.loadSerialized(data);
    }
    reader.readAsText(files[0]);
  }

  function saveDesign() {
    var data = roomCraft3d.model.exportSerialized();
    var a = window.document.createElement('a');
    var blob = new Blob([data], {type : 'text'});
    a.href = window.URL.createObjectURL(blob);
    a.download = 'design.roomCraft3d';
    document.body.appendChild(a)
    a.click();
    document.body.removeChild(a)
  }

  function init() {
    $("#new").click(newDesign);
    $("#loadFile").change(loadDesign);
    $("#saveFile").click(saveDesign);
  }

  init();
}

/*
 * Initialize!
 */

$(document).ready(function() {

  // main setup
  var opts = {
    floorplannerElement: 'floorplanner-canvas',
    threeElement: '#viewer',
    threeCanvasElement: 'three-canvas',
    textureDir: "models/textures/",
    widget: false
  };
  
  var roomCraft3d = new BP3D.roomCraft3d(opts);

  var modalEffects = new ModalEffects(roomCraft3d);
  var viewerFloorplanner = new ViewerFloorplanner(roomCraft3d);
  var contextMenu = new ContextMenu(roomCraft3d);
  var sideMenu = new SideMenu(roomCraft3d, viewerFloorplanner, modalEffects);
  var textureSelector = new TextureSelector(roomCraft3d, sideMenu);        
  var cameraButtons = new CameraButtons(roomCraft3d);
  mainControls(roomCraft3d);

  // Load full floorplan + items
  roomCraft3d.model.loadSerialized(`{
    "floorplan": {
      "corners": {
        "f90da5e3-9e0e-eba7-173d-eb0b071e838e": {"x":204.85099999999989,"y":289.052},
        "da026c08-d76a-a944-8e7b-096b752da9ed": {"x":672.2109999999999,"y":289.052},
        "4e3d65cb-54c0-0681-28bf-bddcc7bdb571": {"x":672.2109999999999,"y":-300.2279999999997},
        "71d4f128-ae80-3d58-9bd2-711c6ce6cdf2": {"x":204.85099999999989,"y":-300.2279999999997},
        "bf8a77c3-ba6a-4b57-87aa-a0637284d376": {"x":672.2109999999999,"y":289.052},
        "11564cdd-a3b4-657a-0d4d-31d8339f5cdc": {"x":1139.5709999999997,"y":289.052},
        "a1a74683-d6cc-3344-8a1f-c1f154af8315": {"x":1139.5709999999997,"y":-123.44400000000007},
        "ae47d589-e110-b102-001d-cb5c6a16a804": {"x":672.2109999999999,"y":-123.44400000000007},
        "943248b8-4484-3f46-4ec6-ed9e2f3cdd08": {"x":204.85099999999989,"y":-245.36399999999986},
        "6fc93dad-a21a-ccce-535c-2e8b1b8ab887": {"x":491.3629999999998,"y":-245.36399999999986},
        "c5dce5d5-451c-91aa-b42f-9ec54c433326": {"x":672.2109999999999,"y":-123.44400000000007}
      },
      "walls": [
        {"corner1":"943248b8-4484-3f46-4ec6-ed9e2f3cdd08","corner2":"f90da5e3-9e0e-eba7-173d-eb0b071e838e","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},
        {"corner1":"f90da5e3-9e0e-eba7-173d-eb0b071e838e","corner2":"bf8a77c3-ba6a-4b57-87aa-a0637284d376","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},
        {"corner1":"bf8a77c3-ba6a-4b57-87aa-a0637284d376","corner2":"c5dce5d5-451c-91aa-b42f-9ec54c433326","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},
        {"corner1":"bf8a77c3-ba6a-4b57-87aa-a0637284d376","corner2":"11564cdd-a3b4-657a-0d4d-31d8339f5cdc","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300}},
        {"corner1":"11564cdd-a3b4-657a-0d4d-31d8339f5cdc","corner2":"a1a74683-d6cc-3344-8a1f-c1f154af8315","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},
        {"corner1":"a1a74683-d6cc-3344-8a1f-c1f154af8315","corner2":"c5dce5d5-451c-91aa-b42f-9ec54c433326","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300}},
        {"corner1":"943248b8-4484-3f46-4ec6-ed9e2f3cdd08","corner2":"6fc93dad-a21a-ccce-535c-2e8b1b8ab887","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},
        {"corner1":"6fc93dad-a21a-ccce-535c-2e8b1b8ab887","corner2":"c5dce5d5-451c-91aa-b42f-9ec54c433326","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}}
      ],
      "wallTextures": [],
      "floorTextures": {},
      "newFloorTextures": {}
    },
    "items": [
      {"item_name":"Sofa - Grey","item_type":1,"model_url":"models/js/cb-rochelle-gray_baked.js","xpos":272.28391973435595,"ypos":42.54509923821,"zpos":26.0532449773508,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},
      {"item_name":"Blue Chair","item_type":1,"model_url":"models/js/ik-ekero-blue_baked.js","xpos":349.7197140655878,"ypos":37.500000370129,"zpos":213.31689554182265,"rotation":2.3586211872565435,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},
      {"item_name":"Media Console - White","item_type":1,"model_url":"models/js/cb-clapboard_baked.js","xpos":555.7038768896238,"ypos":67.88999754395999,"zpos":-142.86701031565056,"rotation":-0.5846709919900669,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},
      {"item_name":"Floor Lamp","item_type":1,"model_url":"models/js/ore-3legged-white_baked.js","xpos":248.8165660452896,"ypos":72.163997943445,"zpos":-185.03558527545306,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},
      {"item_name":"Coffee Table - Wood","item_type":1,"model_url":"models/js/ik-stockholmcoffee-brown.js","xpos":382.38302479936743,"ypos":24.01483158034958,"zpos":33.989089425356156,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},
      {"item_name":"Blue Rug","item_type":8,"model_url":"models/js/cb-blue-block-60x96.js","xpos":999.5652196490498,"ypos":0.250005,"zpos":-16.582092471876194,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},
      {"item_name":"Full Bed","item_type":1,"model_url":"models/js/ik_nordli_full.js","xpos":1000.5382757878274,"ypos":50,"zpos":-21.028070651824578,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},
      {"item_name":"NYC Poster","item_type":2,"model_url":"models/js/nyc-poster2.js","xpos":1133.3172946043744,"ypos":143.3021825939055,"zpos":177.17301882153998,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},
      {"item_name":"NYC Poster","item_type":2,"model_url":"models/js/nyc-poster2.js","xpos":211.10474824230533,"ypos":137.51922251253393,"zpos":210.80044316823194,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},
      {"item_name":"Open Door","item_type":7,"model_url":"models/js/open_door.js","xpos":671.7109985351562,"ypos":110.800000297771,"zpos":187.49972927278122,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},
      {"item_name":"Window","item_type":3,"model_url":"models/js/whitewindow.js","xpos":342.29329052648166,"ypos":140.4843564567991,"zpos":-244.86399841308594,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},
      {"item_name":"Window","item_type":3,"model_url":"models/js/whitewindow.js","xpos":902.7061055011609,"ypos":139.96806947340497,"zpos":-122.94400024414062,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},
      {"item_name":"Dresser - White","item_type":1,"model_url":"models/js/we-narrow6white_baked.js","xpos":1077.4399553688468,"ypos":35.611997646165,"zpos":191.03622727867685,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},
      {"item_name":"Bookshelf","item_type":1,"model_url":"models/js/cb-kendallbookcasewalnut_baked.js","xpos":508.54807426346065,"ypos":92.17650034119151,"zpos":262.60488947241697,"rotation":3.141592653589793,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},
      {"item_name":"Bedside table - White","item_type":1,"model_url":"models/js/cb-archnight-white_baked.js","xpos":718.4672566703895,"ypos":31.15939942141,"zpos":-67.18352469772904,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false},
      {"item_name":"Red Chair","item_type":1,"model_url":"models/js/ik-ekero-orange_baked.js","xpos":800.7117456030446,"ypos":37.50235073007,"zpos":-60.76729757988409,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false}
    ]
  }`);

});

