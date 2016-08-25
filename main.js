// default
module.exports = (args) => {

}

// display info
tell("Music Extension is loaded. Move some dots and enter 'play()' to let it ring.");

// vars
var Tone = require("./tone.js");
var synth = new Tone.Synth().toMaster();
var resolution = 24;
var rootNote = "C3";
var tempo = 120;
var previewNote = "";


// play
module.exports.play = () => {

  foralldots(function (dot) {

      var note = toNote(dot.Position.Y);
      setTimeout(function() {
        synth.triggerAttackRelease(note, "8n");
      }, dot.NumberId * (60000 / tempo));

  });

  return "done";
}

// drag listener (TODO: include new dots)
foralldots(function (dot) {

  dot.SnapCircle.drag(function() { // move

    if (toNote(dot.Position.Y) != previewNote) {
      previewNote = toNote(dot.Position.Y);
      synth.triggerAttackRelease(previewNote, "8n");
    }

  }, function() { // start

    previewNote = toNote(dot.Position.Y);
    synth.triggerAttackRelease(previewNote, "8n");

  });

});


// helper funcs

// convert y value to note
function toNote(y) {

  var offsetY = height() - y;
  var value = Math.round(offsetY / (height() / resolution));
  if (value < 0) value = 0;
  if (value >= resolution) value = resolution;

  return Tone.Frequency(rootNote).transpose(value).toNote();
}

// let the world know
function tell(what) {

  var notebook = document.getElementById(KaryGraph.NotebookId);
  var prompt = document.getElementsByClassName(KaryGraph.NotebookPromptClass)[0];
  var html = KaryGraph.UI.Programmer.GenerateSayHTML(what);
  var row = document.createElement("div");
  row.className = KaryGraph.NotebookResultRowClass;
  row.innerHTML = html;
  notebook.insertBefore(row, prompt);

}


// init extension

// customize ribbon bar
var ribbonBar = document.getElementById("graph-and-ribbon-half").getElementsByClassName("ribbon unselectable")[0];
var separator = document.createElement("div");
separator.className = "ribbon-separator";
var playIcon = document.createElement("div");
playIcon.className = "ribbon-icon";
playIcon.innerHTML = "Play";
playIcon.style.backgroundImage = "url('" + path.join(__dirname, "playicon.png") + "')";
ribbonBar.insertBefore(playIcon, ribbonBar.children[ribbonBar.children.length - 1]);
ribbonBar.insertBefore(separator, playIcon);

// play click listener
playIcon.addEventListener("click", function() {
  play();
});

// inject commands.js
script = document.createElement("script");
script.type = "text/javascript";
script.src = path.join(__dirname, "commands.js");
document.getElementsByTagName("head")[0].appendChild(script);
