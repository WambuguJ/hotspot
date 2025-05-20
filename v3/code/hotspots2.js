  //
        // Select the div using querySelector (class selector)
        const coods_div = document.querySelector('.coords');
        //
        // Get the hotspot div
        const hot=document.querySelector('.hotspot');
        //
        // get the image
        const image=document.querySelector('img');
        //
        // Add a 'mousemove' event listener to the document
        document.addEventListener('mousemove', function(event) {
            //
            // Destructure the array to get the viewport coordinates
            const [vw, vh]=getv()
            //
            // Update the coordinates in the div
            coods_div.textContent = `vw: ${vw}, vh: ${vh}`;

          
        });
        //
        // Add a click event listener to the document
        document.addEventListener('click', function(event){
            //
            // Destructure the array to get the viewport coordinates
            const [vw, vh]=getv(event);
            //
            // Display the coordinates in an alert
            alert(`[${vw}, ${vh}]`)
        })
        //
        // Get the viewport coordinates
        function getv(e){
            const x = event.clientX;
            const y = event.clientY;
            //
            // Update the hotspot coordinates
            hot.textContent=`X: ${x}, Y: ${y}`;
            //
            // Convert the coordinates to viewport units
            const vw = x/window.innerWidth*100; 
            const vh = y/window.innerHeight*100;

            return [vw,vh]
        }
        //
        // To convert view units to pixels
        function getp(vu){
            //
            // Get the viewport units from the array( no Destructure on)
            const vw = vu[0];
            const vh = vu[1];
            //
            // Convert viewport percentages back to pixels 
            const x = Math.round((vw / 100) * window.innerWidth);
            const y = Math.round((vh / 100) * image.height);
            
            return [x, y];
        }
        //
        // Get the areas
        const areas=document.querySelectorAll("map[name='image-map'] area");
        //
        // Add the coordinates to the areas
        function add_coods(areas){
            //
            // Loop through the areas
            areas.forEach((area)=>{
               //
               // Get the viewport coordinates
               const v=JSON.parse(area.dataset.vu);
               //
                // Get the pixel coordinates
               const pix=getp(v);
               //
                // Add the pixel coordinates to the area
               area.coords= `${pix[0]}, ${pix[1]}, 30`;
               
            })
        }
        //
        // Wait for the image to load before adding the coordinates
        image.onload = function() {
            add_coods(areas);
        };