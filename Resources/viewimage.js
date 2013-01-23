
Titanium.UI.currentTab.addEventListener('focus', winopened);
winopened();
function winopened(e)
{
		var classexample = require('ui/classexample').classexample;		
			//construct UI
			var i = new classexample();
			
		
		var subWindow = Titanium.UI.createWindow({  
		    title:'hla',
		    backgroundColor:'#fff'
		});
		 
		// Create a Button.
		var aButton = Ti.UI.createButton({
			title : 'close',
			height : 40,
			width : 100,
			top : 300,
			left : 100
		});
		
		aButton.addEventListener('click', function(e){
			Ti.API.info("you stay here");
			subWindow.close();
		});
		
		i.initialize(1);
		i.Submit(itemSubmitted);
		var viewbutton = i.buttonimage();
		 
		function itemSubmitted() {
		  alert("tada!");
		}


		subWindow.add(aButton);
		subWindow.add(viewbutton);
		//subWindow.add(aButton);
		//subWindow.add(firstView);
		subWindow.open();

}

