///======== Main CONTROLLER ======///

function StylePalette($scope) {

  Parse.initialize("pVfYSK9d0z9LAjRjZrsuI6xD6syARB0etxUsuIKa", "W5zfofkBacsALa1kcYkiYoXRmaKPoX1JbWXQWczb");
  var Brands = Parse.Object.extend("Brands");
  var query = new Parse.Query(Brands);

  //Read
  function getBrands() {



    $.ajax({
      type: 'GET',
      contentType: "application/json",
      headers: {'X-Parse-Application-Id':'pVfYSK9d0z9LAjRjZrsuI6xD6syARB0etxUsuIKa','X-Parse-REST-API-Key':'ieX55lb5v7PYce2WDxOCpXoCwaBYU8ALBu8n4HEG'},
      url: "https://api.parse.com/1/classes/Brands",
      data: 'order=name',
      success: function(data){
          $scope.$apply(function(){ //necessary to $apply the changes
              $scope.brands = data;
               console.log("Brands Loaded" );
          });
      },
      error: function(data) {

        console.log("Brand Load Failed" );
      }
    });


  }

  getBrands();

  //Create
  $scope.addBrands = function() {

    $.ajax({
      type: 'POST',
      contentType: "application/json",
      headers: {'X-Parse-Application-Id':'pVfYSK9d0z9LAjRjZrsuI6xD6syARB0etxUsuIKa','X-Parse-REST-API-Key':'ieX55lb5v7PYce2WDxOCpXoCwaBYU8ALBu8n4HEG'},
      url: "https://api.parse.com/1/classes/Brands",
      data: JSON.stringify({     
        name : $scope.brand.name           
    }),
      success: function(data) {
         $scope.brand.name = "";
         getBrands();
      console.log('Brand Added' );
      },
      error: function(data) {
        console.log("Brand Add Failed" );
      }
    });

  };

 

  

  //Update
  $scope.updateBrands = function(brand) {

    var colorText = SetTextColor(brand.bg_color);

  $.ajax({
      type: 'PUT',
      contentType: "application/json",
      headers: {'X-Parse-Application-Id':'pVfYSK9d0z9LAjRjZrsuI6xD6syARB0etxUsuIKa','X-Parse-REST-API-Key':'ieX55lb5v7PYce2WDxOCpXoCwaBYU8ALBu8n4HEG'},
      url: "https://api.parse.com/1/classes/Brands/"+brand.objectId,
      data: JSON.stringify({
        name : brand.name,
        bg_color: brand.bg_color,
        bg_gradient: brand.bg_gradient,
        bg_endcolor: brand.bg_endcolor,
        colorText: colorText
    }),
      success: function(data) {
      console.log('Brand Updated' );
      
      },
      error: function(data) {

        console.log("Brand Update Failed" );
      }
    });

  };

  //Delete
 $scope.deleteBrands = function(brand) {
    
    // Get and delete all the brand colors
    $.ajax({
      type: 'GET',
      contentType: "application/json; charset=utf-8",
       crossDomain : true, 
      headers: {'X-Parse-Application-Id':'pVfYSK9d0z9LAjRjZrsuI6xD6syARB0etxUsuIKa','X-Parse-REST-API-Key':'ieX55lb5v7PYce2WDxOCpXoCwaBYU8ALBu8n4HEG'},
      url: "https://api.parse.com/1/classes/Colors",
      //data: 'where={"colorVal":"'+encodeURIComponent('#0000ff')+'"}',
      data: 'where={"parentBrand":{"__type":"Pointer","className":"_Brands","objectId":"'+brand.objectId+'"}}',

      success: function(data) {
        console.log(data);
        for (i = 0; i < data.results.length; i++) {
          //console.log(data.results[i]);
          //data.results[i].destroy({});

          $.ajax({
              type: 'DELETE',
              contentType: "application/json",
              headers: {'X-Parse-Application-Id':'pVfYSK9d0z9LAjRjZrsuI6xD6syARB0etxUsuIKa','X-Parse-REST-API-Key':'ieX55lb5v7PYce2WDxOCpXoCwaBYU8ALBu8n4HEG'},
              url: "https://api.parse.com/1/classes/Colors/"+data.results[i].objectId,
              success: function(data) {
                console.log('Brand Color Deleted' );
              },
              error: function(data) {
                console.log("Brand Color Delete Failed" );
              }
            });
         
        }

      console.log('Brand Colors Deleted');
         
      },
      error: function(data) {

        alert("Brand Colors Delete Failed" );
      }
    });

    // Get and delete all the brand Buttons
     $.ajax({
      type: 'GET',
      contentType: "application/json; charset=utf-8",
       crossDomain : true, 
      headers: {'X-Parse-Application-Id':'pVfYSK9d0z9LAjRjZrsuI6xD6syARB0etxUsuIKa','X-Parse-REST-API-Key':'ieX55lb5v7PYce2WDxOCpXoCwaBYU8ALBu8n4HEG'},
      url: "https://api.parse.com/1/classes/Buttons",
      //data: 'where={"colorVal":"'+encodeURIComponent('#0000ff')+'"}',
      data: 'where={"parentBrand":{"__type":"Pointer","className":"_Brands","objectId":"'+brand.objectId+'"}}',

      success: function(data) {
        console.log(data);
        for (i = 0; i < data.results.length; i++) {
          //console.log(data.results[i]);
          //data.results[i].destroy({});

          $.ajax({
              type: 'DELETE',
              contentType: "application/json",
              headers: {'X-Parse-Application-Id':'pVfYSK9d0z9LAjRjZrsuI6xD6syARB0etxUsuIKa','X-Parse-REST-API-Key':'ieX55lb5v7PYce2WDxOCpXoCwaBYU8ALBu8n4HEG'},
              url: "https://api.parse.com/1/classes/Buttons/"+data.results[i].objectId,
              success: function(data) {
                console.log('Brand Button Deleted' );
              },
              error: function(data) {
                console.log("Brand Button Delete Failed" );
              }
            });
         
        }

      console.log('Brand Buttons Deleted');
         
      },
      error: function(data) {

        alert("Brand Buttons Delete Failed" );
      }
    });

  $.ajax({
              type: 'DELETE',
              contentType: "application/json",
              headers: {'X-Parse-Application-Id':'pVfYSK9d0z9LAjRjZrsuI6xD6syARB0etxUsuIKa','X-Parse-REST-API-Key':'ieX55lb5v7PYce2WDxOCpXoCwaBYU8ALBu8n4HEG'},
              url: "https://api.parse.com/1/classes/Brands/"+brand.objectId,
              success: function(data) {
                console.log('Brand = Deleted' );
                getBrands();
              },
              error: function(data) {
                console.log("Brand = Delete Failed" );
              }
      });

  };

  

  function SetTextColor(hexcolor){

    console.log('keyup works');

    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hexcolor = hexcolor.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexcolor);

    var red = parseInt(result[1], 16);
    var green = parseInt(result[2], 16);
    var blue = parseInt(result[3], 16);


  var brightness;
  brightness = (red * 299) + (green * 587) + (blue * 114);
  brightness = brightness / 255000;

  if (brightness >= 0.5) {
    $scope.NewTextColor = "blue";
    return 'black';
  } else {
    $scope.NewTextColor = "green";
    return 'white';
  }
    
}


  
}//End Scope

