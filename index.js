#!/usr/bin/env node
// Generated by LiveScript 1.3.1
(function(){
  var Promise, ref$, exec, cat, uid, _module;
  Promise = require('bluebird');
  ref$ = require('shelljs'), exec = ref$.exec, cat = ref$.cat;
  uid = require('uid');
  _module = function(){
    var process, iface;
    process = function(block, opts){
      var params;
      params = opts.params;
      return new Promise(function(resolve, preject){
        var tempPrefix, tempFile, cmd;
        if (opts.targetMode !== "pdf") {
          tempPrefix = uid(7);
          tempFile = opts.tmpdir + "/" + tempPrefix + ".dia";
          block.to(tempFile);
          cmd = __dirname + "/node_modules/.bin/ascidia-cli -t svg " + tempFile;
          return exec(cmd, {
            async: true,
            silent: true
          }, function(code, output){
            if (!code) {
              output = cat(opts.tmpdir + "/" + tempPrefix + ".svg");
              return resolve(output);
            } else {
              return resolve("```{ascidia}" + output + "```");
            }
          });
        } else {
          return resolve("```{ascidia " + params + "}" + block + "```");
        }
      });
    };
    iface = {
      process: process
    };
    return iface;
  };
  module.exports = _module();
}).call(this);
