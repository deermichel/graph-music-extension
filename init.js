module.exports = ( args ) => {

}

// inject Tone.js
var script = document.createElement("script");
script.type = "text/javascript";
script.src = path.join(__dirname, "tone.js");
document.getElementsByTagName("head")[0].appendChild(script);

// inject main.js
script = document.createElement("script");
script.type = "text/javascript";
script.src = path.join(__dirname, "main.js");
document.getElementsByTagName("head")[0].appendChild(script);
