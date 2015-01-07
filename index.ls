
Promise = require('bluebird')
{exec,cat}  = require('shelljs')
uid     = require('uid')

cwd = process.cwd()

_module = ->

    pic-num = 0

    process = (block, opts) ->

      default-is-svg = { 

         cmd: (block, tmp-file, tmp-dir) -> 
            block.to("#tmp-dir/#tmp-file.dia")
            return "#{__dirname}/node_modules/.bin/ascidia-cli -t svg #tmp-dir/#tmp-file.dia > /dev/null && cat #tmp-dir/#tmp-file.svg"

         output: (tmp-file, tmp-dir, output) -> cat("#tmp-dir/#tmp-file.svg")
         }

      targets = {
        
        default: default-is-svg
        svg: default-is-svg

        png: {
          cmd: (block, tmp-file, tmp-dir) -> 
            block.to("#tmp-dir/#tmp-file.dia")
            return "#{__dirname}/node_modules/.bin/ascidia-cli -t png #tmp-dir/#tmp-file.dia > /dev/null && cat #tmp-dir/#tmp-file.png | base64"

          output: (tmp-file, tmp-dir, output) -> '\n <img class="exemd--diagram exemd--diagram__ascidia" src="data:image/png;base64,' + output + '" /> \n'  
        }

        pdf: {
          cmd: (block, tmp-file, tmp-dir) ->
            block.to("#tmp-dir/#tmp-file.dia")
            cc = [
              "#{__dirname}/node_modules/.bin/ascidia-cli -t png #tmp-dir/#tmp-file.dia > /dev/null"
              "mkdir -p #cwd/figures"
              "cat #tmp-dir/#tmp-file.png > #cwd/figures/f-ascidia-#{pic-num}.png"
            ]
            return cc * ' && '

          output: (tmp-file, tmp-dir, output) ->
             fname = "#cwd/figures/f-ascidia-#{pic-num}.png"
             pic-num := pic-num + 1
             return "![](#fname)"

        }
      }

      opts.plugin-template(targets, block, opts)

    iface = {
      process: process
    }
              
    return iface
               
module.exports = _module()