///======== COLOR CONTROLLER ======///

function ColorPalette($scope) {

 var thisParentBrand = $scope.brand.objectId;

 //Read
  function getColors() {

    $.ajax({
      type: 'GET',
      contentType: "application/json",
      headers: {'X-Parse-Application-Id':'pVfYSK9d0z9LAjRjZrsuI6xD6syARB0etxUsuIKa','X-Parse-REST-API-Key':'ieX55lb5v7PYce2WDxOCpXoCwaBYU8ALBu8n4HEG'},
      url: "https://api.parse.com/1/classes/Colors",
      data: 'where={"parentBrand":{"__type":"Pointer","className":"_Brands","objectId":"'+thisParentBrand+'"}};order=-createdAt',

      success: function(data){

          $scope.$apply(function(){ //necessary to $apply the changes
              $scope.colors = data;
              console.log("Colors Loaded" );
          });
      },
      error: function(data) {

        console.log("Color Load Failed" );
      }
    });
  }

  getColors();
  



  // Create Colors

  $scope.addColors = function(brand,colorVal,ColorVariable) {


    var RGBaVal = colors.toRgb(colorVal);
    var HexVal = colors.toHex(colorVal);

    

    $.ajax({
      type: 'POST',
      contentType: "application/json",
      headers: {'X-Parse-Application-Id':'pVfYSK9d0z9LAjRjZrsuI6xD6syARB0etxUsuIKa','X-Parse-REST-API-Key':'ieX55lb5v7PYce2WDxOCpXoCwaBYU8ALBu8n4HEG'},
      url: "https://api.parse.com/1/classes/Colors",
      data: JSON.stringify({
        ColorVariable : ColorVariable,
        colorVal : HexVal,
        RGBaVal : RGBaVal,
        parentBrand: {
                "__type": "Pointer",
                "className": "_Brands",
                "objectId": brand.objectId
            },
        parent_brand: brand.name
        
    }),
      success: function(data) {
        console.log('Color Added' );
        getColors();
        
      },
      error: function(data) {
        console.log("Color Add Failed" );
      }
    });

    //

  };

  

  //  Update

  $scope.updateColors = function(NewColorVal,NewColorVariable,color) {

    console.log(NewColorVal);

    var RGBaVal = colors.toRgb(NewColorVal);
    var HexVal = colors.toHex(NewColorVal);

    console.log(RGBaVal);
    console.log(HexVal);

  $.ajax({
      type: 'PUT',
      contentType: "application/json",
      headers: {'X-Parse-Application-Id':'pVfYSK9d0z9LAjRjZrsuI6xD6syARB0etxUsuIKa','X-Parse-REST-API-Key':'ieX55lb5v7PYce2WDxOCpXoCwaBYU8ALBu8n4HEG'},
      url: "https://api.parse.com/1/classes/Colors/"+color.objectId,
      data: JSON.stringify({     
        ColorVariable : NewColorVariable,
        colorVal : HexVal,
        RGBaVal : RGBaVal        
    }),
      success: function(data) {
        getColors();
        getBrands();
        console.log("Color Updated" );
      },
      error: function(data) {
        console.log("Color Update Failed" );
      }
    });

  };

  // Delete

  $scope.deleteColors = function(color) {

  $.ajax({
      type: 'DELETE',
      contentType: "application/json",
      headers: {'X-Parse-Application-Id':'pVfYSK9d0z9LAjRjZrsuI6xD6syARB0etxUsuIKa','X-Parse-REST-API-Key':'ieX55lb5v7PYce2WDxOCpXoCwaBYU8ALBu8n4HEG'},
      url: "https://api.parse.com/1/classes/Colors/"+color.objectId,
      success: function(data) {
        getColors();
        console.log("Color Deleted" );
      },
      error: function(data) {
        console.log("Color Delete Failed" );
      }
    });

  //

  };





   
}//End Scope

