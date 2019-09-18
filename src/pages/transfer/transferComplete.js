(function(){
    bundleRegister().set('pages/transfer/transferComplete.js', function(){
        var e = React.createElement;
		return e('div', {},
		  e('h1', {}, 'Transfer success'),
		  e('span', {}, 'You transfered 123,00 EUR to Adilson'),
		  e('br', {}, null),
		  e('a', {
			 href: '#pages/transfer'  
		   }, 
			e('input', {
			 type: 'submit',
			 value: 'Do another transfer'
			}, null)
		  
		  )
		);
    });
})();
