# Web Base Workflow

Base workflow that manages frontend dependencies and deployment.

Workflow is based off of pwnjack prime repo - https://github.com/pwnjack/prime

## Features

- Dependencies installation via Bower including HTML injection
- LiveReload webserver for instant browser updates
- Code and images minimization for <code>/public</code> version
- Stylus CSS preprocessor
- Handlebars JS

## Setup

Download this git and install it's dev dependencies:

	git clone https://github.com/royboy5/WebBase.git

	cd WebBase

	npm install

Install default packages:

	bower install

## Usage

Install your own packages:

	bower install --save package-name

Start to develop your project:

	gulp

When you are done, build for production:

	gulp build

## More commands

If you add more dependencies later on, run this command to inject their reference tags in your HTML

	gulp inject

Restart the live-preview webserver (In case of post-injection or syntax errors in your code)

	gulp serve

## Workflow

Simply use the <code>gulp</code> command and work on the <code>/dev</code> folder while previewing it in your favorite browser, when ready to deploy just use the <code>gulp build</code> command and you'll find your production-optimized webapp into the <code>/public</code> folder, ready to be published.

## Updates

Added "Fail" Reporter to jshint, so the build process will fail if there are errors while linting.

Updated .gitignore folders to include /public
