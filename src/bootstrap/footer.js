/*global React,widgetRegister,bundleRegister,domApi */
import React from 'react';
import style from './footer.scss';


console.log(style);
bundleRegister().set('./bootstrap/footer.js', function (props){
   var e = React.createElement;
   var newProps = Object.assign({
      className: style.Footer
   }, props);
   
   console.log(style.Footer);
   var loader = domApi.WidgetLoader;
   
   var widget = loader({
       file: './widgets/banner.js',
       css: './widgets/banner.css',
       widgetRegister: widgetRegister(),
       loadingRender: e('span', {
        className: 'loader'
       }, null)
   });
   
   var element = e('div', newProps, props.title, widget, widget, widget);
   return element;
});