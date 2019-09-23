
/*global widgetRegister */
import React from 'react';
import styles from './banner.scss';
function randomFromArr(items){
  return items[Math.floor(Math.random() * items.length)];   
}
widgetRegister().set('widgets/banner.js', function(){
    var e = React.createElement;
	var investments = [
        'Stocks',
        'Futures',
        'Savings account'
    ];
	var rates = [1, 2, 3];
    var investment = randomFromArr(investments);
    var rate = randomFromArr(rates);
    return e('div', { className: styles.Banner }, e(
      'div', { className: styles.Investment}, investment + ', with returns up to ' + rate + '%'
    ));
});