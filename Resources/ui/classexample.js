exports.classexample = function() {
	this.ID = 0;
	 
	 this.buttonimage = function(){
	 	var id=3;
	 	var self = Ti.UI.createView({
		//backgroundColor: '#232323'
		zIndex:5,
		height:70,
		top:10
		});
	
	//this button will appear initially and allow the user to choose
	//a photo from their gallery	
	var btnChoosePhoto = Ti.UI.createButton({
		width: 200,
		height: 35,
		top:0,
		left:100,
		title: 'Select photo for upload.',
		font: {fontFamily: 'Arial'},
		color: '#000000',
		variable: "hola",
		visible: true
	});
	var directory = "image";
	var image_name="";
	btnChoosePhoto.addEventListener('click', function(e){
		Titanium.Media.openPhotoGallery({
	        success:function(event)
	        {	
	        	var cropRect = event.cropRect;
		        var image = event.media;
		        var mime_type = image.mimeType;     // Getting the file type.....
		        var arr = Array();
		        arr = mime_type.split('/');
		        var image_type = arr[1];          
	            Ti.API.debug('Our type was: '+event.mediaType);
	            if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
	            {
	            	image_name = id+"."+arr[1];
		            Ti.API.info(image_name);
		            var filename = Titanium.Filesystem.resourcesDirectory+""+directory +"/"+image_name;
		            Ti.API.info(filename); 
		            Ti.API.info(id);  
		            var bgImage = Titanium.Filesystem.getFile(filename);
		            bgImage.write(image);
		            image2.image = "image/"+image_name;
	            }
	        },
	        cancel:function()
	        {	
	        },
	        error:function(err)
	        {
	        	Ti.API.error(err);
	        },
	        mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
	    });
	});
	Ti.API.info("Name image: "+image_name);
	var image2 = Ti.UI.createImageView({
			  image:'image/'+id+".jpeg",
			  top:0,
			  width:50,
			  height:50,
			  zIndex:10,
			  left:10
	});
	var toggle=1;
		image2.addEventListener('click', function(e)
		{
			Ti.API.info("Click on image:");
			toggle++;
			if(toggle%2==0)
			{
				image2.top=0;
				image2.width='100%';
				image2.height='100%';
				self.height = '100%';
			}
			else
			{
				image2.top=10;
				image2.width=50;
				image2.height=50;
				self.height=70;
			}
		});
	  
	self.add(image2)
	self.add(btnChoosePhoto);
	
	return self;
	 }
	 
	  this.initialize = function(id) {
	    alert(id);
	  }
	 
	  this.Submit = function(submitHandle) {
	    submitHandle();
	  };

}