///======== BUTTONS CONTROLLER ======///

function ButtonPalette($scope) {

 var thisParentBrand = $scope.brand.objectId;

 //Read
  function getButtons() {

    $.ajax({
      type: 'GET',
      contentType: "application/json",
      headers: {'X-Parse-Application-Id':'pVfYSK9d0z9LAjRjZrsuI6xD6syARB0etxUsuIKa','X-Parse-REST-API-Key':'ieX55lb5v7PYce2WDxOCpXoCwaBYU8ALBu8n4HEG'},
      url: "https://api.parse.com/1/classes/Buttons",
      data: 'where={"parentBrand":{"__type":"Pointer","className":"_Brands","objectId":"'+thisParentBrand+'"}};order=-createdAt',

      success: function(data){

          $scope.$apply(function(){ //necessary to $apply the changes
              $scope.buttons = data;
              console.log("Button Loaded" );
          });
      },
      error: function(data) {

        console.log("Button Load Failed" );
      }
    });
  }

  getButtons();
  



  // Create Colors

  $scope.addButtons = function(brand,BTNheight,BTNwidth,BTNbackground,BTNcolor,BTNborder_radius,BTNborder,BTNbox_shadow,BTNpadding) {


    console.log(BTNheight,BTNwidth,BTNbackground,BTNcolor,BTNborder_radius,BTNborder,BTNbox_shadow,BTNpadding);
    //var RGBaVal = colors.toRgb(BTNcolor);
   // var HexVal = colors.toHex(BTNcolor);

    

    $.ajax({
      type: 'POST',
      contentType: "application/json",
      headers: {'X-Parse-Application-Id':'pVfYSK9d0z9LAjRjZrsuI6xD6syARB0etxUsuIKa','X-Parse-REST-API-Key':'ieX55lb5v7PYce2WDxOCpXoCwaBYU8ALBu8n4HEG'},
      url: "https://api.parse.com/1/classes/Buttons",
      data: JSON.stringify({
        button_height: BTNheight,
        button_width: BTNwidth,
        button_background: BTNbackground,
        button_text: BTNcolor,
        button_radius: BTNborder_radius,
        button_border: BTNborder,
        button_shadow: BTNbox_shadow,
        button_padding: BTNpadding,
        parentBrand: {
                "__type": "Pointer",
                "className": "_Brands",
                "objectId": brand.objectId
            },
        parent_brand: brand.name
        
    }),
      success: function(data) {
        console.log('Button Added' );
        getButtons();
        
      },
      error: function(data) {
        console.log("Button Add Failed" );
      }
    });

    //

  };

  

  //  Update

  $scope.updateButtons = function(NewColorVal,color) {

    var RGBaVal = colors.toRgb(NewColorVal);
    var HexVal = colors.toHex(NewColorVal);

  $.ajax({
      type: 'PUT',
      contentType: "application/json",
      headers: {'X-Parse-Application-Id':'pVfYSK9d0z9LAjRjZrsuI6xD6syARB0etxUsuIKa','X-Parse-REST-API-Key':'ieX55lb5v7PYce2WDxOCpXoCwaBYU8ALBu8n4HEG'},
      url: "https://api.parse.com/1/classes/Buttons/"+button.objectId,
      data: JSON.stringify({     
        colorVal : HexVal,
        RGBaVal : RGBaVal        
    }),
      success: function(data) {
        getColors();
        console.log("Button Updated" );
      },
      error: function(data) {
        console.log("Button Update Failed" );
      }
    });

  };

  // Delete

  $scope.deleteButtons = function(color) {

  $.ajax({
      type: 'DELETE',
      contentType: "application/json",
      headers: {'X-Parse-Application-Id':'pVfYSK9d0z9LAjRjZrsuI6xD6syARB0etxUsuIKa','X-Parse-REST-API-Key':'ieX55lb5v7PYce2WDxOCpXoCwaBYU8ALBu8n4HEG'},
      url: "https://api.parse.com/1/classes/Buttons/"+button.objectId,
      success: function(data) {
        getColors();
        console.log("Button Deleted" );
      },
      error: function(data) {
        console.log("Button Delete Failed" );
      }
    });

  //

  };





   
}//End Scope

