# immersive-template

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

This project is our go-to tool for generating multipage, off-platform immersive story presentations.

A few key features:
- a Grunt and Handlebars-driven generator that bakes out flat HTML files
- a Connect server for development with livereload
- ready-to-tweak Bootstrap styles and scripts, compiled with Grunt
- partials for often-used elements (photo blocks of various sizes, Brightcove videos, etc.)
- helpers for common tasks (nav and URL generation)
- sample Apache configs for serving it off of the existing Cox infrastructure

## Requirements

- Node.js
- Grunt
- Bower

## Setup

Download and unpack this repo:
```
$ curl -OL https://github.com/statesman/immersive-template/archive/master.zip
$ unzip master.zip -d YOUR_PROJECT_NAME
$ cd YOUR_PROJECT_NAME
```
Install dependencies:
```
$ npm install
$ bower install
```

## Usage

### Project structure

First things first, you should probably understand where everything lives and what all of these folders are for:

`helpers/`: contains Handlebars helpers, which are structured as Node.js modules (in the [CommonJS](http://wiki.commonjs.org/wiki/CommonJS) format).

`layouts/`: these are Handlebars templates that are used to wrap the content you create in the `pages/` folder

`pages/`: this is your content and everything that's in this folder will be automatically parsed by grunt and made available to users in the `public/` folder

`partials/`: these are little snippets, in the Handlebars partials format, that can be used to generate slideshows, inline photos, etc.

`public/`: in production, this is the folder that actually serves the project (or it can be the only piece of the project you actually move to production)

`src/css/`: `less` files that Grunt will transpile into CSS in `public/dist/style.css`

`src/js/`: JavaScript files that Grunt will concatenate, Uglify and save in `public/dist/scripts.js`

`src/assets/`: This is where images, logos, etc. live. It's the only save place in `dist/` to put things because most everything else in that folder is auto-cleaned by Grunt.

### Adding content

We'll walk though the `pages/index.html` file to (try to) explain how to use this template.

Run `grunt` if you haven't already, which will start the local dev server and open project's home page in your default Web browser.

This tool uses [`grunt-generator`](https://github.com/clavery/grunt-generator) to bake out flat files based on the contents of the `pages/` directory. Each `.html` file in `pages/` is passed through the appropriate Handlebars template in `layouts/`, which, in the case of the [default `story.hbs` template](layouts/story.hbs), wraps it with a nav, Facebook and Twitter meta tags, advertising and drops in scripts and styles.

Because `index.html` is passed through `grunt-generator`, it's treated as a Handlebars template, which means any of the included partials and helpers can be used. Those are documented below.

Each `.html` file in the `pages/` directory also has "frontmatter", which is in JSON format. The following settings are **required** for each page:

```js
{
  "template" : "story", // sets the template from layouts/ to be used
  "title": "Starter template", // will be used as the page title, social share title and etc.
  "description": "This is a starter template", // used as the meta description and social share description
  "thumbnail": "assets/thumbnail.jpg" // a thumbnail for social
}
```

The frontmatter can also be used to create objects that can be passed to the Handlebars helpers. For example, in `index.html` a photo is defined in the frontmatter:

```js
"photo1": {
  "url": "assets/photo.jpg",
  "caption": "newspapers that you'll never read Frontline copyright dingbat CPC, media bias The Weekender WordPress SEO mathewi the notion of the.", // optional
  "credit": "Photographer / Statesman" // optional
}
```

then passed to a Handlebars helper farther down the page to be rendered out as a photo block by `grunt-generator`:

```html
{{> photo-block page.photo1}}
```

Note that in the JSON the context was given a key of `photo1`, then it was passed to the partial as `page.photo1`.

Add more pages by adding additional `.html` files, with the required frontmatter, to the `pages/` directory. Every time you add a page Grunt will automatically build it into a new page in the `public/` folder and refresh your browser.

### Configuring the nav

If you're using the included nav partials (`{{> navbar-thin}}` or `{{> navbar-super}}`) or helpers (`{{navLinks}}` or `{{subNavLinks}}`) you need to configure the nav links they generate by passing them some info in the Gruntfile.

When the nav is compiled, it'll automatically add an active class for the current page and validate each of the links. Watch the Grunt output for any warnings.

Here's an example configuration:

```js
nav: [
  {
    title: "Story 1", // This will be used as the link text
    subtitle: "Explaining story 1", // Optional, used in the super nav
    file: "index", // Should correspond to the file name in pubilc/, without the .html
    children: [ // These are structured the same way as their parent elements, just nested in the children array
      {
        title: "Sub-story 2",
        subtitle: "More on story 2",
        file: "page2"
      },
      {
        title: "Sub-story 3",
        subtitle: "And this is story 3",
        file: "page3"
      }
    ]
  },
  {
    title: "Story 2",
    subtitle: "More on story 2",
    file: "page2"
  }
]
```

### Changing styles

The project is structured so that only the Bootstrap styles you want are compiled into the final `public/dist/style.css` file. To add and remove Bootstrap Less modules, comment/uncomment the corresponding lines in `src/css/custom-bootstrap/bootstrap.less`. To override Bootstrap variables, edit `src/css/custom-bootstrap/variables.less`.

Custom Less modules can be written and stored in `src/css/` then imported into `src/css/style.less` and will have access to all of Bootstrap's mixins and variables.

See Bootstrap's [Using Less](http://getbootstrap.com/css/#less) for more.

### Using JavaScript

New libraries can be added using Bower. For example, to add tabletop:

```
$ bower add tabletop --save
```

Then, add the project's `.js` files to `Grunt.uglify.prod.files`, as we've already done for jQuery and a few other libraries:

```js
'public/dist/scripts.js': [
  'bower_components/jquery/dist/jquery.js',
  'bower_components/underscore/underscore.js',
  'bower_components/imagesloaded/imagesloaded.pkgd.js',
  'bower_components/Slides/source/jquery.slides.js',
  'src/js/call-time.js',
  'src/js/slider.js',
  'src/js/main.js'
]
```

The same applies if you'd like to add any of Bootstrap's JavaScript modules, which **aren't included by default**.

You can also write your own JavaScript modules and save them in `src/js/` and add them to the same Grunt array to have them packaged with the final build.

Everything in the `src/js/` folder is passed through [JSHint](http://jshint.com/). If you get a JShint warning that's unclear, you can look it up at [jslinterrors.com](https://jslinterrors.com/).

### Deploying

There are two ways you can deploy a project created with this template:

1) `git clone` the whole project and use the `.htaccess-sample` to create an `.htaccess` file in the repo's root that serves the app out of the `public/` directory.

2) Copy the contents of the `public/` directory to your deploy location.

## Reference

### Included partials

*Partials can be included using the regular Handlebars convention: `{{> partial-name}}`. They can be passed an optional context, but assume the calling context if none is provided.*

*Any `.hbs` file saved to `partials/` will automatically be made available. The data required data documented below should unless noted be stored in a JavaScript object in the frontmatter and passed.*

---

#### `{{> banner-ad}}`

Markup for a 728px x 90px banner ad on large screens and a 320px x 50px on small screens. Includes Bootstrap classes to show/hide the banners.

---

#### `{{> blockquote context}}`

Markup for a Bootstrap `<blockquote>`

*Example context:*

```js
{
  "text": "Text of the long pull quote would go here.",
  "attribution": "Person of Organization"
}
```

---

#### `{{> cmg-footer-scripts}}`

Analytics code for SiteCatalyst, Quantcast and Chartbeat.

---

#### `{{> cmg-footer-scripts}}`

Analytics code for SiteCatalyst, Quantcast and Chartbeat.

---

#### `{{> cmg-header-scripts}}`

Google Ads code and analytics code for Quantacast and Chartbeat.

---

#### `{{> facebook context}}`

A Facebook post panel that includes the original post and a permalink to the original post.

*Example context:*

```js
{
  "name": "Austin American-Statesman",
  "screen_name": "statesman",
  "text": "Fifth U.S. Circuit Court of Appeals declines to take up UT's Fisher case en banc. Fisher's option is to appeal to the Supreme Court.",
  "id": "10152898814129208",
  "image": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpa1/v/t1.0-1/p48x48/1016320_10152241897839208_765057284_n.jpg?oh=b71da201658fa913d8b4f2565a740742&oe=55201378&__gda__=1424850128_0f95e0cf75fce1b453782a241786791c"
}
```

---

#### `{{> linklist context}}`

A link list, rendered as an unordered list in a Bootstrap panel with FontAwesome list icons.

*Example context:*

```js
{
  "title": "Related stories",
  "links": [{
    "name": "Link 1",
    "url": "#"
  }, {
    "name": "Link 2",
    "url": "#"
  }, {
    "name": "Link 3",
    "url": "#"
  }]
}
```

---

#### `{{> meta}}`

Generates OpenGraph tags for Facebook, Twitter card tags for Twitter and canonical and description `<meta>` tags.

All needed data are pulled from the global context and compile time.

---

#### `{{> navbar-super}}`

A Bootstrap nav that's thicker, has descriptions for each link and by default disappears as the user scrolls.

*For more information on adding links to the nav, see **Configuring the nav**.*

---

#### `{{> navbar-thin}}`

A thin Bootstrap nav that's persistent (fixed to the top of the window) and includes share icons.

*For more information on adding links to the nav, see **Configuring the nav**.*

---

#### `{{> photo-block context}}`, `{{> photo-full context}}`

Pre-built photo panels that can be dropped into stories. You'll need to see that the photo is properly sized and stored in the `public/assets/` directory.

*Example context:*

```js
{
  "url": "assets/photo.jpg",
  "caption": "newspapers that you'll never read Frontline copyright dingbat CPC, media bias The Weekender WordPress SEO mathewi the notion of the.", // optional
  "credit": "Photographer / Statesman" // optional
}
```

---

#### `{{> scripts}}`

Our scripts, along with the concatenated and Uglify-ed Bower scripts.

---

#### `{{> slider}}`

A responsive slider that listens for touch events and has a display area for captions. This generates that markup required for the custom slider module in `src/js/slider.js`. It wraps it in a slider case, which `src/js/main.js` uses to initialize the slider.

*Example context:*

```js
{
  "images": [{
    "url": "assets/photo1.jpg",
    "caption": "newspapers that you'll never read Frontline copyright dingbat CPC, media bias The Weekender WordPress SEO mathewi the notion of the.",
    "credit": "Photographer / Statesman"
  }, {
    "url": "assets/photo2.jpg",
    "caption": "newspapers that you'll never read Frontline copyright dingbat CPC, media bias The Weekender WordPress SEO mathewi the notion of the.",
    "credit": "Photographer / Statesman"
  }, {
    "url": "assets/photo3.jpg",
    "caption": "newspapers that you'll never read Frontline copyright dingbat CPC, media bias The Weekender WordPress SEO mathewi the notion of the.",
    "credit": "Photographer / Statesman"
  }]
}
```

---

#### `{{> styles}}`

Project styles, compiled by Grunt.

---

#### `{{> tweet context}}`

An embedded Twitter status, with links that point to Twitter's [Web intents](https://dev.twitter.com/web/intents) URLs for replying, retweeting and favoriting.

*Example context:*

```js
{
  "name": "Ralph Haurwitz",
  "screen_name": "ralphhaurwitz",
  "image": "https://pbs.twimg.com/profile_images/1097015353/Picture_277.png",
  "text": "Fifth U.S. Circuit Court of Appeals declines to take up UT's Fisher case en banc. Fisher's option is to appeal to the Supreme Court.",
  "id": "532618297662242816"
}
```

---

#### `{{> video-block-brightcove context}}`

A responsive, chromeless Brightcove video player. It's made responsive using Bootstrap's [responsive embed](http://getbootstrap.com/components/#responsive-embed).

*Example conext:*

```js
{
  "playerID": "2305729465001",
  "playerKey": "AQ~~,AAAAAFSNjfU~,4oPitrNpKqxve-TuA7jvGHefnd3bNl1A",
  "videoPlayer": "3595824850001"
}
```

### Included helpers

*Helpers can be used using the regular Handlebars convention: `{{helper context}}` for regular helpers and `{{#helper}}{{/helper}}` for block helpers. They can be passed an optional context, but have access to the global context if none is provided.*

*Any `.js` file saved to `helpers/` will automatically be made available. Helpers should be written in CommonJS format; they'll be automatically be registered by their filename. The data required data documented below should unless noted be stored in a JavaScript object in the frontmatter and passed.*

---

#### `{{cutline caption credit}}`

Outputs a `<p>`-wrapped cutline, with a right-aligned, `<em>`-wrapped photo credit. This is used in the slideshow partial and all photo partials. Both caption and credit are optional.

*Example usage:*
```html
{{cutline 'Someone does something somewhere.' 'Photographer / Statesman'}}
```

*Example output:*
```html
<p class="caption clearfix">Someone does something somewhere. <em class="pull-right">Photographer / Statesman</em></p>
```

---

#### `{{#markdown}}{{/markdown}}`

A block helper that will render the wrapped markdown string into HTML.

*Example usage:*
```html
{{#markdown}}
  # Markdown for what
{{/markdown}}
```

*Example output:*
```html
<h1>Markdown for what</h1>
```

---

#### `{{navLinks}}`, `{{subNavLinks}}`

These are the helpers responsible for the navs and subnavs used in the nav partials above. They're a bit complex, so it's best to just check out their source for an understanding of how they work.

---

#### `{{projectUrl filename}}`

Generate an absolute URL to a project asset. This is mostly unnecessary because relative URLs will usually suffice, but it's used to generate URLs in places like social meta tags where absolute URLs are required.

*Example usage:*
```html
{{projectUrl 'assets/photo.jpg'}}
```

*Example output:*
```html
<!-- Assuming grunt.generator.TASK.options.base is set to http://projects.statesman.com/my-project/ -->
http://projects.statesman.com/my-project/assets/photo.jpg
```

---

#### `{{share network}}`

Generates a share button using a FontAwesome icon and the network's sharing URL.

*Example usage:*
```html
{{share 'facebook'}}
```

*Example output:*
```html
<a target="_blank" href="https://www.facebook.com/sharer.php?u=http%3A%2F%2Fprojects.statesman.com%2Ftemplates%2Fimmersive%2F">
  <i class="fa fa-facebook-square"></i>
</a>
```

## Copyright

&copy; 2014 Austin American-Statesman
