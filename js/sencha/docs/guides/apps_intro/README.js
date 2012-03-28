Ext.data.JsonP.apps_intro({"guide":"<h1>Intro to Applications with Sencha Touch 2</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/apps_intro-section-1'>Anatomy of an Application</a></li>\n<li><a href='#!/guide/apps_intro-section-2'>Controllers</a></li>\n<li><a href='#!/guide/apps_intro-section-3'>Stores</a></li>\n<li><a href='#!/guide/apps_intro-section-4'>Device Profiles</a></li>\n<li><a href='#!/guide/apps_intro-section-5'>Launch Process</a></li>\n<li><a href='#!/guide/apps_intro-section-6'>Routing and History Support</a></li>\n<li><a href='#!/guide/apps_intro-section-7'>Further Reading</a></li>\n</ol>\n</div>\n\n<p>Sencha Touch 2 is optimized around building applications that work across multiple platforms. To make the writing of applications as simple as possible, we provide a simple but powerful application architecture that leverages the MVC (Model View Controller) pattern. This approach keeps your code clean, testable and easy to maintain, and provides you with a number of benefits when it comes to writing your apps:</p>\n\n<ul>\n<li><strong>History Support</strong>: full back button support inside your app, and any part of your app can be linked to</li>\n<li><strong>Deep Linking</strong>: share deep links that open any screen in your app, just like linking to a web page</li>\n<li><strong>Device Profiles</strong>: easily customize your application's UI for phones, tablets and other devices while sharing all of the common code</li>\n</ul>\n\n\n<h2 id='apps_intro-section-1'>Anatomy of an Application</h2>\n\n<p>An Application is a collection of Models, Views, Controllers, Stores and Profiles, plus some additional metadata specifying things like application icons and launch screen images.</p>\n\n<p><p class='screenshot'><img src='guides/apps_intro/architecture-overview.png' alt=''><span></span></p></p>\n\n<ul>\n<li><strong>Models</strong>: represent a type of object in your app - for example an e-commerce app might have models for Users, Products and Orders</li>\n<li><strong>Views</strong>: are responsible for displaying data to your users and leverage the built in Components in Sencha Touch</li>\n<li><strong>Controllers</strong>: handle interaction with your application, listening for user taps and swipes and taking action accordingly</li>\n<li><strong>Stores</strong>: are responsible for loading data into your app and power Components like Lists and DataViews</li>\n<li><strong>Profiles</strong>: enable you to easily customize your app's UI for tablets and phones while sharing as much code as possible</li>\n</ul>\n\n\n<p>The Application is usually the first thing you define in a Sencha Touch application, and looks something like this:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-application\" rel=\"Ext-method-application\" class=\"docClass\">Ext.application</a>({\n    name: 'MyApp',\n    models: ['User', 'Product', 'nested.Order'],\n    views: ['OrderList', 'OrderDetail', 'Main'],\n    controllers: ['Orders'],\n\n    launch: function() {\n        <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('MyApp.view.Main');\n    }\n});\n</code></pre>\n\n<p>The <em><a href=\"#!/api/Ext.app.Application-cfg-name\" rel=\"Ext.app.Application-cfg-name\" class=\"docClass\">name</a></em> is used to create a single global namespace for your entire application, including all of its models, views, controllers and other classes. For example, an app called <em>MyApp</em> should have its constituent classes follow the pattern <em>MyApp.model.User</em>, <em>MyApp.controller.Users</em>, <em>MyApp.view.Main</em> etc. This keeps your entire app under a single global variable so minimizes the chance of other code on the page conflicting with it.</p>\n\n<p>The Application uses the defined <em><a href=\"#!/api/Ext.app.Application-cfg-models\" rel=\"Ext.app.Application-cfg-models\" class=\"docClass\">models</a></em>, <em><a href=\"#!/api/Ext.app.Application-cfg-views\" rel=\"Ext.app.Application-cfg-views\" class=\"docClass\">views</a></em> and <em><a href=\"#!/api/Ext.app.Application-cfg-controllers\" rel=\"Ext.app.Application-cfg-controllers\" class=\"docClass\">controllers</a></em> configurations to automatically load those classes into your app. These follow a simple file structure convention - models are expected to be in the app/model directory, controllers in the app/controller directory and views inside the app/view directory - for example <em>app/model/User.js</em>, <em>app/controllers/Orders.js</em> and <em>app/view/Main.js</em>.</p>\n\n<p>Note that one of the <a href=\"#!/api/Ext.app.Application-cfg-models\" rel=\"Ext.app.Application-cfg-models\" class=\"docClass\">models</a> we specified was different to the others - we specified the full class name (\"MyApp.model.nested.Order\"). We're able to specify the full class name for any of those configurations if we don't follow the normal naming conventions. See the <a href=\"#!/api/Ext.app.Application\" rel=\"Ext.app.Application\" class=\"docClass\">Dependencies section of the Ext.app.Application docs</a> for full details on how to specify custom dependencies.</p>\n\n<h2 id='apps_intro-section-2'>Controllers</h2>\n\n<p>Controllers are the glue the binds an application together. They listen for events fired by the UI and then take some action on it. This helps to keep our code clean and readable, and separates the view logic from the control logic.</p>\n\n<p>For example, let's say you require users to log in to your app via a login form. The view in this case is the form with all of its fields and other controls. A controller should listen to <a href=\"#!/api/Ext.Button-event-tap\" rel=\"Ext.Button-event-tap\" class=\"docClass\">tap</a> event on the form's submit <a href=\"#!/api/Ext.Button\" rel=\"Ext.Button\" class=\"docClass\">button</a> and then perform the authentication itself. Any time we deal with manipulating data or state, the controller should be the class that activates that change, not a view.</p>\n\n<p>Controllers expose a small but powerful set of features, and follow a few simple conventions. Each Controller in your application is a subclass of <a href=\"#!/api/Ext.app.Controller\" rel=\"Ext.app.Controller\" class=\"docClass\">Ext.app.Controller</a> (though you can subclass existing Controllers, so long as it inherits from <a href=\"#!/api/Ext.app.Controller\" rel=\"Ext.app.Controller\" class=\"docClass\">Ext.app.Controller</a> at some point). Controllers exist in the MyApp.controller.* namespace - for example if your app had a Sessions controller it would be called MyApp.controller.Sessions and exist in the file app/controller/Sessions.js.</p>\n\n<p>Although each Controller is a subclass of <a href=\"#!/api/Ext.app.Controller\" rel=\"Ext.app.Controller\" class=\"docClass\">Ext.app.Controller</a>, each one is instantiated just once by the <a href=\"#!/api/Ext.app.Application\" rel=\"Ext.app.Application\" class=\"docClass\">Application</a> that loaded it. There is only ever one instance of each Controller at any one time and the set of Controller instances is managed internally by the Application. Using Application's <a href=\"#!/api/Ext.app.Application-cfg-controllers\" rel=\"Ext.app.Application-cfg-controllers\" class=\"docClass\">controllers</a> config (as we do above) loads all of the Controllers and instantiates them automatically.</p>\n\n<h3>A simple example</h3>\n\n<p>Here's how we might quickly define the Sessions controller described above. We're using 2 Controller configurations here - <a href=\"#!/api/Ext.app.Controller-cfg-refs\" rel=\"Ext.app.Controller-cfg-refs\" class=\"docClass\">refs</a> and <a href=\"#!/api/Ext.app.Controller-cfg-control\" rel=\"Ext.app.Controller-cfg-control\" class=\"docClass\">control</a>. Refs are an easy way to find Components on your page - in this case the Controller will look for all Components that match the <a href=\"#!/api/Ext.form.Panel\" rel=\"Ext.form.Panel\" class=\"docClass\">formpanel</a> xtype and assign the first one it finds to the <em>loginForm</em> property. We'll use that property in the doLogin function later.</p>\n\n<p>The second thing it does is set up a <a href=\"#!/api/Ext.app.Controller-cfg-control\" rel=\"Ext.app.Controller-cfg-control\" class=\"docClass\">control</a> configuration. Just like refs, this uses a <a href=\"#!/api/Ext.ComponentQuery\" rel=\"Ext.ComponentQuery\" class=\"docClass\">ComponentQuery</a> selector to find all <em>formpanel</em> xtypes that contain a <em>button</em> inside them (for example, this will find the Submit button in our hypothetical login form). Whenever any button of this type fires its <a href=\"#!/api/Ext.Button-event-tap\" rel=\"Ext.Button-event-tap\" class=\"docClass\">tap</a> event, our Controller's <em>doLogin</em> function will be called:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('MyApp.controller.Sessions', {\n    extend: '<a href=\"#!/api/Ext.app.Controller\" rel=\"Ext.app.Controller\" class=\"docClass\">Ext.app.Controller</a>',\n\n    config: {\n        refs: {\n            loginForm: 'formpanel'\n        },\n        control: {\n            'formpanel button': {\n                tap: 'doLogin'\n            }\n        }\n    },\n\n    doLogin: function() {\n        var form   = this.getLoginForm(),\n            values = form.getValues();\n\n        MyApp.authenticate(values);\n    }\n});\n</code></pre>\n\n<p>The doLogin function itself is quite straightforward. Because we defined a 'loginForm' ref, the Controller automatically generates a <em>getLoginForm</em> function that returns the <em>formpanel</em> that it matches. Once we have that form reference we just pull the values (username and password) out of it and pass them to an <em>authenticate</em> function. That's most of what Controllers ever do - listen for events fired (usually by the UI) and kick off some action - in this case authenticating.</p>\n\n<p>For more on what Controllers are and what capabilities they possess see the <a href=\"#!/guide/controllers\">controllers guide</a>.</p>\n\n<h2 id='apps_intro-section-3'>Stores</h2>\n\n<p>Stores are an important part of Sencha Touch and power most of the data-bound widgets. At its simplest, a Store is not much more than an array of Model instances. Data-bound Components like <a href=\"#!/api/Ext.dataview.List\" rel=\"Ext.dataview.List\" class=\"docClass\">List</a> and <a href=\"#!/api/Ext.dataview.DataView\" rel=\"Ext.dataview.DataView\" class=\"docClass\">DataView</a> just render one item for each Model instance in the Store. As Model instances are added or removed from the Store events are fired, which the data-bound Components listen to and use to update themselves.</p>\n\n<p>While the <a href=\"#!/guide/stores\">Stores guide</a> has much more information on what Stores are and how they fit in with Components in your app, there are a couple of specific integration points with your <a href=\"#!/api/Ext.app.Application\" rel=\"Ext.app.Application\" class=\"docClass\">Application</a> instance that you should be aware of.</p>\n\n<h2 id='apps_intro-section-4'>Device Profiles</h2>\n\n<p>Sencha Touch operates across a wide range of devices with differing capabilities and screen sizes. A user interface that works well on a tablet may not work very well on a phone and vice versa so it makes sense to provide customized views for different device types. However, we don't want to have to write our application multiple times just to provide a different UI - we'd like to share as much code as possible.</p>\n\n<p>Device Profiles are simple classes that enable you to define the different types of devices supported by your app and how they should be handled differently. They are opt-in, so you can develop your app without profiles at first and add them in later, or never use them at all.Each profile simply defines an <a href=\"#!/api/Ext.app.Profile-method-isActive\" rel=\"Ext.app.Profile-method-isActive\" class=\"docClass\">isActive</a> function that should return true if that profile should be active on the current device, plus a set of additional <em><a href=\"#!/api/Ext.app.Profile-cfg-models\" rel=\"Ext.app.Profile-cfg-models\" class=\"docClass\">models</a></em>, <em><a href=\"#!/api/Ext.app.Profile-cfg-views\" rel=\"Ext.app.Profile-cfg-views\" class=\"docClass\">views</a></em> and <em><a href=\"#!/api/Ext.app.Profile-cfg-controllers\" rel=\"Ext.app.Profile-cfg-controllers\" class=\"docClass\">controllers</a></em> to load if that profile is detected.</p>\n\n<p>To app Profile support to your app you just need to tell your Application about those Profiles and then create <a href=\"#!/api/Ext.app.Profile\" rel=\"Ext.app.Profile\" class=\"docClass\">Ext.app.Profile</a> subclasses for them:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-application\" rel=\"Ext-method-application\" class=\"docClass\">Ext.application</a>({\n    name: 'MyApp',\n    profiles: ['Phone', 'Tablet'],\n\n    //as before\n});\n</code></pre>\n\n<p>By defining the profiles above the Application will load app/profile/Phone.js and app/profile/Tablet.js. Let's say that the tablet version of the app enables additional capabilities - for example managing groups. Here's an example of how we might define the Tablet profile:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('MyApp.profile.Tablet', {\n    extend: '<a href=\"#!/api/Ext.app.Profile\" rel=\"Ext.app.Profile\" class=\"docClass\">Ext.app.Profile</a>',\n\n    config: {\n        controllers: ['Groups'],\n        views: ['GroupAdmin'],\n        models: ['MyApp.model.Group']\n    },\n\n    isActive: function() {\n        return Ext.os.is.Tablet;\n    }\n});\n</code></pre>\n\n<p>The isActive function will return true whenever the application is run on what Sencha Touch determines to be a tablet. This is a slightly subjective determination because there is a near-continuous spectrum of device shapes and sizes with no clear cutoff between phones and tablets. Because there is no foolproof way to state which devices are tablets and which are phones, Sencha Touch's <em>Ext.os.is.Tablet</em> is set to true when running on an iPad and false otherwise. If you need more fine grained control it's easy to provide any implementation you like inside your <em>isActive</em> function, so long as it returns true or false.</p>\n\n<p>You should make sure that only one of your Profiles returns true from its isActive function. If more than one of them returns true, only the first one that does so will be counted and the rest ignored. The first one that returns true will be set as the Application's <a href=\"#!/api/Ext.app.Application-cfg-currentProfile\" rel=\"Ext.app.Application-cfg-currentProfile\" class=\"docClass\">currentProfile</a>, which can be queried at any time.</p>\n\n<p>If the detected currentProfile has defined additional models, views, controllers and stores these will be automatically loaded by the Application, along with all of the <em><a href=\"#!/api/Ext.app.Application-cfg-models\" rel=\"Ext.app.Application-cfg-models\" class=\"docClass\">models</a></em>, <em><a href=\"#!/api/Ext.app.Application-cfg-views\" rel=\"Ext.app.Application-cfg-views\" class=\"docClass\">views</a></em> and <em><a href=\"#!/api/Ext.app.Application-cfg-controllers\" rel=\"Ext.app.Application-cfg-controllers\" class=\"docClass\">controllers</a></em> defined on the Application itself. However, all of the dependencies named in the Profile will be prepended with the Profile name unless the fully-qualified class name is provided. For example:</p>\n\n<ul>\n<li><em>views: ['GroupAdmin']</em> will load <em>app/view/tablet/GroupAdmin.js</em></li>\n<li><em>controllers: ['Groups']</em> will load <em>app/controller/tablet/Groups.js</em></li>\n<li><em>models: ['MyApp.model.Group']</em> will load <em>app/model/Group.js</em></li>\n</ul>\n\n\n<p>Most of the time a Profile will only define additional controllers and views as the models and stores are typically shared between all variants of the app. For a more detailed discussion of Profiles see the <a href=\"#!/guide/profiles\">device profiles guide</a>.</p>\n\n<h2 id='apps_intro-section-5'>Launch Process</h2>\n\n<p>Each Application can define a <a href=\"#!/api/Ext.app.Application-cfg-launch\" rel=\"Ext.app.Application-cfg-launch\" class=\"docClass\">launch</a> function, which is called as soon as all of your app's classes have been loaded and the app is ready to be launched. This is usually the best place to put any application startup logic, typically creating the main view structure for your app.</p>\n\n<p>In addition to the Application launch function, there are two other places you can put app startup logic. Firstly, each Controller is able to define an <a href=\"#!/api/Ext.app.Controller-cfg-init\" rel=\"Ext.app.Controller-cfg-init\" class=\"docClass\">init</a> function, which is called before the Application launch function. Secondly, if you are using Device Profiles, each Profile can define a <a href=\"#!/api/Ext.app.Profile-method-launch\" rel=\"Ext.app.Profile-method-launch\" class=\"docClass\">launch</a> function, which is called after the Controller init functions but before the Application launch function.</p>\n\n<p>Note that only the active Profile has its launch function called - for example if you define profiles for Phone and Tablet and then launch the app on a tablet, only the Tablet Profile's launch function is called.</p>\n\n<ol>\n<li>Controller#init functions called</li>\n<li>Profile#launch function called</li>\n<li>Application#launch function called</li>\n<li>Controller#launch functions called</li>\n</ol>\n\n\n<p>When using Profiles it is common to place most of the bootup logic inside the Profile launch function because each Profile has a different set of views that need to be constructed at startup.</p>\n\n<h2 id='apps_intro-section-6'>Routing and History Support</h2>\n\n<p>Sencha Touch 2 has full Routing and History support. Several of the SDK examples, including the Kitchen Sink, use the history support to enable the back button to easily navigate between screens - especially useful on Android.</p>\n\n<p>There will be full documentation on the history support from beta 1 onwards. As of 2.0.0 PR4 the best place to learn about Sencha Touch 2's history support is kitchen sink example, which features lots of documentation on the routing and state restoration required for history support.</p>\n\n<!-- Dispatch/redirect\nRouter\nRestoring State -->\n\n\n<h2 id='apps_intro-section-7'>Further Reading</h2>\n\n<p>There are several more guides on using the application architecture with Sencha Touch 2:</p>\n\n<ul>\n<li><a href=\"#!/guide/controllers\">Controllers</a></li>\n<li><a href=\"#!/guide/profiles\">Device Profiles</a></li>\n</ul>\n\n\n<!-- * <a href=\"#!/guide/history_support\">History Support</a> -->\n\n\n<!-- * <a href=\"#!/guide/views\">Views</a> -->\n\n\n<!-- * <a href=\"#!/guide/testing_mvc\">Testing Applications</a> -->\n\n","title":"All about Applications"});