function FontPalette($scope) {
}//End Scope

// function buildRGB(hexcolor) {
//    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
//     hexcolor = hexcolor.replace(shorthandRegex, function(m, r, g, b) {
//         return r + r + g + g + b + b;
//     });

//     var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexcolor);

//     var red = parseInt(result[1], 16);
//     var green = parseInt(result[2], 16);
//     var blue = parseInt(result[3], 16);

//      return {
//         red: red,
//         green: green,
//         blue: blue
//     }; 
  
// }

// function SetTextColor(hexcolor){

//   var rgb = buildRGB(hexcolor);

//   var red = rgb.red;
//   var green = rgb.green;
//   var blue = rgb.blue;

//   var brightness;
//   brightness = (red * 299) + (green * 587) + (blue * 114);
//   brightness = brightness / 255000;

//   return brightness;
    
// }





// function getContrast50(hexcolor){

//   //hexstring = hexcolor.toString(16);
//   var textchange = ((hexcolor > 0xffffff/2) ? 'white':'black');
//   alert(textchange);
// }

//====  COlor to hex/rgb ====//

//Convert hex to rgb

function hexToRgb(hex) {
   var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
     RGBaVal = '(' + parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16) + ')';
   
}

String.prototype.padZero= function(len, c){
    var s= this, c= c || "0", len= len || 2;
    while(s.length < len) s= c + s;
    return s;
}
var colors={

    colornames:{
        aliceblue   :"#f0f8ff",
      antiquewhite  :"#faebd7",
      aqua: "#00ffff",
      aquamarine  :"#7fffd4",
      azure   :"#f0ffff",
      beige   :"#f5f5dc",
      bisque  :"#ffe4c4",
      black   :"#000000",
      blanchedalmond  :"#ffebcd",
      blue  :"#0000ff",
      blueviolet  :"#8a2be2",
      brown   :"#a52a2a",
      burlywood   :"#deb887",
      cadetblue   :"#5f9ea0",
      chartreuse  :"#7fff00",
      chocolate   :"#d2691e",
      coral   :"#ff7f50",
      cornflowerblue  :"#6495ed",
      cornsilk  :"#fff8dc",
      crimson   :"#dc143c",
      cyan  :"#00ffff",
      darkblue  :"#00008b",
      darkcyan  :"#008b8b",
      darkgoldenrod   :"#b8860b",
      darkgray  :"#a9a9a9",
      darkgreen   :"#006400",
      darkkhaki   :"#bdb76b",
      darkmagenta   :"#8b008b",
      darkolivegreen  :"#556b2f",
      darkorange  :"#ff8c00",
      darkorchid  :"#9932cc",
      darkred   :"#8b0000",
      darksalmon  :"#e9967a",
      darkseagreen  :"#8fbc8f",
      darkslateblue   :"#483d8b",
      darkslategray   :"#2f4f4f",
      darkturquoise   :"#00ced1",
      darkviolet  :"#9400d3",
      deeppink  :"#ff1493",
      deepskyblue   :"#00bfff",
      dimgray   :"#696969",
      dodgerblue  :"#1e90ff",
      firebrick   :"#b22222",
      floralwhite   :"#fffaf0",
      forestgreen   :"#228b22",
      fuchsia   :"#ff00ff",
      gainsboro   :"#dcdcdc",
      ghostwhite  :"#f8f8ff",
      gold  :"#ffd700",
      goldenrod   :"#daa520",
      gray  :"#808080",
      green   :"#008000",
      greenyellow   :"#adff2f",
      honeydew  :"#f0fff0",
      hotpink   :"#ff69b4",
      indianred   :"#cd5c5c",
      indigo    :"#4b0082",
      ivory   :"#fffff0",
      khaki   :"#f0e68c",
      lavender  :"#e6e6fa",
      lavenderblush   :"#fff0f5",
      lawngreen   :"#7cfc00",
      lemonchiffon  :"#fffacd",
      lightblue   :"#add8e6",
      lightcoral  :"#f08080",
      lightcyan   :"#e0ffff",
      lightgoldenrodyellow  :"#fafad2",
      lightgray   :"#d3d3d3",
      lightgreen  :"#90ee90",
      lightpink   :"#ffb6c1",
      lightsalmon   :"#ffa07a",
      lightseagreen   :"#20b2aa",
      lightskyblue  :"#87cefa",
      lightslategray  :"#778899",
      lightsteelblue  :"#b0c4de",
      lightyellow   :"#ffffe0",
      lime  :"#00ff00",
      limegreen   :"#32cd32",
      linen   :"#faf0e6",
      magenta   :"#ff00ff",
      maroon  :"#800000",
      mediumaquamarine  :"#66cdaa",
      mediumblue  :"#0000cd",
      mediumorchid  :"#ba55d3",
      mediumpurple  :"#9370db",
      mediumseagreen  :"#3cb371",
      mediumslateblue   :"#7b68ee",
      mediumspringgreen   :"#00fa9a",
      mediumturquoise   :"#48d1cc",
      mediumvioletred   :"#c71585",
      midnightblue  :"#191970",
      mintcream   :"#f5fffa",
      mistyrose   :"#ffe4e1",
      moccasin  :"#ffe4b5",
      navajowhite   :"#ffdead",
      navy  :"#000080",
      oldlace   :"#fdf5e6",
      olive   :"#808000",
      olivedrab   :"#6b8e23",
      orange  :"#ffa500",
      orangered   :"#ff4500",
      orchid  :"#da70d6",
      palegoldenrod   :"#eee8aa",
      palegreen   :"#98fb98",
      paleturquoise   :"#afeeee",
      palevioletred   :"#db7093",
      papayawhip  :"#ffefd5",
      peachpuff   :"#ffdab9",
      peru  :"#cd853f",
      pink  :"#ffc0cb",
      plum  :"#dda0dd",
      powderblue  :"#b0e0e6",
      purple  :"#800080",
      red   :"#ff0000",
      rosybrown   :"#bc8f8f",
      royalblue   :"#4169e1",
      saddlebrown   :"#8b4513",
      salmon  :"#fa8072",
      sandybrown  :"#f4a460",
      seagreen  :"#2e8b57",
      seashell  :"#fff5ee",
      sienna  :"#a0522d",
      silver  :"#c0c0c0",
      skyblue   :"#87ceeb",
      slateblue   :"#6a5acd",
      slategray   :"#708090",
      snow  :"#fffafa",
      springgreen   :"#00ff7f",
      steelblue   :"#4682b4",
      tan   :"#d2b48c",
      teal  :"#008080",
      thistle   :"#d8bfd8",
      tomato  :"#ff6347",
      turquoise   :"#40e0d0",
      violet  :"#ee82ee",
      wheat   :"#f5deb3",
      white   :"#ffffff",
      whitesmoke  :"#f5f5f5",
      yellow  :"#ffff00",
      yellowgreen   :"#9acd32"
    },
    toRgb: function(c){
        c= '0x'+colors.toHex(c).substring(1);
        c= [(c>> 16)&255, (c>> 8)&255, c&255];
        return 'rgb('+c.join(',')+')';
    },
    toHex: function(c){
        var tem, i= 0, c= c? c.toString().toLowerCase(): '';
        if(/^#[a-f0-9]{3,6}$/.test(c)){
            if(c.length< 7){
                var A= c.split('');
                c= A[0]+A[1]+A[1]+A[2]+A[2]+A[3]+A[3];
            }
            return c;
        }
        if(/^[a-z]+$/.test(c)){
            return colors.colornames[c] || '';
        }
        c= c.match(/\d+(\.\d+)?%?/g) || [];
        if(c.length<3) return '';
        c= c.slice(0, 3);
        while(i< 3){
            tem= c[i];
            if(tem.indexOf('%')!= -1){
                tem= Math.round(parseFloat(tem)*2.55);
            }
            else tem= parseInt(tem);
            if(tem< 0 || tem> 255) c.length= 0;
            else c[i++]= tem.toString(16).padZero(2);
        }
        if(c.length== 3) return '#'+c.join('').toLowerCase();
        return '';
    }
}



///======== Focus Directives ======///


angular.module('app', [])
.directive('ngFocus', ['$parse', function($parse) {
    return function(scope, element, attr) {
        var fn = $parse(attr['ngFocus']);
        element.on('focus', function(event) {
            scope.$apply(function() {
                fn(scope, {$event:event});
            });
        });
    };
}])
.directive('ngBlur', ['$parse', function($parse) {
    return function(scope, element, attr) {
        var fn = $parse(attr['ngBlur']);
        element.on('blur', function(event) {
            scope.$apply(function() {
                fn(scope, {$event:event});
            });
        });
    };
}])
  .directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter);

                });
                event.preventDefault();
            }
        });
    };
})
  .directive('parseStyle', function()
{
    return function(scope, elem)
    {
        elem.html(scope.$eval('\'' + elem.html() + '\''));
    };
});


//Jquery junk






