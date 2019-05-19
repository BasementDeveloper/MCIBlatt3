function writetable(){
    
    var movementTimes;
    var distances;
    var widths;
    var movementarrb1 = new Array();
    var distancearrb1 = new Array();
    var widtharrb1 = new Array();
    document.getElementById("start").disabled = true;
    if(window.localStorage.getItem("movementtimes")!=null &&
        window.localStorage.getItem("distances")!=null &&
        window.localStorage.getItem("widths")!=null){

        movementTimes = JSON.parse(window.localStorage.getItem("movementtimes")); // Retrieving
        distances = JSON.parse(window.localStorage.getItem("distances")); // Retrieving
        widths = JSON.parse(window.localStorage.getItem("widths")); // Retrieving

        movementTimes.forEach(element => {
            movementarrb1.push(element);
        });
        distances.forEach(element => {
            distancearrb1.push(element);
        });
        widths.forEach(element => {
            widtharrb1.push(element);
        });

        console.log(widtharrb1);
        console.log(movementarrb1);
        console.log(distancearrb1);


        var html="";
        for(var i=0;i<50;i++){
            html += "<tr>"+
                    "<td><p>"+Math.round(movementarrb1[i]*1000)/1000+"</p></td>"+
                    "<td><p>"+Math.round(distancearrb1[i]*1000)/1000 +"</p></td>"+
                    "<td><p>"+Math.round(widtharrb1[i]*1000)/1000+"</p></td>"+
                    "</tr>";
        }
        console.log(html);
        document.getElementById("arr-to-table").innerHTML += html;
    }
    

}