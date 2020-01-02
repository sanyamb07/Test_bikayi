function createTable(data){
    $('#jsonTable').html("");
    $('#jsonTable').append(`<th>Year</th>
    <th>Category</th>
    <th>Laureates</th>
    <th>Laureates</th>
    <th>Laureates</th>`);
    $.each( data["prizes"], function(key,val ) {

        $('#jsonTable').css("visibility", "visible").css("border", "1px solid green");
        $('#jsonTable').append("<tbody>");
        $('#jsonTable').append("<td>"+val.year+"</td>"+"<td>" +val.category+"</td>");
        $('#sel').append('<option value="' + val.year + '">' + val.year + '</option>');
        $('#sel').append('<option value="' + val.category + '">' + val.category + '</option>');

        if (val["laureates"]){
            $.each(val["laureates"],function(k,v){ 
                
                $('#jsonTable').append("<td>"+ v.firstname+" "+v.surname+"</td>");
                                
    
            });       
        }else{
            return;
        }

        $('#jsonTable').append("</tbody>");
        $('th').css("border", "1px solid green");
    
    });
}
$(document).ready(function(){
   
    $.getJSON( "https://api.nobelprize.org/v1/prize.json", function( data ) {
        createTable(data);
        $('#sel').change(function () {
            var year = $('#sel').find(":selected").text();

            $.ajax({
                url         : 'https://api.nobelprize.org/v1/prize.json',
                data        : {"year":year},
                dataType    : "json",
                cache       : false,
                contentType : 'application/json; charset=utf-8',
                type        : 'GET',
                success     : function(data){ // this is where you do something with response
                    console.log(data);
                    createTable(data);
                   // The below is my assumption like filter the trs which do not contain 
                   // 2015
                   
                //    $('#jsonTable tbody').find('td').filter(function(td){
                //       $(tr).find('td').last().text().trim() !== year;
                //    }).hide();
                }
           });
            
        });

    }); 
    
    

});

  