/*global React,widgetRegister */
widgetRegister().set('./widgets/2fa.js', function(props){
    var e = React.createElement;
    const newProps = Object.assign({}, props);
    return e('div', {}, 
     e('h2', {}, 'Provide the number 45 in your card:'),
     e('input', { }, null),
     e('input', { type: 'submit', value: 'Confirm transaction', onClick: newProps.handleConfirm }, null)
    );
});