// default
module.exports = ( args ) => {

}

// display info
tell("Music Extension is loaded. Enter 'play()' to let it ring.");

// vars
var Tone = require("./tone.js");
var synth = new Tone.Synth().toMaster();


// play
module.exports.play = ( ) => {

  return "done";
}

// let the world know
function tell(what) {

  var notebook = document.getElementById(KaryGraph.NotebookId);
  var prompt = document.getElementsByClassName(KaryGraph.NotebookPromptClass)[0];
  var html = KaryGraph.UI.Programmer.GenerateSayHTML(what);
  var row = document.createElement('div');
  row.className = KaryGraph.NotebookResultRowClass;
  row.innerHTML = html;
  notebook.insertBefore( row , prompt );

}


// inject commands.js
script = document.createElement("script");
script.type = "text/javascript";
script.src = path.join(__dirname, "commands.js");
document.getElementsByTagName("head")[0].appendChild(script);
