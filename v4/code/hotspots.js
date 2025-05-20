// 
// When the window loads, initialize a new `hotspot` instance and update coordinates
window.onload = () => {
    // new hotspot_page()
    hotspot_page.add_coods();
};
export class hotspot_page {
    constructor() {
        // 
        // Create the div that displays viewport coordinates 
        const coods_div = this.mouse_coords()[0];
        //
        // Add a 'mousemove' event listener to the document and update coordinates
        document.addEventListener('mousemove', (e) => this.update_coords(e, coods_div));
        //
        // Add a click event listener to the document and display the clicked coordinates
        document.addEventListener('click', (e) => this.display_coords(e));
    }
    //  
    // Create the divs to display the mouse coordinates both in pixels and view units
    mouse_coords() {
        // <div class="hotspot"></div>
        // <div class="coords" >X: 0, Y: 0</div>
        // Create the div to display coordinates in view units (vw, vh)
        const coods_div = document.createElement("div");
        //  
        // Add a class 'coords'
        coods_div.classList.add("coords");
        // 
        // Add the created div to the document
        document.body.appendChild(coods_div);
        // 
        // Create the the div to display coordinates in pixels
        const area_pix = document.createElement("div");
        // 
        // Add a class 'hotspot'
        area_pix.classList.add("hotspot");
        document.body.appendChild(area_pix);
        // 
        // Return the created elements as arrays
        return [coods_div, area_pix];
    }
    //
    // Get the viewport coordinates
    get_vu(x, y) {
        //
        // Convert the coordinates to viewport units
        const vw = x / window.innerWidth * 100;
        const vh = y / window.innerHeight * 100;
        return [vw, vh];
    }
    // 
    // Update displayed coordinates in real-time
    update_coords(event, coods_div) {
        // 
        // Get current mouse position
        const x = event.clientX;
        const y = event.clientY;
        // 
        // Update pixel coordinates on the page
        this.update_pixel_coords(x, y);
        //
        // Destructure the array to get the viewport coordinates
        const [vw, vh] = this.get_vu(x, y);
        //
        // Update the coordinates in the div
        coods_div.textContent = `vw: ${vw}, vh: ${vh}`;
    }
    // 
    // display coordinates of the clicked area
    display_coords(event) {
        // 
        // Get current mouse position
        const x = event.clientX;
        const y = event.clientY;
        //
        // Destructure the array to get the viewport coordinates
        const [vw, vh] = this.get_vu(x, y);
        //
        // Display the coordinates in an alert
        alert(`[${vw}, ${vh}]`);
    }
    // 
    // Update the display of pixel coordinates
    update_pixel_coords(x, y) {
        //
        // Get the hotspot div that displays pixel coordinates.
        const hotspotElement = document.querySelector('.hotspot');
        // 
        // Check if the element exists, throw error if not found   
        if (!hotspotElement)
            throw new Error("element 'hotspot' not found");
        //
        // Update the hotspot coordinates to show current pixel coordinates
        hotspotElement.textContent = `X: ${x}, Y: ${y}`;
    }
    //
    // To convert view units to pixels
    static getp(vu) {
        //
        // get the image
        const image = document.querySelector('img');
        //
        // If no image is found, throw an error
        if (!image)
            throw new Error("no image found");
        //
        // Get the viewport units from the array(no Destructure on)
        const vw = vu[0];
        const vh = vu[1];
        //
        // Convert viewport percentages back to pixels 
        const x = Math.round((vw / 100) * window.innerWidth);
        const y = Math.round((vh / 100) * image.height);
        return [x, y];
    }
    //
    // Static method to add pixel coordinates to all area elements
    static add_coods() {
        const areas = document.querySelectorAll("area");
        //
        // Loop through the areas
        areas.forEach((area) => {
            //  
            // Check if the area has a data-vu attribute
            if (!area.dataset.vu)
                throw new Error("'vu' attribute not found");
            //
            // Get the viewport coordinates
            const v = JSON.parse(area.dataset.vu);
            //
            // Get the pixel coordinates
            const pix = hotspot_page.getp(v);
            //
            // Add the pixel coordinates to the area
            area.coords = `${pix[0]}, ${pix[1]}, 30`;
        });
    }
}
