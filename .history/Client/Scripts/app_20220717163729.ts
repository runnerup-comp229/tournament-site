
/* Custom JavaScript goes here */

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
                location.href = "/contact-list"; 
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
        
    };

    window.addEventListener("load", Start);

})();