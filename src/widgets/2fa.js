import React from 'react';
widgetRegister().set('./widgets/2fa.js', function(props){
    return (<div>
        <h2> Provide number 45 in your card. </h2>
        <input></input>
        <input type="submit" value="Confirm your transaction" onClick={props.handleConfirm} />
    </div>);
});