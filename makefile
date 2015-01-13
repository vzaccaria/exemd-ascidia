
index.js: index.ls
	echo '#!/usr/bin/env node' > $@
	lsc -p -c $<  >> $@
	chmod +x $@

test.js: test.ls
	lsc -p -c $< > $@

test: index.js test.js
	mocha test.js

clean:
	rm index.js

XYZ = node_modules/.bin/xyz

.PHONY: release-major release-minor release-patch
	
release-major release-minor release-patch:
	@$(XYZ) --increment $(@:release-%=%)
