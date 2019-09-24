import React from 'react';
import styles from './header.scss';

import registerApi from './registerApi';


class Header extends React.Component{
    
  constructor(props){
    super(props);
  }

        
  render(){
    var menuOptionsLabels = ['Accounts', 'Profile', 'Security'];
    var menuOptions = ['accounts', 'profile', 'security'];
    var elements = [];
    var e = React.createElement;
    for(var i = 0; i < menuOptions.length; i++){
      elements.push(e('li', {key: i}, e(
      'a',
      {
        href: "#" + menuOptions[i]
      },
      menuOptionsLabels[i]
      )));  
    }
    var transferMoney = e('a', {
        href: '#pages/transfer',
       }, 'Send money'
    );
    elements.push(
      e('li', {}, transferMoney)
    );
    var listOfMenus = e('ul', null, elements);

    return (<div className={styles.Header}>
       <div className={styles.Logo}>
         <img src="./resources/img/logo.png" />
       </div>
       {
         listOfMenus
       }
    </div>);
  }
}

registerApi().bundleRegister().set('bootstrap/header.js', function (props){
  return <Header {...props} />;
});

