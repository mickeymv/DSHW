function readFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    useFileContents(e.target.result);
  };
  reader.readAsText(file);
}

function useFileContents(contents) {
    //do anything with the file contents
    
    //finally, put something into the output element
    
    
    var lines = contents.split('\n');
    var str = '';
    for(var line = 0; line < lines.length; line++){
       if(lines[line].charAt(1) != ':' || lines[line].charAt(0) == '#')
          continue;
        if(lines[line].charAt(0)=='H') {
           if(line != lines.length-1){ analyzeH(lines[++line].substr(2));}
        } else if(lines[line].charAt(0)=='A') {
           if(line != lines.length-1){ analyzeA(lines[++line].substr(2));}
        }
    }
    
    $('#ana').html(buildReport());
}

//this is the function that will run when the document is
// completely loaded and ready
$().ready(function() {
    //The argument in the $ function is always a CSS selector
    // Setting Up An Event Handler
    $('#file-input').on('change', function(evtObj) {
        readFile(evtObj);
    });
    
    // Using An Event Handler To Simulate An Event
    $("#do-again-button").click(function() {
        $('#file-input').trigger('change');
    });
});
