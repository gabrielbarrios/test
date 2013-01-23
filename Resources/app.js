// Initialize database
Titanium.Database.install('content.sqlite','contentDB');
var toptf = 70;
var lefttf = 100;
var widthtf = 200;
var heighttf = 35;
var spacebetween = 40;
var leftlb = 10;
var topbcp = 20;
var widthimg = 50;
var heightimg = 50;
var leftimg = 10;
var labelsize = 20;
var sizetf = 16;
var heightbcp = 35;
if (Titanium.Platform.osname == 'ipad'){
	// Include your iPad specific code
	toptf=calculatorsizey(toptf);
	lefttf=calculatorsizex(lefttf);
	widthtf=calculatorsizex(widthtf);
	heighttf=calculatorsizey(heighttf);
	spacebetween=calculatorsizey(spacebetween);
	leftlb=calculatorsizex(leftlb);
	topbcp=calculatorsizey(topbcp);
	widthimg=calculatorsizex(widthimg);
	heightimg=calculatorsizey(heightimg);
	leftimg=calculatorsizex(leftimg);
	labelsize=calculatorsizey(labelsize);
	sizetf=calculatorsizey(sizetf);
	heightbcp=heightbcp/1.5;
	heightbcp=calculatorsizey(heightbcp);
};

function calculatorsizey(size)
{
	return (1024*size)/480;
}
function calculatorsizex(size)
{
	return (762*size)/320;
}
// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

// create base UI tab and root window

var win1 = Titanium.UI.createWindow({  
    title:'Library',
    backgroundColor:'#fff',
    url:'viewtable.js'
});

var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Library',
    window:win1
});



// create controls tab and root window

//tab example
var win2 = Titanium.UI.createWindow({  
    title:'Tab 2.0',
    backgroundColor:'#fff',
    url:'viewimage.js'
});

	
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2.0',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win2.add(label2);

//end tab example

//create new table


//form
var win3 = Titanium.UI.createWindow({
	title : 'Add content',
	//backgroundColor:'ffa'
	backgroundImage:'image/Libros-Viejos-Apilados_Imagenes-de-Libros.jpg',

});

var tab3 = Titanium.UI.createTab({
	icon:'KS_nav_ui.png',
	title: 'Add content',
	window:win3
});

var tf1 = Titanium.UI.createTextField({ 
	color:'#336699', 
	height:heighttf, 
	top:toptf, 
	left:lefttf, 
	width:widthtf,
	font:{fontSize:sizetf},
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED 
});

var tf2 = Titanium.UI.createTextField({ 
	color:'#336699', 
	height:heighttf, 
	top:toptf+(spacebetween*1), 
	left:lefttf, 
	width:widthtf,
	font:{fontSize:sizetf}, 
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED 
});


var tf3 = Titanium.UI.createTextArea({ 
	value:'',
	 height:heighttf*3,
	  width:widthtf,
	  left:lefttf,
	  font:{fontSize:sizetf}, 
	  top:toptf+(spacebetween*2), 
	  font:
	  {
	  	fontSize:20
	  }, 
	  color:'#888', 
	  textAlign:'left', 
	borderWidth:2, 
	borderColor:'#bbb', 
	borderRadius:5 
});

var label1 = Titanium.UI.createLabel({
	text: 'Title',
	width: 'auto',
	color: '#fff',
	top: toptf,
	font:{fontSize:labelsize},
	left: leftlb
});

var label2 = Titanium.UI.createLabel({
	text: 'Type',
	width: 'auto',
	color: '#fff',
	top: toptf+(spacebetween*1),
	font:{fontSize:labelsize},
	left: leftlb
});

var label3 = Titanium.UI.createLabel({
	text: 'Body',
	width: 'auto',
	color: '#fff',
	top: toptf+(spacebetween*2),
	font:{fontSize:labelsize},
	left: leftlb
});

