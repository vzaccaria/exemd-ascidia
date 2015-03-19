var {
  cat
} =
require('shelljs')

var picnum = 0

var pdfAscidiaCmd = (file, type) => {
  "use strict"
  return `${__dirname}/node_modules/.bin/ascidia-cli -c 20 -t ${type} '${file}.dia' > /dev/null `
}

var ascidiaCmd = (file, type) => {
  "use strict"
  return `${__dirname}/node_modules/.bin/ascidia-cli -t ${type} '${file}.dia' > /dev/null && cat '${file}.${type}'`
}


var generateSvg = () => {
  "use strict"
  return {
    cmd: (block, file, dir, params) => {
      var fn = `${dir}/${file}.dia`
      block.to(fn)
      return ascidiaCmd(file, "svg")
    },
    output: (file, dir, output) => {
      return cat(`${dir}/${file}.svg`);
    }
  }
}

var generatePng = () => {
  "use strict"
  return {
    cmd: (block, file, dir, params) => {
      var fn = `${dir}/${file}.dia`
      block.to(fn)
      return `${ascidiaCmd(file, "png")} | base64`
    },
    output: (file, dir, output) => {
      return `\n <img class="exemd--diagram exemd--diagram__ascidia" src="data:image/png;base64,${output}" /> \n`;
    }
  }
}

var generatePdf = () => {
  "use strict"
  return {
    cmd: (block, file, dir, params) => {
      var fn = `${dir}/${file}.dia`
      block.to(fn)
      var cc = [
        `${pdfAscidiaCmd(file, "svg")}`,
        `mkdir -p './figures'`,
        `cat '${dir}/${file}.svg' | rsvg-convert -z 0.5 -f pdf > './figures/f-dot-${picnum}.pdf'`,
        `echo './figures/f-dot-${picnum}.pdf'`
      ]
      picnum = picnum + 1
      return cc.join(' && ')
    },
    output: (file, dir, output) => {
      var fname = output
      return `![](${fname})`
    }
  }
}


var _module = () => {
  "use strict";

  var getTargets = () => {
    var targets = {
      default: generateSvg(),
      svg: generateSvg(),
      pdf: generatePdf(),
      png: generatePng()
    }
    return targets
  }

  var process = (block, opts) => {
    return opts.pluginTemplate(getTargets(), block, opts)
  }

  return {
    getTargets,
    process
  }
}

module.exports = _module()