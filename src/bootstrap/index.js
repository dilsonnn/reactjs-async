/*global window,document,bundleRegister,Promise*/
import React from 'react';
import ReactDOM from 'react-dom';
import registerApi from './registerApi';
import { loadAsyncFile, loadAsyncCssFile } from '../lib/core.js';
import styles from './index.scss';


(function (){
	var layout = [
      { file: 'routes.js'},
      { file: 'bootstrap/footer.js', css: 'bootstrap/footer.css'},
      { file: 'bootstrap/header.js', css: 'bootstrap/header.css'}
    ];
    
    // Static rendered, should NEVER change during the session.
    this.__GLOBAL_STATIC_CONTEXT__ = Object.freeze({
      session: {
        // Rendered by server side.
        licenseKey: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a91',
        sessionId: '3f3af1ecebbd1410ab417ec0d27bbfcb5d340e177ae159b59fc8626c2dfd9175',
        accessToken: '5270935051149081442358916296234999014127',
        bundlesUrl: 'js',
        staticCssUrl: 'css',
        staticResourcesUrl: 'resources'
      },
      userContext: {
          id: 'admin',
          name: 'Adilson A.'
      }
    });
    // End of static rendered.
    
    function layoutInitializer(layoutEntries){
       return function initializeScripts(){
          const currentScript = layoutEntries.shift();
          if(!currentScript){
              return;
          }
		  const file = "js/" + currentScript.file;
          loadAsyncFile(file).then(initializeScripts);
          currentScript.css && Promise.resolve(loadAsyncCssFile("css/" + currentScript.css));
          return initializeScripts;
      };    
    }
    
    layoutInitializer(layout)();
    
    function renderApp(){
        const domApi = registerApi().domApi;
		domApi.setResources({
          jsPath: this.__GLOBAL_STATIC_CONTEXT__.session.bundlesUrl,
          cssPath: this.__GLOBAL_STATIC_CONTEXT__.session.staticCssUrl,
          resourcesPath: this.__GLOBAL_STATIC_CONTEXT__.session.staticResourcesUrl
        });
        const registerBundleApi = bundleRegister();
        const createHeader = registerBundleApi.get('./bootstrap/header.js');
        const createFooter = registerBundleApi.get('./bootstrap/footer.js');
        const mainApp = (<div> 
		 { createHeader({ title: 'Foo bank'}) }
		 <div>
		 {
			 domApi.Router({
              routes: this.applicationRoutes,
              bundleRegister: registerBundleApi,
              loadingRender: (<span className={styles.loader}/>)
            })
		 }
		 </div>
		 { createFooter({ title: 'Footer'}) }
		</div>);
		ReactDOM.render(mainApp, document.querySelector('#application'));
    }
    window.onload = renderApp.bind(this);
    
    
    
    
}).bind(window)();

