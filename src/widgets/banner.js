
function randomFromArr(items){
  return items[Math.floor(Math.random() * items.length)];	
}
widgetRegister().set('./widgets/banner.js', function(){
	var e = React.createElement;
	var invements = [
		'Stocks',
		'Futures',
		'Savings account'
	];
	var rates = [1, 2, 3];
	var investment = randomFromArr(invements);
	var rate = randomFromArr(rates);
	return e('div', { className: 'Banner' }, e(
	  'div', { className: 'Investment'}, investment + ', with returns up to ' + rate + '%'
	));
});