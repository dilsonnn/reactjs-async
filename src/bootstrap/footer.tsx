/*global widgetRegister,bundleRegister,domApi */
import React from 'react';
import styles from './footer.scss';
import registerApi from './registerApi';

registerApi().bundleRegister().set('./bootstrap/footer.js', () => {
   const loader = registerApi().domApi.WidgetLoader;
   const widget = loader({
       file: 'widgets/banner.js',
       css: 'widgets/banner.css',
       widgetRegister: registerApi().widgetRegister(),
       loadingRender:<span className='loader'/>
   });
   return (<div className={styles.Footer}>
     { widget }
   </div>);
});