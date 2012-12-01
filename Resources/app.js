Titanium.UI.setBackgroundColor('#000');

var tabGroup = Titanium.UI.createTabGroup();

var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff',
    barColor : 'black',
});

var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});


var imageSelect = Ti.UI.createOptionDialog({
	options:['撮影する','アルバムから選ぶ','キャンセル'],
	cancel:2,
	title:'画像アップロード'
});

var addButton = Ti.UI.createButton({
	title : '画像うｐ',
	height : 100,
	width : 100,
	top : 50,
	left : 20
});

var bButton = Ti.UI.createButton({
	title : 'bButton',
	height : 100,
	width : 100,
	top : 50,
	left : 130
});


addButton.addEventListener('click', function() {
	imageSelect.show();
});
bButton.addEventListener('click', function() {
});

win1.add(bButton);
win1.add(addButton);

var imageView = Ti.UI.createImageView(
	{
		width:'auto',
		height: 240,
		top:220
	}
);
imageView.hide();
win1.add(imageView);

//写真うｐ
function PhotoGallery(){
	Ti.Media.openPhotoGallery(
		{
			success:function(event){
				var image = event.media;
				imageView.image = image;
				imageView.show();	
				uploard(image);
			},
			allowEditing: false,
			mediaType:[Ti.Media.MEDIA_TYPE_PHOTO]
			}
	);
}


//カメラ
function startCamera() {
	Titanium.Media.showCamera({
	
		success:function(event)
		{
			var cropRect = event.cropRect;
			var image = event.media;
	
			Ti.API.debug('Our type was: '+event.mediaType);
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
			{
				var imageView = Ti.UI.createImageView({
					width:win.width,
					height:win.height,
					image:event.media
				});
				win.add(imageView);
			}
			else
			{
				alert("got the wrong type back ="+event.mediaType);
			}
		},
		cancel:function()
		{
		},
		error:function(error)
		{
			// create alert
			var a = Titanium.UI.createAlertDialog({title:'Camera'});
	
			// set message
			if (error.code == Titanium.Media.NO_CAMERA)
			{
				a.setMessage('Please run this test on device');
			}
			else
			{
				a.setMessage('Unexpected error: ' + error.code);
			}
	
			// show alert
			a.show();
		},
		saveToPhotoGallery:true,
		allowEditing:true,
		mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO]
	});
}


var imageSelect = Ti.UI.createOptionDialog({
	options:['撮影する','アルバムから選ぶ','キャンセル'],
	cancel:2,
	title:'画像アップロードうんちゃら'
});

imageSelect.addEventListener('click',function(e)
{
	switch(e.index){
		case 0: startCamera();
		break;
		case 1:
		PhotoGallery();
		break;
	}
});




//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
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



//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
