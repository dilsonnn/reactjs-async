/*global window,document,bundleRegister,React*/
import React from 'react';
import ReactDOM from 'react-dom';
import registerApi from './registerApi';
import { loadAsyncFile, loadAsyncCssFile } from '../lib/core.js';
import styles from './index.scss';
import { create } from 'domain';


(function (){
  const layout = [
      { file: 'lib/dom.js'},
      { file: 'routes.js'},
      { file: 'bootstrap/header.js', css: 'bootstrap/header.css'},
      { file: 'bootstrap/footer.js', css: 'bootstrap/footer.css'}
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
    function layoutInitializer(scripts){
      return function nextScript(){
          const script = scripts.shift();
          if(!script){
              return;
          }
          const file = "js/" + script.file;
          loadAsyncFile(file).then(nextScript);
          script.css && Promise.resolve(loadAsyncCssFile("css/" + script.css));
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
        const createHeader = registerBundleApi.get('bootstrap/header.js');
        const createFooter = registerBundleApi.get('bootstrap/footer.js');
        const mainApp = (<div> 
        { createHeader && createHeader({ title: 'Foo bank'}) }
          <div> { domApi.Router({
              routes: this.applicationRoutes,
              bundleRegister: registerBundleApi,
              loadingRender: (<span className={styles.loader}/>)
            })
            }
          </div>
          { createFooter && createFooter({ title: 'Footer'}) }
       </div>);
       ReactDOM.render(mainApp, document.querySelector('#application'));
    }
    window.onload = renderApp.bind(this);
    
    
    
    
}).bind(window)();

