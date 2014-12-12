// Generated by LiveScript 1.3.1
(function(){
  var should, sinon, b, ref$, mkdir, rm, process, notifiesOnFail, notifiesOnSuccess, result;
  should = require('should');
  sinon = require('sinon');
  b = require('bluebird');
  ref$ = require('shelljs'), mkdir = ref$.mkdir, rm = ref$.rm;
  process = require('./index.js').process;
  notifiesOnFail = function(p, cb){
    return p.then(function(it){
      return cb(it);
    }, function(){
      return cb();
    });
  };
  notifiesOnSuccess = function(p, cb){
    return p.then(function(){
      return cb();
    }, function(it){
      return cb(it);
    });
  };
  rm('-rf', './testdir');
  mkdir('-p', './testdir');
  result = "<?xml version=\"1.0\" ?>\n<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n\t<rect fill=\"rgb(255,255,255)\" fill-opacity=\"1\" height=\"48\" stroke=\"none\" stroke-opacity=\"1\" stroke-width=\"0.0\" width=\"96\" x=\"0\" y=\"0\"/>\n\t<line stroke=\"rgb(0,0,0)\" stroke-opacity=\"1.0\" stroke-width=\"2.5\" x1=\"12\" x2=\"72\" y1=\"36\" y2=\"36\"/>\n\t<line stroke=\"rgb(0,0,0)\" stroke-opacity=\"1.0\" stroke-width=\"2.5\" x1=\"74\" x2=\"84\" y1=\"30\" y2=\"36\"/>\n\t<line stroke=\"rgb(0,0,0)\" stroke-opacity=\"1.0\" stroke-width=\"2.5\" x1=\"74\" x2=\"84\" y1=\"42\" y2=\"36\"/>\n\t<line stroke=\"rgb(0,0,0)\" stroke-opacity=\"1.0\" stroke-width=\"2.5\" x1=\"72\" x2=\"84\" y1=\"36\" y2=\"36\"/>\n</svg>\n";
  describe('plugin output', function(){
    return describe('svg output', function(empty){
      return it('should be correct', function(done){
        var test;
        test = process("\n -----> \n", {
          tmpdir: './testdir'
        }).then(function(it){
          return it.should.be.equal(result);
        });
        return notifiesOnSuccess(test, done);
      });
    });
  });
}).call(this);