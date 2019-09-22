/*global document,React,widgetRegister,bundleRegister,domApi */
import React from 'react';
import styles from '../../bootstrap/index.scss';
console.log(styles);
(function(){
    class TransferReview extends React.Component{
        
        constructor(props){
            super(props);
            this.handleConfirmation = this.handleConfirmation.bind(this);
            
            var loader = domApi.WidgetLoader;
            var e = React.createElement;
            
            this.twoFactorWidget = loader({
             file: './widgets/2fa.js',
             widgetRegister: widgetRegister(),
             handleConfirm: this.handleConfirmation,
             loadingRender: e('span', {
                className: styles.loader
             }, null)
           });
        }
        
        handleConfirmation(){
            // work around since browser history API doesnt work with file://
            var element = document.getElementById("redirect");
            element.click();
        }

        
        
        render(){
            var e = React.createElement;
            return e('div', {},
              e('h1', {}, 'Confirm your transaction'),
              e('label', {}, 'Beneficiary:'),
              e('span', {}, 'Adilson'),
              e('br', {}, null),
              e('label', {}, 'Amount:'),
              e('span', {}, '123,00 EUR'),
              e('br', {}, null),
              e('a', { id: 'redirect', href: '#/pages/transfer/complete', style: {display: 'none'}}, ''),
              React.cloneElement(this.twoFactorWidget, {}, null)
            );
        }
    }   

    bundleRegister().set('pages/transfer/transferReview.js', function(){
      return React.createElement(TransferReview, {}, null);
    });

})();
