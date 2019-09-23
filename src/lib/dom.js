/*global window,document,Promise,setTimeout */
import React from 'react';
import { FileLoader, registerInternal } from './core.js';

window.bundleRegister = (function() {
  var container = {};
  window.__INTERNAL__BUNDLES = container;
  return registerInternal(container);
})();

window.widgetRegister = (function() {
  var container = {};
  window.__INTERNAL__WIDGETS = container;
  return registerInternal(container);
})();


(window.domApi = new function() {
  // eslint-disable-next-line
  console.log('Initializing domAPI');
  var fileLoader;
  this.setResources = function(loaderConfig) {
    this.loaderConfig = loaderConfig;
    fileLoader = new FileLoader(loaderConfig);
  };
  
  class WidgetLoader extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loaded: false
      };
    }

    componentDidMount() {
      if (this.props.css) {
        fileLoader.dynamicLoadCss(this.props.css);
      }
      fileLoader.dynamicLoad(this.props.file).then((function() {
        this.setState({
          loaded: true,
          file: this.props.file
        });
      }).bind(this))
      .catch((function(){
          this.setState({
          loaded: true
        });
      }).bind(this));
    }

    render() {
		
      if (!this.state.loaded) {
        if (this.props.loadingRender) {
          return this.props.loadingRender;
        }
        return null;
      }
      var widgetRender = this.props.widgetRegister.get(this.state.file);
	  if (typeof widgetRender === 'function') {
        return widgetRender(this.props);
      }
      return null;
    }
  }

  function doesPatternMatch(pattern, currentUrl) {
    if (!currentUrl.startsWith('/')) {
      currentUrl = '/' + currentUrl;
    }
    if (!pattern.startsWith('/')) {
      pattern = '/' + pattern;
    }
    
    if(currentUrl.endsWith('/')){
        currentUrl = currentUrl.substring(0, currentUrl.length - 1);
    }
    
    var parts = currentUrl.split('/');
    var patternParts = pattern.split('/');
    var match = true;
    for (var i = 0; i < parts.length; i++) {
      var patternPart = patternParts[i];
      if (patternPart === null || patternPart === undefined) {
        match = false;
        break;
      }
      var urlPart = parts[i];
      if (patternPart.startsWith('{') && patternPart.endsWith('}')) {
        continue;
      }
      if (urlPart === patternPart) {
        continue;
      }
      match = false;
    }
    return match;
  }

  function getPath(routes) {
    var path = document.location.href.split('#');
    if (!path || !path[1]) {
      return '/';
    }
    var pattern = Object.keys(routes)
      .filter(function(route) {
        return doesPatternMatch(route, path[1]);
      });
    var urlFound = path[1];

    if (pattern.length > 0) {
      urlFound = pattern[0];
    }
    return {
      url: urlFound
    };
  }

  class RouterComponent extends React.PureComponent {


    constructor(props) {
      super(props);
      var mapping = getPath(props.routes);
      this.state = {
        route: mapping.url,
        history: []
      };
      this.changeRoute = this.changeRoute.bind(this);
      this.loadRoute = this.loadRoute.bind(this);
      this.bundleRegister = props.bundleRegister;
    }

    changeRoute(mapping) {
      var route = mapping.url;
      if (this.state.route === route) {
        return;
      }
      var newHistory = this.state.history.concat([]);
      newHistory.push(this.state.route);
      this.setState({
        route: route,
        history: newHistory,
        urlProps: mapping.props
      });
    }

    componentDidMount() {
      window.onpopstate = function() {
        var mapping = getPath(this.props.routes);
        this.changeRoute(mapping);
      }.bind(this);
      var mapping = getPath(this.props.routes);
      this.changeRoute(mapping);
      this.loadRoute();
    }

    componentDidUpdate(prevProps, prevState) {
      if ((prevState.route === this.state.route)) {
        return;
      }
      this.loadRoute();

    }

    loadRoute() {
      if(!this.state.route){
          return null;
      } 
      var route = this.props.routes[this.state.route];
      if (route && typeof route.url === 'string' && route.url.indexOf('.js')) {
        if (this.bundleRegister.get(route.url)) {
          return;
        }
        this.setState({
          loading: true
        });
        if (route.css) {
          fileLoader.dynamicLoadCss(route.css);
        }
        fileLoader.dynamicLoad(route.url).then(function() {
            this.setState({
              loading: false
            });
          }.bind(this))
          .catch(function() {
            this.setState({
              loading: false,
              showWarning: true
            });
          }.bind(this));
      }
    }

    render() {
      if (this.state.loading) {
        if (this.props.loadingRender) {
          return this.props.loadingRender;
        }
        return null;
      }
      var route = this.props.routes[this.state.route];
      if (!route) {
        return null;
      }

      if (route.url && !this.bundleRegister.get(route.url)) {
        if (this.state.showWarning) {
          return "Ops...could not load content: " + route.url;
        }
        return null;
      }

      if (route.url && this.bundleRegister.get(route.url)) {
        var element = this.bundleRegister.get(route.url);
        return React.createElement(element, {}, element);
      }

      var props = Object.assign({}, this.state.urlProps);

      if (typeof route === 'object' && !React.isValidElement(route)) {
        if (typeof route.render === 'string') {
          return route.render;
        }
        return React.cloneElement(route.render, props, route.render);
      }

      if (typeof route === 'string') {
        return route;
      }

      return React.cloneElement(route, props, route);
    }
  }
  
  function checkForFileLoader(){
    if(!fileLoader){
       throw new Error('File loader not initialized properly... Have you properly called setAssetUrl()?');  
    } 
  }
  
  this.Router = function(props, children) {
    checkForFileLoader();
    return React.createElement(RouterComponent, props, children);
  };

  this.WidgetLoader = function(props, children) {
    checkForFileLoader();  
    return React.createElement(WidgetLoader, props, children);
  };
});