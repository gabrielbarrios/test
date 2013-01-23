//FirstView Component Constructor
exports.FirstView = function(image_dir) {
	
	//create object instance, a parasitic subclass of Observable
	var topself = 10;
	var heightself = 70;
	var heightbcp = 35;
	var widthbcp = 200;
	var leftbcp = 100;
	var leftimg2 = 10;
	var heightimg2 = 50;
	var widthimg2 = 50;
	if (Titanium.Platform.osname == 'ipad'){
	// Include your iPad specific code
		//alert("ipad2");
		topself = calculatorsizey(topself);
		heightself = calculatorsizey(heightself);
		heightbcp = calculatorsizey(heightbcp);
		widthbcp = calculatorsizex(widthbcp);
		leftbcp = calculatorsizex(leftbcp);
		leftimg2 = calculatorsizex(leftimg2);
		heightimg2 = calculatorsizey(heightimg2);
		widthimg2 = calculatorsizex(widthimg2);
	};
	function calculatorsizey(size)
	{
		return (1024*size)/480;
	}
	function calculatorsizex(size)
	{
		//alert("hello world");
		return (762*size)/320;
	}
	this.buttonimage = function(id){
	var self = Ti.UI.createView({
		//backgroundColor: '#232323'
		zIndex:5,
		height:heightself,
		left:0,
		top:topself
	});
	
	//this button will appear initially and allow the user to choose
	//a photo from their gallery	
	var btnChoosePhoto = Ti.UI.createButton({
		width: widthbcp,
		height: heightbcp/1.5,
		top:topself,
		left:leftbcp,
		title: 'Select photo for upload.',
		font: {fontFamily: 'Arial'},
		color: '#fff',
		variable: "hola",
		backgroundImage: 'none',
		backgroundGradient:{type:'linear',
		colors:['#8e6629','#666666'],
		startPoint:{x:0,y:0},
		endPoint:{x:2,y:heightbcp+50},
		backFillStart:false},
		visible: true
	});
	var directory = "image";
	var image_name="";
	Ti.App.image_type="";
	Ti.App.bgImage;
	Ti.App.image="";
	btnChoosePhoto.addEventListener('click', function(e){
		Titanium.Media.openPhotoGallery({
	        success:function(event)
	        {	
	        	var cropRect = event.cropRect;
		        image = event.media;
		        var mime_type = image.mimeType;     // Getting the file type.....
		        var arr = Array();
		        arr = mime_type.split('/');
		        image_type = arr[1];          
	            Ti.API.debug('Our type was: '+event.mediaType);
	            if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
	            {
	            	image_name = id+"."+arr[1];
		            Ti.API.info(image_name);
		            var filename = Titanium.Filesystem.resourcesDirectory+""+directory +"/"+image_name;
		            Ti.API.info(filename); 
		            Ti.API.info(id);  
		            bgImage = Titanium.Filesystem.getFile(filename);
		            //bgImage.write(image);
		            image2.image = event.media;
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
			  image:'image/'+image_dir,
			  top:0,
			  width:widthimg2,
			  height:heightimg2,
			  zIndex:10,
			  left:leftimg2
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
				self.top = 0;
				image2.left = 0;
				self.height = '100%';
				
			}
			else
			{
				image2.top=topself;
				image2.width=widthimg2;
				image2.height=heightimg2;
				image2.left = leftimg2;
				self.height=heightself;
				
			}
		});
	  
	self.add(image2)
	self.add(btnChoosePhoto);
	
	return self;
	}
	
	this.saveimage = function(id) {
	    if(image){
		    bgImage.write(image);
		    imagename = id+"."+image_type;
		    var db = Titanium.Database.open('contentDB');
		    db.execute("UPDATE library SET imagen=? WHERE id=?",imagename,id);
		    Ti.API.info("type: "+image_type);
	    }
	  }
 
};




