# AngularJS Website Builder

To help start web projects using AngularJS and the [Skeleton Sass framework](https://github.com/atomicpages/skeleton-sass)

## Demo

You can see the builder in action here: [http://]()

## Installation

**Install bower dependencies (angular etc..) via command line:**
```javascript
 $ bower install 
  ```

**Install node dependencies (gulp etc..) via command line:**
```bash
 $ npm install 
  ```
  
**Move bower dependencies into a vendor folder using gulp:**
*This command also concatenates the vendor JS into a file called **bundle.js** and puts it into the Dist folder.*
 ```bash
 $ gulp build
  ```
**Watch** (http://localhost:8080)
 ```bash
 $ gulp 
  ```
  
## Usage

#### Gulp Config
You can alter the folder structure of the builder using the config variable in the [gulpfile.js](https://github.com/tim-giblin/angular-website-builder/blob/master/gulpfile.js#L14)
```javascript
var config = {
	appFolder : './app/',
	sassFolder : 'sass', // ./app/sass/
	cssFolder : 'css', // ./dist/css/
	jsFolder : 'js', // ./app/js/ or ./dist/js/
	vendorFolder : '/lib', // ./app/js/lib/
	outputFolder : './dist/',
	angularFolder: function() { return this.appFolder+this.jsFolder+'/app'}, // ./app/js/app/
	appJs : function() { return this.appFolder+this.jsFolder},
	appSass : function() { return this.appFolder+this.sassFolder },
	outputJs : function() { return this.outputFolder+this.jsFolder},
	outputSass : function() { return this.outputFolder+this.cssFolder },
};
```
#### Sass
Folder structure is based on the [Scooter framework](https://github.com/dropbox/scooter/tree/master/scss), some mixins have been taken from that framework also. 
A great mixin is the [debug mixin](https://github.com/tim-giblin/angular-website-builder/blob/master/app/sass/mixins/_debug.scss) that gives you feedback in the DOM if a selector is used outside of a given context. So it detects misused elements in BEM. This feature can be toggled using the variable [here](https://github.com/tim-giblin/angular-website-builder/blob/master/app/sass/variables/_config.scss):
```sass
$debug: true;
```

#### Angular
The folder structure for the angular app is using the **Application Structure LIFT Principle**

`L`ocating our code is easy
`I`dentify code at a glance
`F`lat structure as long as we can
`T`ry to stay DRY (Don’t Repeat Yourself) or T-DRY

The angular build is also following the [angular style guide from john papa](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)

##### Routes
You can add extra routes in the [app.routes.js](https://github.com/tim-giblin/angular-website-builder/blob/master/app/js/app/app.routes.js) file:
```javascript
{
	title: 'home',
	config: {
		url: '/',
		templateUrl: 'home/home.html', //template location
		controller: 'HomeController as home',
		pageMeta: {
			title: 'Home', // meta title
			description: 'This is the homepage' // meta description
		},
		nav: true // adds the route to the top navigation
	}
}
```
##### Site Config
The website config can be changed in the [app.config.js](https://github.com/tim-giblin/angular-website-builder/blob/master/app/js/app/app.config.js) file:
```javascript
.constant('config', {
			title: 'Angular Website Builder',
			headerClass: 'pageheader' // Header class in base HTML
```

##### Site Pre-loader
The pre-loader will usually disappear once the controller has been activated and page loaded. However I have added a function that uses Angulars $q service and loads functions from the controller. Once they're returned thier promises it will remove the pre-loader and show the page.
This can be used like the following:
```javascript
(function() {
	'use strict';

	angular
		.module('website')
		.controller('AboutController', AboutController);

	AboutController.$inject = ['common']; // don't forget to inject the common module

	/* @ngInject */
	function AboutController(common) {
		var vm = this;
		vm.title = 'AboutController';
		activate();

		////////////////

		function activate() {
		    var test = common.$timeout(function() {
		        console.log('Pre-loader Finished');
            },3000); // load the test object into the activateController method.
			common.activateController([test], 'AboutController'); // after 3 seconds the pre-loader will finish and show 'Pre-loader Finished' in the console
		}
	}
})();
```
If the activateController method is empty it will load a 1 second delay between page loads:
```javascript
common.activateController([], 'AboutController');
```
This is because I've added a fake promise:

```javascript
function addFakePromise() {
    return $timeout(function() {
    },1000); // alter this timer for longer page transitions
}
```
  
## License
Released under the [MIT](https://github.com/tim-giblin/angular-website-builder/blob/master/LICENSE.md) license.
 