/*global widgetRegister,bundleRegister,domApi */
import React from 'react';

bundleRegister().set('./bootstrap/footer.js', function (){
   const loader = domApi.WidgetLoader;
   const widget = loader({
       file: './widgets/banner.js',
       css: './widgets/banner.css',
       widgetRegister: widgetRegister(),
       loadingRender:<span className='loader'/>
   });
   
   return (<div className='Footer'>
     { React.cloneElement(widget) }
   </div>);
});