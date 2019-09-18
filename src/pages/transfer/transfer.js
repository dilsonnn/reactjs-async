/*global React,bundleRegister */
(function(){
    bundleRegister().set('pages/transfer/transfer.js', function(){
        var e = React.createElement;
        return e('div', {},
          e('h1', {}, 'Provide your transaction details:'),
          e('label', {}, 'Beneficiary'),
          e('input', { value: 'Adilson'}, null),
          e('br', {}, null),
          e('label', {}, 'Amount'),
          e('input',  { enabled: "false", value: '123.00' }, null),
          e('br', {}, null),
          e('a', {
             href: '#pages/transfer/review'  
           }, 
            e('input', {
             type: 'submit',
             value: 'Send'
            }, null)
          
          )
        );
    });

})();
