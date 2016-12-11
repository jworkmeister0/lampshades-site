(function(){

	var HTML = {
		play: '<span class="glyphicon glyphicon-play" aria-hidden="true"></span>',
		stop: '<span class="glyphicon glyphicon-stop" aria-hidden="true"></span>',
		arrowDown: '<span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span>',
		arrowUp: '<span class="glyphicon glyphicon-menu-up" aria-hidden="true"></span>',
		dollar: '<span class="glyphicon glyphicon-usd" aria-hidden="true"></span>',
	};

	$(function(){
		var $pageList = $("#pages");

		checkUrlHash();
		applyRandomness();
		applyEventListeners();

		function applyRandomness(){
			var navHoverRand = makeRandomizer(1, 9);
			var jumboRando = makeRandomizer(1, 3);

			$(".jumbotron").addClass(jumboRando.getNextJumbotronClass());

			$.each($("#main-nav").children(), function(){
				$(this).addClass(navHoverRand.getNextNavClass());
			});

		}

		function checkUrlHash(){
			if (!window.location.hash){
				showPage("news");
			}
			else{
				showPage(window.location.hash);
			}
		}

		function applyEventListeners(){
			window.onhashchange = function(e){
				showPage(window.location.hash);
			};

			$(".jumbotron").click(function(){
				$("body").toggleClass("inverted");
				$(".space1").toggleClass("img-invert");
				$(".space2").toggleClass("img-invert");
				$(".mountain").toggleClass("img-invert");
			});

			$(window).on("load resize", applySpotifyEmbedHack);

			$.each($(".album"), function(i, elt){
				var $playButton      = $(elt).find(".album-listen");
				var $buyButton       = $(elt).find(".album-buy");
				var $playerContainer = $(elt).find(".hidden-player");
				var $player          = $playerContainer.find("iframe");

				$playButton.html(" Listen     " + HTML.play);
				$buyButton.html("Buy " + HTML.dollar);

				// initially hide all player container
				$playerContainer.toggle();

				$playButton.click(function(){

					if ($player.is(":hidden")){
						$playButton.html("Hide " + HTML.stop);
						$player.attr("src", $player.data("src"));
						$playerContainer.fadeIn();
						$player.css("width", parseInt($playerContainer.css('width')) - 2);
					}else{
						$playButton.html("Listen     " + HTML.play);
						$player.attr("src", "");
						$playerContainer.fadeOut();
					}
				});

			});


			function applySpotifyEmbedHack(){
				$('iframe').each( function() {
					$(this).css('width', parseInt($(this).parent().css('width')) - 2);
				});
			}

		}

		function showPage(pageName){
			var pageId = pageName.split("#").join("") + "-page";
			$pageList.children("div.page").each(function(){
				if($(this).attr("id") === pageId){
					$(this).fadeIn();
					$(this).addClass("active");
				} else{
					$(this).hide();
					$(this).removeClass("active");
				}
			});
		}
	});


	function makeRandomizer(min, max){
		var arr = [];
		var index = 0;
		var CLASS_NAMES = {
			navHover: "nav-rand-hover-",
			jumbo: "header-rand-"
		};

		for (var i = min; i <= max; i++){
			arr.push(i);
		}

		arr = shuffle(arr);

		return {
			getRand: function(){
				index += 1;
				if (index >= arr.length){
					index = index % arr.length;
				}
				return arr[index];
			},
			getNextNavClass: function(){
				return (CLASS_NAMES.navHover + this.getRand());
			},
			getNextJumbotronClass: function(){
				return (CLASS_NAMES.jumbo + this.getRand());
			},
			reshuffle: function(){
				arr = shuffle(arr);
			}
		};

		function shuffle(array) {
			var currentIndex = array.length, temporaryValue, randomIndex;

			// While there remain elements to shuffle...
			while (0 !== currentIndex) {

				// Pick a remaining element...
				var rand = new Date().getMilliseconds();
				randomIndex = Math.floor(Math.random() * currentIndex );
				currentIndex -= 1;

				// And swap it with the current element.
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}

			return array;
		}
	}

}());
