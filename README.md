# Brightspot JS Templates

This plugin is used to seamlessly transform JSON test data using Handlebar templates. The specific use case is our Brightspot Base based projects and the static styleguide and test pages using test data. The options you can set in the HTML would allow you to use it in other use cases though. 

## Usage

1) Create your JSON test object. You can specify the handlebar template to use for transformation via the `_template` key, and also specify parts of your JSON objects to be pulled in via AJAX using the `_dataUrl` key. Example: 

	{
		"_template" : "components/bsp-gallery-module",

		"options" : {
			"carouselDots" : false
		},

		"galleryTitle" : "5 slides, no dots, no thumbs",

		"gallerySlides" : [
			{ 
				"_dataUrl" : "/common/image-1200x400.json"
			},
			{ 	
				"_dataUrl" : "/bsp-list-promo/5-items.json"
			},
			{ 	
				"_dataUrl" : "/common/link-with-1200x400-image.json"
			},
			{ 
				"_dataUrl" : "/common/image-1200x400.json"
			},
			{ 
				"_dataUrl" : "/common/image-1200x400.json"
			}
		]
	}

2) Have your Handlebar template ready. The JS defaults to the "/webapp/render" folder as the default. In this case, we have our "render/components/bsp-gallery.module.hbs" ready. Example: 

	<div class="bsp-component">
		{{#if galleryTitle}}
			<h3 class="bsp-component-title">{{galleryTitle}}</h1>
		{{/if}}

		<div class="bsp-component-content">

			<div class="gallery-module gallery-module-{{#if options.carouselDots}}carousel-dots{{/if}}" data-bsp-carousel data-bsp-carousel-options='{ "theme" : "{{#if options.carouselDots}}carousel-dots{{/if}}" }'>
				{{#each gallerySlides}}
					<div class="bsp-carousel-slide">

						{{> (lookup . '_template') }}

					</div>
				{{/each}}
			</div>

		</div>

		{{#if ctaText}}
			<div class="bsp-component-cta">
				<a href="{{ctaLink}}">{{ctaText}}</a>
			</div>	
		{{/if}}	
	</div>

3) Create your HTML file and point your plugin to the JSON test object. Example: 

	<div class="test-wrapper">
		<div data-bsp-template data-bsp-template-options='{ "dataUrl": "/bsp-gallery-module/5-slides.json" }'></div>
	</div>

4) What the plugin will do:

* AJAX in your JSON, crawl through it, find the template it's supposed to use and AJAX that in
* Go through your JSON looking for "_dataUrl" keys and AJAX in all those JSON objects to create a full JSON object
* Recursively crawl through your JSON looking for more "_template" keys and AJAX in those templates
* Register all the templates and their partials with Handlebars
* Compile and output your resulting HTML in the div where you specified the plugin
