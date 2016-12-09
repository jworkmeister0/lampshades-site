(function(){

  $(function(){
    var $pageList = $("#pages");

    checkUrlHash();
    applyRandomness();
    applyEventListeners();

    function applyRandomness(){
      var navHoverRand = makeRandomizer(1, 9);
      var jumboRando = makeRandomizer(7, 9);

      $(".jumbotron").addClass(jumboRando.getNextRandClass());

      $.each($("#main-nav").children(), function(){
        $(this).addClass(navHoverRand.getNextRandClass());
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
    }

    function showPage(pageName){
      var pageId = pageName.split("#").join("") + "-page";
      $pageList.children("div.page").each(function(){
        if($(this).attr("id") === pageId){
          $(this).fadeIn();
        } else{ 
          $(this).hide(); 
        }
      });
    }
  });


  function makeRandomizer(min, max){
    var arr = [];
    var index = 0;
    var className = "nav-rand-hover-";

    for (var i = min; i <= max; i++){
      arr.push(i);
    }

    arr = shuffle(arr);

    return {
      getNextRand: function(){
        index += 1;
        if (index >= arr.length){
          index = index % arr.length;
        }
        return arr[index];
      },
      getNextRandClass: function(){
        var className = "nav-rand-hover-";
        className += this.getNextRand();
        //console.log(className);
        return className;
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
