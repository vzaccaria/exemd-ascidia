# Makefile autogenerated by Dyi on March 20, 2015
#
# Main target: all
# Sources:  src/index.js  src/test.js  ./verbfile.js 

.DEFAULT_GOAL := all


.PHONY: c-lyakoc2p
c-lyakoc2p: lib/index.js lib/test.js


.PHONY: c-oi6ripkh
c-oi6ripkh: readme.md


.PHONY: build
build: c-lyakoc2p c-oi6ripkh


.PHONY: test
test: k-w2u062hr


.PHONY: docs
docs: k-bmyrefyk


.PHONY: update
update: k-e77nxehi


.PHONY: major
major: k-yyo39j19 k-k7icpc9t


.PHONY: minor
minor: k-e18jeqa5 k-m82wo89o


.PHONY: patch
patch: k-0xh8jktu k-yqde309k


.PHONY: prepare
prepare: lib .




.PHONY: k-vd4jpklx
k-vd4jpklx:  
	cp ./lib/index.js ./index.js


.PHONY: k-83fg63i0
k-83fg63i0:  
	make test


.PHONY: all
all: 
	make build 
	make k-vd4jpklx 
	make k-83fg63i0  


.PHONY: k-w2u062hr
k-w2u062hr:  
	./node_modules/.bin/mocha ./lib/test.js


.PHONY: k-bmyrefyk
k-bmyrefyk:  
	./node_modules/.bin/ascidia-cli -t png 'src/source.dia' > /dev/null && cp 'src/source.png' docs/exemd-ascidia.png


.PHONY: k-e77nxehi
k-e77nxehi:  
	make clean && ./node_modules/.bin/babel configure.js | node


.PHONY: k-yyo39j19
k-yyo39j19:  
	make all


.PHONY: k-k7icpc9t
k-k7icpc9t:  
	./node_modules/.bin/xyz -i major


.PHONY: k-e18jeqa5
k-e18jeqa5:  
	make all


.PHONY: k-m82wo89o
k-m82wo89o:  
	./node_modules/.bin/xyz -i minor


.PHONY: k-0xh8jktu
k-0xh8jktu:  
	make all


.PHONY: k-yqde309k
k-yqde309k:  
	./node_modules/.bin/xyz -i patch


.PHONY: clean
clean:  
	rm -f lib/index.js
	rm -f lib/test.js
	rm -f readme.md




lib/index.js: src/index.js 
	./node_modules/.bin/babel src/index.js -o ./lib/index.js

lib/test.js: src/test.js 
	./node_modules/.bin/babel src/test.js -o ./lib/test.js

readme.md: ./verbfile.js docs/description.md docs/readme.md 
	./node_modules/.bin/verb

lib: 
	mkdir -p lib

.: 
	mkdir -p .

