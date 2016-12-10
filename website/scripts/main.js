(function(){

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
			});
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
