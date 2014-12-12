
Promise = require('bluebird')
{exec,cat}  = require('shelljs')
uid     = require('uid')

_module = ->

    process = (block, opts) ->
      params = opts.params
      new Promise (resolve, preject) ->

        if opts.target-mode != "pdf"

              temp-prefix = uid(7)
              temp-file = "#{opts.tmpdir}/#{temp-prefix}.dia"
              block.to(temp-file)
              cmd = "#{__dirname}/node_modules/.bin/ascidia-cli -t svg #temp-file"
              exec cmd, {+async, +silent}, (code, output) ->

                if not code
                    output = cat("#{opts.tmpdir}/#{temp-prefix}.svg")
                    resolve(output)
                else
                    resolve("```{ascidia}#output```")

        else
          resolve("```{ascidia #params}#block```")

    iface = {

      process: process

    }
              
    return iface
               
module.exports = _module()






