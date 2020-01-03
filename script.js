var set = new Set();
function createTable(data,firstTime = false){
    $('#jsonTable').html("");
    $('#jsonTable').append(`<th>Year</th>
    <th>Category</th>
    <th>Laureates</th>
    <th>Laureates</th>
    <th>Laureates</th>`);
    $.each( data["prizes"], function(key,val ) {
        $('#jsonTable').css("visibility", "visible");
        $('#jsonTable').append("<tbody>");
        $('#jsonTable').append("<td>"+val.year+"</td>"+"<td>" +val.category+"</td>");
        if(!$(`#${val.year}`).length)
        $('#sel').append(`<option value="year" id="${val.year}"> ${val.year} </option>`);
        if(!$(`#${val.category}`).length)
        $('#select').append(`<option value="category" id="${val.category}">${val.category}</option>`);  
        if (val["laureates"]){
            $.each(val["laureates"],function(k,v){
                $('#jsonTable').append("<td>"+ v.firstname+" "+v.surname+"</td>");
                if(firstTime){
                    if(set.has(v.id)){
                        if(v.surname != undefined )
                        $("#repeating-names").append(`<p>${v.firstname + v.surname}</p>`)
                    }else{
                        set.add(v.id);
                    }
                }                
            });       
        }else{
            return;
        }
        $('#jsonTable').append("</tbody>");
    });
}

$(document).ready(function(){
    $.getJSON( "https://api.nobelprize.org/v1/prize.json", function( data ) {
        createTable(data,true);
        $('select').change(function () {
           
            year = $('#sel').find(":selected").text();
            category =$('#select').find(":selected").text();
            $.ajax({
                url         : 'https://api.nobelprize.org/v1/prize.json',
                data        : {"year":year,"category":category},
                dataType    : "json",
                cache       : false,
                contentType : 'application/json; charset=utf-8',
                type        : 'GET',
                success     : function(data){
                     // this is where you do something with response
                    createTable(data);
                  
                }
           }); 
        });
    }); 
});