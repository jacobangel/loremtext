/**
 * lorem.js
 */

;(function($){
    $(function(){
        
        //set up clipboard stuff
        var clip = new ZeroClipboard.Client();
        clip.setText( '' ); // will be set later on mouseDown
        clip.setHandCursor( true );
        clip.setCSSEffects( true );
        clip.addEventListener( 'complete', function(client, text) {
                               copyAlert();
                        } );
          
        clip.addEventListener( 'mouseDown', function(client) { 
                // set text to copy here
                clip.setText( $("#loremText").text());
                
                // alert("mouse down"); 
        } );
        clip.glue('clip_button', 'clip_cont');
        closeAlert = function() {
            $(".alert").fadeOut(function(){$(this).remove()});
        }
        function copyAlert() {
            $("body").prepend("<div class='alert' style='hidden'><p>Text Copied!</p></div>");
            $(".alert").slideDown("slow");
            var TO = setTimeout("closeAlert()", 2500);   
        }
        
        //copy text
        $("#clipboard a").click(function(){
            clip.setText($("#loremText").text()); 
            return false;
            });
    
        //basic data to send to ajax
        var sendData = {classic :  $("#classic input").attr("checked") ? 1 : 0, n:  $("#units input").val(), type:$("#type input:checked").val(), resource: "/lorem/" };
        
        //add classic opening
        $("#classic input").change(function(){
            sendData.classic = (sendData.classic==1)? 0 : 1;
            regenRequest();
        });
                
        //units slider 
        $("#units input").change(function(e) {
            var diff = $(this).val() - sendData.n;
            if(diff < 0) {
                removeUnits(diff);
            }
            if (diff > 0) {
                addUnits(diff);
            }
            });
        
        //regen text
        $("#regen a").click(
            function() {
                regenRequest();        
                return false;
        });
        
        var typeMap = {'w':"Words", 'l':"List Items", 'p': "Paragraphs"};
        //change types selection
        $('#type input').click(function(){
            var value = $(this).val();
            if (!(value == 'p'|| value == 'l' || value == 'w') ) {
                value = 'p';
            }
            sendData.type = value;
            $("#units span.type-label").text(String(typeMap[value]));
            regenRequest();
        });
        
        //more button
        $('.moreText a').click(
            function(){
                addUnits(1);
                return false;
            });
        
        function addUnits(num) {
            thisData = {};
            thisData.n = num;
            thisData.classic=0;
            thisData.type=sendData.type;
            
            $.ajax({
                type: "GET",
                dataType: "json",
                url:sendData.resource,
                data: thisData,
                success: function(d, ts, req) {
                    var opener = '<p class="hidden">', closer='</p>', extra='';
                    if (sendData.type == 'l') {opener  = '<li class="hidden">'; closer='</li>'; extra=' > ul';}
                    if (sendData.type == 'w') {opener = ' ', closer=''; extra=' > p' }
                    for (var i=0, im=d.length; i < im; i++) {
                        $("#loremText" + extra).append(opener + d[i] + closer);
                        
                    }
                    $("#loremText .hidden").slideDown();
                    sendData.n = parseInt(sendData.n) + num;
                    $("#units input").val(sendData.n);
                     $("#units span.current").text(sendData.n);
                }
            });
        }
        function regenRequest() {
            $.ajax({
                    type: "GET",
                    dataType: "json",
                    url:sendData.resource,
                    data: sendData,
                    success: function(d, ts, req) {
                        $("#loremText").empty();
                        var opener = '<p class="">', closer='</p>'
                        if (sendData.type == 'l') {opener  = '<li>'; closer='</li>'
                            $("#loremText").html("<p><ul> </ul> ");
                            for (var i=0, im=d.length; i < im; i++) {
                                $("#loremText ul").append(opener + d[i] + closer);
                            }
                        }
                        else if (sendData.type == 'w') {opener = '', closer=' '
                           $("#loremText").append("<p></p>");
                           for (var i=0, im=d.length; i < im; i++) {
                                $("#loremText > p").append(opener + d[i] + closer);
                            }
                        }
                        else {
                            for (var i=0, im=d.length; i < im; i++) {
                                $("#loremText").append(opener + d[i] + closer);
                            }
                        }
                        if (sendData.classic == 1) {
                            $("#loremText > p:first").addClass('classic_opening');
                        }
                    }

                });
        }
        
        function removeUnits(num) {
            num = Math.abs(num); 
            var typeTag = 'p';
            if (sendData.type == 'p' || sendData.type == 'l') {
                if (sendData.type == 'l') typeTag = 'li';
                for (var i =0, ij=num; i < ij; i++) {
                    $('#loremText > ' + typeTag).last().slideUp().remove();
                }
            }
            else {
                if (sendData.type =='w'){
                    current = $('#loremText > p').text().split(" "); 
                    $('#loremText > p').text(current.slice(0, current.length - (num+1)).join(" "));        
                }
                else {
                    return false;
                }
            }

            sendData.n = parseInt($("#units input").val());
            $("#units input").val(sendData.n);
            $("#units span.current").text(sendData.n);
            return false;
        }
        

        
    })
})(jQuery);