/*global widgetRegister,bundleRegister,domApi */
import React from 'react';
import styles from './footer.scss';

function init(message: string){
	console.log(message);
}

declare global {
    interface Window {
		bundleRegister: any;
		domApi: any;
		widgetRegister: any;
    }
}


window.bundleRegister = window.bundleRegister || {};
window.domApi = window.domApi || {};

declare var window: Window;

window.bundleRegister().set('./bootstrap/footer.js', function (){
   init('Loading footer');
   const loader = window.domApi.WidgetLoader;
   const widget = loader({
       file: 'widgets/banner.js',
       css: 'widgets/banner.css',
       widgetRegister: window.widgetRegister(),
       loadingRender:<span className='loader'/>
   });
   
   
   return (<div className={styles.Footer}>
     { widget }
   </div>);
});