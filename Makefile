clean:
	rm -rf public

dependencies:
	npm install && git submodule update -f --init --recursive

serve: dependencies
	hugo server --minify \
		--buildDrafts \
		--buildFuture

production-build: dependencies
	hugo --minify

preview-build: dependencies
	hugo \
		--baseURL $(DEPLOY_PRIME_URL) \
		--buildDrafts \
		--buildFuture \
		--minify
