'use strict';

(function () {

   $('#addStock').click(function(){
      var stockCode = $('#addStockInpt').val();
      $.ajax({
         url:'/addStock',
         type:'POST',
         data:{stockCode:stockCode}
      }).done(function(response) {
          listStock();
          sendServerUpdate('client update');
        })
   });

})();

function listStock(){
   $.ajax({
         url:'/listStock',
         data:{}
      }).done(function(response) {
          var stockStr = '<table>';
          for(var i =0 ;i < response.length; i++)
          {
            stockStr += '<tr><td>'+ response[i]['stockCode'] +'</td><td><button class="removeStock" data-stockcode="'+response[i]['stockCode']+'">Remove</button></td></tr>';
          }
          stockStr += '</table>';
          $('#listStock').html(stockStr); 

          


         $('.removeStock').unbind('click').click(function(){
            var stockCode = $(this).data('stockcode');
            $.ajax({
               url:'/removeStock',
               type:'POST',
               data:{stockCode:stockCode}
            }).done(function(response) {
                listStock();
                sendServerUpdate('client update');
              })
         });
        })
}

function sendServerUpdate(msg)
{
   console.log('Socket emit message = '+ msg);  
   socket.emit(msg);
}
