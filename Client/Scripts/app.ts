
/* Custom JavaScript goes here */
import anime from "animejs";

(function()
{
    function Start()
    {
        // Confirm delete contact in contact-list page
        $("a.delete").on("click", function(event)
        {
            if (!confirm("Are you sure?"))
            {
                event.preventDefault();
                location.href = "/home"; 
            };
        });

        // Confirm delete contact in contact-list page
        $("a.deleteOnEdit").on("click", function(event)
        {
            if (!confirm("Are you sure?"))
            {
                let pathArray = window.location.pathname.split('/');
                event.preventDefault();
                location.href = "/edit/" + pathArray[pathArray.length - 1] ; 
            };
        });
        //Animate winner top
        $("a.teamT").on("click", function(event){
            event.preventDefault();
            console.log("trigger");
            anime({
                targets: "a.teamT",
                translateX: 125,
                duration: 1000,
                easing: 'quadInOut'
            })
        })  
    };

    window.addEventListener("load", Start);

})();