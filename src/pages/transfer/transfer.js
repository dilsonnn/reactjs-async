/*global React,bundleRegister */
(function(){
    bundleRegister().set('pages/transfer/transfer.js', function(){
        const a = (<div>
          <h1>Provide your transaction details:</h1>
          <label>Beneficiary</label>
          <label>Adilson</label>
          <br/>
          <label>Amount</label>
          <input value="45.54" />
          <br/>
          <a href="#pages/transfer/review">
            <input type="submit" value="Send" />
          </a>
          
        </div>);
        return a;
    });

})();
