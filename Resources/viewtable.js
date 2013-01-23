
Titanium.UI.currentTab.addEventListener('focus', winopened);
winopened();
function calculatorsizey(size)
{
	return (1024*size)/480;
}
function calculatorsizex(size)
{
	return (762*size)/320;
}
function winopened(e)
{
var categoryArray = [];
var catRows = [];
var leftlbl = 10;
var toplbl = 80;
var lefttf = 100;
var widthtf = 200;
var heighttf = 35;
var spacebetween = 50;
var heightta = 85;
var buttontop = 300;
var widthbutton = 80;
var sizetf = 16;
var labelsize = 20;
if (Titanium.Platform.osname == 'ipad'){
	// Include your iPad specific code
	leftlbl = calculatorsizex(leftlbl);
	toplbl = calculatorsizey(toplbl);
	lefttf = calculatorsizex(lefttf);
	widthtf = calculatorsizex(widthtf);
	heighttf = calculatorsizey(heighttf);
	spacebetween = calculatorsizey(spacebetween);
	heightta = calculatorsizey(heightta);
	buttontop = calculatorsizex(buttontop);
	widthbutton = calculatorsizex(widthbutton);
	sizetf = calculatorsizey(sizetf); 
	labelsize = calculatorsizey(labelsize);
};

// populate category array from database
// only called on first rendering of the tab, after that the array is filled

	var db = Titanium.Database.open('contentDB');
	var dbrows = db.execute('select id, title, type, body from library order by title');
	while (dbrows.isValidRow()) {
	    categoryArray.push({
	    	catid:dbrows.fieldByName('id'),
	    	title:dbrows.fieldByName('title'),
	    	type:dbrows.fieldByName('type'),
	    	body:dbrows.fieldByName('body')
	    });
	    dbrows.next();
	}
	dbrows.close();
	db.close();
//}

// category table view
for (var c=0;c<categoryArray.length;c++) {
	var row = Ti.UI.createTableViewRow(
		{
			height:40,
			backgroundColor:'#ffffff',
			selectedBackgroundColor:'#eeee33',
			hasChild:true
		}); 
	var item = categoryArray[c];
	
	row.title = item.title;
	row.catid = item.catid;
	row.type = item.title;
	row.body = item.body;
	
	catRows[c] = row;
}
var categoryTableView = Titanium.UI.createTableView({
	data:catRows,
	});


//show the select

function showItemsInCategory(cid) {
		var itemArray = [];
		
		// populate item array from database
		// called every time a category row is clicked
		var db = Titanium.Database.open('contentDB');
		var dbrows = db.execute('select id,title,type,body,imagen from library where id=?',cid);
		while (dbrows.isValidRow()) {
		    itemArray.push({
		    	id:dbrows.fieldByName('id'),
		    	title:dbrows.fieldByName('title'),
		    	type:dbrows.fieldByName('type'),
		    	body:dbrows.fieldByName('body'),
		    	image:dbrows.fieldByName('imagen')
		    }); 
		    Ti.API.info("Found item: "+dbrows.fieldByName('title')+" ["+dbrows.fieldByName('id')+"]");
		    dbrows.next();
		}
		dbrows.close();
		db.close();
				
		// create item table view
		itemRows = [];
		for (var c=0;c<itemArray.length;c++)
		{
			var item = itemArray[c];
			//input fields
			var label1library = Titanium.UI.createLabel({
				text: 'Title',
				width: 'auto',
				color: '#fff',
				top: toplbl,
				font:{fontSize:labelsize},
				left: leftlbl
			});
								
			var tf1library = Titanium.UI.createTextField({ 
				color:'#336699', 
				height:heighttf, 
				top:toplbl, 
				left:lefttf, 
				font:{fontSize:sizetf},
				width:widthtf,
				value: item.title,
				borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED 
			});
			
			var label2library = Titanium.UI.createLabel({
				text: 'type',
				width: 'auto',
				color: '#fff',
				font:{fontSize:labelsize},
				top: toplbl+(spacebetween*1),
				left: leftlbl
			});
				
			var tf2library = Titanium.UI.createTextField({ 
				color:'#336699', 
				height:heighttf, 
				font:{fontSize:sizetf},
				top:toplbl+(spacebetween*1), 
				left:lefttf, 
				width:widthtf,
				value: item.type,
				borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED 
			});
			
			var label3library = Titanium.UI.createLabel({
				text: 'body',
				width: 'auto',
				color: '#fff',
				font:{fontSize:labelsize},
				top: toplbl+(spacebetween*2),
				left: leftlbl
			});
			
			var tf3library = Titanium.UI.createTextArea({ 
				value:item.body,
				 height:heightta,
				  width:widthtf,
				  font:{fontSize:sizetf},
				  left:lefttf, 
				  top:toplbl+(spacebetween*2), 
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

			//image
			var FirstView = require('ui/FirstView').FirstView;		
			//construct UI
			var firstViewObj = new FirstView(item.image);
			var firstView=firstViewObj.buttonimage(item.id);
			Ti.API.info("firstview: "+firstView);

			//endimage
			
			var buttonedit = Titanium.UI.createButton({ 
				title: 'Save',
				top: buttontop,
				left:leftlbl,
				backgroundImage: 'none',
				backgroundGradient:{type:'linear',
				colors:['#8e6629','#666666'],
				startPoint:{x:0,y:0},
				endPoint:{x:2,y:50},
				backFillStart:false},
				width:widthbutton 
			});
			
			var buttondelete = Titanium.UI.createButton({ 
				title: 'Delete',
				top: buttontop,
				left:lefttf,
				backgroundImage: 'none',
				backgroundGradient:{type:'linear',
				colors:['#8e6629','#666666'],
				startPoint:{x:0,y:0},
				endPoint:{x:2,y:50},
				backFillStart:false},
				width:widthbutton
			});

		}
		
		//event click for image
		
		var subWindow = Titanium.UI.createWindow({  
		    title:'edit',
		    //backgroundColor:'#fff',
		    backgroundImage:'image/list_640px.jpg'
		});
		var scrollView1 = Ti.UI.createScrollView({ 
		   contentWidth:'auto', 
		   contentHeight:'auto', 
		   top:0, 
		   showVerticalScrollIndicator:true, 
		   showHorizontalScrollIndicator:true 
		});
		subWindow.add(scrollView1);
		scrollView1.add(firstView);
		scrollView1.add(label1library);
		scrollView1.add(label2library);
		scrollView1.add(label3library);
		scrollView1.add(tf1library);
		scrollView1.add(tf2library);
		scrollView1.add(tf3library);
		scrollView1.add(buttonedit);
		scrollView1.add(buttondelete);
		scrollView1.barColor = '#993333';
		Titanium.UI.currentTab.open(subWindow,{animated:true});
		
		buttonedit.addEventListener('click',function(e) 
		{ 
			var title = tf1library.getValue();
			var type = tf2library.getValue();
			var body = tf3library.getValue();
			var image = item.id+".jpeg";
			Titanium.API.info("ID: "+item.id+" Title: "+title+" type: "+type+" body: "+body);
			if(title!='')
			{
				var db2 = Titanium.Database.open('contentDB');
				
				db2.execute("UPDATE library SET title=?, type=?, body=?, imagen=? WHERE id=?",title,type,body,image,item.id);
				firstViewObj.saveimage(item.id);
				winopened();
				subWindow.close();				
			}
			else
			{
				Titanium.API.info("No edit");
			}
		});
		var alert = Titanium.UI.createAlertDialog(
		{ 
			title: 'Delete data',
			message: 'Sure?',
			buttonNames: ['Yes', 'No'],
			cancel: 1 
		});
		
		alert.addEventListener('click', function(e) { 
			if(e.index == 0)
				{
					var db2 = Titanium.Database.open('contentDB');
					db2.execute("DELETE FROM library WHERE id=?",item.id);
					winopened();
					subWindow.close();
				}
				else
				{
					Titanium.API.info("No delete");
				}
		});
		buttondelete.addEventListener('click',function(e) 
		{ 

			Titanium.API.info("ID: "+item.id);
			alert.show();
				
		});
		
};

// category funtion
function handleCategoryClick(e) {				
	showItemsInCategory(e.row.catid);
}

// category view event listener
categoryTableView.addEventListener('click', handleCategoryClick);

// add category table view to the window
Titanium.UI.currentWindow.add(categoryTableView);

}

