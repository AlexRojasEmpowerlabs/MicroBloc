
			app.initialize();
  var misDatos={};
  var selectedBloc="";
  var module = angular.module('app', ['onsen']);

  module.controller('AppController', function($scope) {
    $scope.doSomething = function() {
      setTimeout(function() {
        alert(''+device.uuid);
      }, 100);
    };
  });
  module.controller('InicioController', function($scope){
	$scope.info=dispositivo;
  });
  module.controller('PrincipalController', function($scope,$blocsJSON,$http){
  	//myFunction();
	$scope.info=dispositivo;
	$http.get('http://empowerlabs.com/proyectos/trackersAPI/mblocs/todos.php').
	success(function(data, status, headers, config){
		misDatos=data;
		$scope.items=misDatos;
		$scope.detalles=function(item){
			selectedBloc=item;
			$scope.ons.navigator.pushPage("micro.html",{title:'1'});
		};
	});
	$scope.informacion=function(){
		$scope.ons.navigator.pushPage("info.html",{title:'1'});
	};
  });
  module.factory('$blocsJSON',function(){
  	var data = {};
      
      data.items = misDatos;
      
      return data;
  });
  
  module.controller('MicroController', function($scope){
	$scope.item= selectedBloc;
	$scope.urlVideo = selectedBloc.VideoResource;
    videos = document.querySelectorAll("video");
video=videos[0];
/*var isYoutube = selectedBloc.VideoResource.match(/(?:youtu|youtube)(?:\.com|\.be)\/([\w\W]+)/i);
        if (isYoutube) {
            var id = isYoutube[1].match(/watch\?v=|[\w\W]+/gi);
            id = (id.length > 1) ? id.splice(1) : id;
            id = id.toString();
            var mp4url = "http://www.youtubeinmp4.com/redirect.php?video=";
            //$scope.ons.notification.alert({message: ""+ mp4url + id,title: "intellibanks"});
            //video.src = mp4url + id;
        }*/
       video.src = selectedBloc.VideoResource;
	$scope.video=function(item){
    	$scope.ons.notification.confirm({messageHTML: '<ons-row><ons-col width="95px"><img src="img/YouTube.png" class="thumbnail"></ons-col><ons-col><div class="name"> '+item.Title+' </div><div class="location"><i class="fa fa-map-marker"></i> Paris, France</div><div class="desc"> '+item.VideoResource+'</div></ons-col> <ons-col width="40px"></ons-col> </ons-row>',title: "¿Compartir este video?"});
    	//$scope.ons.navigator.pushPage('video.html', {title : "1"});
    	}; 
    $scope.audio=function(item){
    	//$scope.ons.navigator.pushPage('audio.html', {title : "1"});
    	$scope.ons.notification.alert({messageHTML:'<ons.list-item class="item" style=" text-align: center"><audio style="height: 40px;" controls><source src="'+item.AudioResource+'" type="audio/mpeg"></audio>'+item.AudioResource+'</ons.list-item>',title:'Audio'});
    	}; 
    $scope.texto=function(){
    	//$scope.ons.navigator.pushPage('page4.html', {title : "1"});
    	};
    $scope.presentacion=function(){
    	$scope.ons.notification.alert({messageHTML:'<div style="width: 100%; height: 360px;background-color:White; overflow: hidden;"><iframe src="//www.slideshare.net/slideshow/embed_code/46732684?rel=0" style="width:80%" height="407" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe></div>',title:'Presentación'});
    	};
    $scope.shareWeb=function(item){
    	$scope.ons.notification.confirm({messageHTML: '<ons-row><ons-col width="95px"><img src="'+item.Thumbnail+'" class="thumbnail"></ons-col><ons-col><div class="name"> '+item.Title+' </div><div class="location"><i class="fa fa-map-marker"></i> Paris, France</div><div class="desc"> '+item.ExternalLink+'</div></ons-col> <ons-col width="40px"></ons-col> </ons-row>',title: "¿Compartir Bloc en la web?"});
    };
  });
  
  module.controller('AudioController', function($scope) {
    $scope.url = selectedBloc.AudioResource;
  });
  module.controller('VideoController', function($scope) {
    //$scope.ons.notification.alert({message: ""+misDatos.url,title: "intellibanks"});
    $scope.urlVideo = selectedBloc.VideoResource;
    videos = document.querySelectorAll("video");
video=videos[0];
var isYoutube = selectedBloc.VideoResource.match(/(?:youtu|youtube)(?:\.com|\.be)\/([\w\W]+)/i);
        if (isYoutube) {
            var id = isYoutube[1].match(/watch\?v=|[\w\W]+/gi);
            id = (id.length > 1) ? id.splice(1) : id;
            id = id.toString();
            var mp4url = "http://www.youtubeinmp4.com/redirect.php?video=";
            //$scope.ons.notification.alert({message: ""+ mp4url + id,title: "intellibanks"});
            video.src = mp4url + id;
        }
            //video.src = mp4url + misDatos.url;
      //videosource.setAttribute('src', misDatos.url);
    //$("#myvideo > source").attr("src", misDatos.url); ​
  });
  