var button = Titanium.UI.createButton({ 
	title: 'Add',
	top:toptf+(spacebetween*5),
	left:lefttf,
	//backgroundColor:"#00f",
	backgroundImage: 'none',
	backgroundGradient:{type:'linear',
	colors:['#30130b','#666666'],
	startPoint:{x:0,y:0},
	endPoint:{x:2,y:50},
	backFillStart:false},

	width:widthtf/2
 });
button.addEventListener('click',function(e) 
{ 
	var title = tf1.getValue();
	var type = tf2.getValue();
	var body = tf3.getValue();
	Titanium.API.info("Title: "+title+" type: "+type+" body: "+body);
	tf1.value='';
	tf2.value='';
	tf3.value='';
	if(title!='')
	{
		var db2 = Titanium.Database.open('contentDB');
		db2.execute("INSERT INTO library (title, type, body) VALUES (?, ?, ?)",title,type,body);
		tabGroup.setActiveTab(1);
		
		Ti.API.info("image type: "+image_type+" image: "+image);
		var rows = db2.execute("SELECT id FROM library WHERE title=? and type=? and body=? ",title,type,body);
		var id = rows.fieldByName("id");
		image_name = id+"."+image_type;
        var filename = Titanium.Filesystem.resourcesDirectory+""+directory +"/"+image_name;
        var bgImage = Titanium.Filesystem.getFile(filename);
        db2.execute("UPDATE library SET imagen=? WHERE id=?",image_name,id);
        bgImage.write(image);
        image3.image = "";
        
	}
	else
	{
		Titanium.API.info("No save");
	}
});



var scrollView = Ti.UI.createScrollView
({ 
	   contentWidth:'auto', 
	   contentHeight:'auto', 
	   top:0, 
	   showVerticalScrollIndicator:true, 
	   showHorizontalScrollIndicator:true 
});

//image add
var btnChoosePhoto = Ti.UI.createButton({
		width: widthtf,
		height: heightbcp,
		top:topbcp,
		left:lefttf,
		title: 'Select photo for upload.',
		font: {fontFamily: 'Arial'},
		color: '#fff',
		backgroundImage: 'none',
		backgroundGradient:{type:'linear',
		colors:['#30130b','#666666'],
		startPoint:{x:0,y:0},
		endPoint:{x:2,y:heighttf+50},
		backFillStart:false},
		visible: true
});
var directory = "image";
var image_name="";

var cropRect;
var image;
var image_type;
var image3 = Ti.UI.createImageView({
		  image:'',
		  top:topbcp,
		  width:widthimg,
		  height:heightimg,
		  zIndex:10,
		  borderColor:"#000",
		  left:leftimg
});
var toggle=1;
image3.addEventListener('click', function(e){
	Ti.API.info("Click on image:");
			toggle++;
			if(toggle%2==0)
			{
				image3.top=0;
				image3.width='100%';
				image3.height='100%';
				image3.left = 0;
			}
			else
			{
				image3.top=topbcp;
				image3.width=widthimg;
				image3.height=heightimg;
				image3.left = leftimg;
			}
})
btnChoosePhoto.addEventListener('click', function(e){
	Titanium.Media.openPhotoGallery({
        success:function(event)
        {	
        	cropRect = event.cropRect;
	        image = event.media;
	        var mime_type = image.mimeType;     // Getting the file type.....
	        var arr = Array();
	        arr = mime_type.split('/');
	        image_type = arr[1];          
            Ti.API.debug('Our type was: '+event.mediaType);
            image3.image = image;
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
scrollView.add(btnChoosePhoto);
scrollView.add(image3);
//end image add
scrollView.add(tf1);
scrollView.add(tf2);
scrollView.add(tf3);
scrollView.add(label1);
scrollView.add(label2);
scrollView.add(label3);
scrollView.add(button);
win3.add(scrollView); 


//  add tabs

tabGroup.addTab(tab3);
tabGroup.addTab(tab1);  
//tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
