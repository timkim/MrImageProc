document.addEventListener("deviceready", function(){
	//alert('im ready to go!');
	
	function cameraWin(picture){
		$('#pictureImg').attr('src', 'data:image/png;base64,'+picture);
		
		$('#pictureImg').load(function(){
			var theCanvas = $('#theCanvas')[0];
			theCanvas.height = $('#pictureImg').height();
			theCanvas.width = $('#pictureImg').width();
			var ctx = theCanvas.getContext('2d');
			
			// set image stuff
			var theImage = new Image();
			theImage.src = 'data:image/png;base64,'+picture;
			
			ctx.drawImage(theImage, 0, 0);
			
			var croppedImage = ctx.getImageData(0,0,theCanvas.width,theCanvas.height);
			croppedImage = sepia(croppedImage);
			ctx.putImageData(croppedImage,0,0);
			
		});
	}
	
	function cameraFail(){
		alert('i died');
	}
	
	function takePicture(){
		navigator.camera.getPicture(cameraWin, cameraFail, {quality: 70, destinationType: Camera.DestinationType.DATA_URL, targetWidth: 300,
  		targetHeight: 300, encodingType: Camera.EncodingType.PNG, });
	}
	
	$('#pictureButton').click(function(){
		takePicture();
	});

	$('#greyButton').click(function(){
		var theCanvas = $('#theCanvas')[0];
		var ctx = theCanvas.getContext('2d');
		var croppedImage = ctx.getImageData(0,0,theCanvas.width,theCanvas.height);
		croppedImage = greyScale(croppedImage);
		ctx.putImageData(croppedImage,0,0);
	});
	
	$('#sepiaButton').click(function(){
		var theCanvas = $('#theCanvas')[0];
		var ctx = theCanvas.getContext('2d');
		var croppedImage = ctx.getImageData(0,0,theCanvas.width,theCanvas.height);
		croppedImage = sepia(croppedImage);
		ctx.putImageData(croppedImage,0,0);
	});
	
	$('#brightButton').click(function(){
		var theCanvas = $('#theCanvas')[0];
		var ctx = theCanvas.getContext('2d');
		var croppedImage = ctx.getImageData(0,0,theCanvas.width,theCanvas.height);
		croppedImage = brighten(croppedImage);
		ctx.putImageData(croppedImage,0,0);
	});
	
	$('#darkButton').click(function(){
		var theCanvas = $('#theCanvas')[0];
		var ctx = theCanvas.getContext('2d');
		var croppedImage = ctx.getImageData(0,0,theCanvas.width,theCanvas.height);
		croppedImage = darken(croppedImage);
		ctx.putImageData(croppedImage,0,0);
	});	
	
	$('#resetButton').click(function(){
		reset();
	});
	
	var sepia = function(img){
		var theWidth = $('#pictureImg').width();
		var theHeight = $('#pictureImg').height();;
		var sepiaDepth = 20;
		
		for(var i=0;i<theWidth;i++){
			for(var j=0;j<theHeight;j++){
				var index = (i+j*theWidth)*4;
				// r*.3 + g*.59 + b*.11
				var theIntensity = img.data[index]*.3 + img.data[index+1]*.59 + img.data[index+2]*.11;
				var r = theIntensity,
				g = theIntensity,
				b = theIntensity;
				
				r +=  sepiaDepth*2;
				g += sepiaDepth;
				b -= 50;
				
				if(b<0){
					b = 0;
				}else if(b>255){
					b = 255;
				}
				img.data[index] = r;
				img.data[index+1] = g;
				img.data[index+2] = b;
			}
		}
		return img;
	}
	
	var greyScale = function(img){
		var theWidth = $('#pictureImg').width();
		var theHeight = $('#pictureImg').height();;
		
		for(var i=0;i<theWidth;i++){
			for(var j=0;j<theHeight;j++){
				var index = (i+j*theWidth)*4;
				// r*.3 + g*.59 + b*.11
				var theIntensity = img.data[index]*.3 + img.data[index+1]*.59 + img.data[index+2]*.11;
				var r = theIntensity,
				g = theIntensity,
				b = theIntensity;

				img.data[index] = r;
				img.data[index+1] = g;
				img.data[index+2] = b;
			}
		}
		return img;	
	}
	
	var brighten = function(img){
		var theWidth = $('#pictureImg').width();
		var theHeight = $('#pictureImg').height();;
		
		for(var i=0;i<theWidth;i++){
			for(var j=0;j<theHeight;j++){
				var index = (i+j*theWidth)*4;
				var r = img.data[index];
				var g = img.data[index+1];
				var b = img.data[index+2];
				
				r = Math.min((r*1.2) + 10);
				g = Math.min((g*1.2) + 10);
				b = Math.min((b*1.2) + 10);
				
				if(r>255){
					r = 255
				}
				
				if(g>255){
					g = 255;
				}
				
				if(b>255){
					b = 255;
				}
				img.data[index] = r;
				img.data[index+1] = g;
				img.data[index+2] = b;
			}
		}
		return img;	
	}
	
	var darken = function(img){
		var theWidth = $('#pictureImg').width();
		var theHeight = $('#pictureImg').height();;
		
		for(var i=0;i<theWidth;i++){
			for(var j=0;j<theHeight;j++){
				var index = (i+j*theWidth)*4;
				var r = img.data[index];
				var g = img.data[index+1];
				var b = img.data[index+2];
				
				r = Math.min((r*0.8) - 10);
				g = Math.min((g*0.8) - 10);
				b = Math.min((b*0.8) - 10);
				
				if(r<0){
					r = 0
				}
				
				if(g<0){
					g = 0;
				}
				
				if(b<0){
					b = 0;
				}
				img.data[index] = r;
				img.data[index+1] = g;
				img.data[index+2] = b;
			}
		}
		return img;		
	}
	
	var reset = function(){
		var theCanvas = $('#theCanvas')[0];
		var ctx = theCanvas.getContext('2d');
		
		// set image stuff
		var theImage = $('#pictureImg')[0];
		ctx.drawImage(theImage, 0, 0);	
	}
}, false);


