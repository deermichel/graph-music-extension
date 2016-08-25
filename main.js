// default
module.exports = (args) => {

}

// display info
tell("Music Extension is loaded. Enter 'play()' to let it ring.");

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

foralldots(function (dot) {

  // dot.SnapCircle.mousedown(function() {
  //   previewNote = toNote(dot.Position.Y);
  //   synth.triggerAttackRelease(previewNote, "8n");
  // });
  //
  // dot.SnapCircle.mousemove(function() {
  //   console.log(dot.Position.Y);
  //   if (toNote(dot.Position.Y) != previewNote) {
  //     previewNote = toNote(dot.Position.Y);
  //     synth.triggerAttackRelease(previewNote, "8n");
  //   }
  // });

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


// inject commands.js
script = document.createElement("script");
script.type = "text/javascript";
script.src = path.join(__dirname, "commands.js");
document.getElementsByTagName("head")[0].appendChild(script);
