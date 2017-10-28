
$(function() {

function welcomeGuide(){
  var stage = 1;
  function showStage() {
    $(".stage").hide();
    $(".q"+stage).show();
    if(stage==3) {
      setTimeout(function() {
        document.location.href="index.html";
      }, 2500);

    }
  }
  showStage();

  $(document).keypress(function(e) {
    if(e.which == 13) {
        stage++;
        showStage();
    }
  });
}

if($("body").hasClass("welcome")) {
  welcomeGuide();
}

});
