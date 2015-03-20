"use strict";

var _require = require("shelljs");

var cat = _require.cat;

var picnum = 0;

var pdfAscidiaCmd = function (file, dir, type) {
  "use strict";
  return "" + __dirname + "/node_modules/.bin/ascidia-cli -c 20 -t " + type + " '" + dir + "/" + file + ".dia' > /dev/null ";
};

var ascidiaCmd = function (file, dir, type) {
  "use strict";
  return "" + __dirname + "/node_modules/.bin/ascidia-cli -t " + type + " '" + dir + "/" + file + ".dia' > /dev/null && cat '" + dir + "/" + file + "." + type + "'";
};

var generateSvg = function () {
  "use strict";
  return {
    cmd: function (block, file, dir, params) {
      var fn = "" + dir + "/" + file + ".dia";
      block.to(fn);
      return ascidiaCmd(file, dir, "svg");
    },
    output: function (file, dir, output) {
      return cat("" + dir + "/" + file + ".svg");
    }
  };
};

var generatePng = function () {
  "use strict";
  return {
    cmd: function (block, file, dir, params) {
      var fn = "" + dir + "/" + file + ".dia";
      block.to(fn);
      return "" + ascidiaCmd(file, dir, "png") + " | base64";
    },
    output: function (file, dir, output) {
      return "\n <img class=\"exemd--diagram exemd--diagram__ascidia\" src=\"data:image/png;base64," + output + "\" /> \n";
    }
  };
};

var generatePdf = function () {
  "use strict";
  return {
    cmd: function (block, file, dir, params) {
      var fn = "" + dir + "/" + file + ".dia";
      block.to(fn);
      var cc = ["" + pdfAscidiaCmd(file, dir, "svg"), "mkdir -p './figures'", "cat '" + dir + "/" + file + ".svg' | rsvg-convert -z 0.5 -f pdf > './figures/f-ascidia-" + picnum + ".pdf'", "echo './figures/f-ascidia-" + picnum + ".pdf'"];
      picnum = picnum + 1;
      return cc.join(" && ");
    },
    output: function (file, dir, output) {
      var fname = output;
      return "![](" + fname + ")";
    }
  };
};

var _module = function () {
  "use strict";

  var getTargets = function () {
    var targets = {
      "default": generateSvg(),
      svg: generateSvg(),
      pdf: generatePdf(),
      png: generatePng()
    };
    return targets;
  };

  var process = function (block, opts) {
    return opts.pluginTemplate(getTargets(), block, opts);
  };

  return {
    getTargets: getTargets,
    process: process
  };
};

module.exports = _module();
