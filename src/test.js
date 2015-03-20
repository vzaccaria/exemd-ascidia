var chai = require('chai')
chai.use(require('chai-as-promised'))
var should = chai.should()
var expect = chai.expect
var {
  rm
} = require('shelljs')

/*global describe, it */

var dotFile = `
Example file.
`

describe('#module', () => {
  "use strict"
  it('should load the module', () => {

    var mod = require('..')
    should.exist(mod)

  })
})

describe('#getTargets', () => {
  "use strict"
  it('should generate an svg file', () => {

    var {
      cmd, output
    } = require('..').getTargets().svg

    should.exist(cmd)
    should.exist(output)

    var cc = cmd(dotFile, "tmp", ".", "opts")
    "tst".to("./tmp.svg")
    var o = output("tmp", ".", "svg")

    expect(cc).to.have.string("exemd-ascidia/node_modules/.bin/ascidia-cli -t svg \'./tmp.dia\' > /dev/null && cat \'./tmp.svg\'")
    o.should.be.equal("tst")

    rm("-f", "./tmp.dia")
    rm("-f", "./tmp.svg")
  })

  it('should generate a png file', () => {

    var {
      cmd, output
    } = require('..').getTargets().png

    should.exist(cmd)
    should.exist(output)

    var cc = cmd(dotFile, "tmp", ".", "opts")
    "tst".to("./tmp.png")
    var o = output("tmp", ".", "tst")

    expect(cc).to.have.string("exemd-ascidia/node_modules/.bin/ascidia-cli -t png \'./tmp.dia\' > /dev/null && cat \'./tmp.png\' | base64")
    o.should.be.equal(`\n <img class="exemd--diagram exemd--diagram__ascidia" src="data:image/png;base64,tst" /> \n`)

    rm("-f", "./tmp.dia")
    rm("-f", "./tmp.png")
  })

  it('should generate a pdf file', () => {

    var {
      cmd, output
    } = require('..').getTargets().pdf

    should.exist(cmd)
    should.exist(output)
    var cc = cmd(dotFile, "tmp", ".", "opts")
    "tst".to("./tmp.svg")
    var o = output("tmp", ".", "./figures/f-dot-0.pdf")

    expect(cc).to.have.string("exemd-ascidia/node_modules/.bin/ascidia-cli -c 20 -t svg \'./tmp.dia\' > /dev/null  && mkdir -p \'./figures\' && cat \'./tmp.svg\' | rsvg-convert -z 0.5 -f pdf > \'./figures/f-ascidia-0.pdf\' && echo \'./figures/f-ascidia-0.pdf\'")
    o.should.be.equal("![](./figures/f-dot-0.pdf)")

    rm("-f", "./tmp.dia")
    rm("-f", "./tmp.svg")
  })
})