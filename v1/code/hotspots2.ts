export function innit(){
    // Select the div using querySelector (class selector)
    const coods_div = document.querySelector('.coords');
    // 
    // 
    if (!coods_div) throw new Error ("element 'coords' not found")
    
  
    //
    // Add a 'mousemove' event listener to the document
    document.addEventListener('mousemove', (e)=>view(e,coods_div));
    //
    // Add a click event listener to the document
    document.addEventListener('click', dis )
}
// 
// Update view units coordinates on mousemove 
function view (event:MouseEvent,coods_div:Element) {
    //
    // Destructure the array to get the viewport coordinates
    const [vw, vh]=getv(event)
    //
    // Update the coordinates in the div
    coods_div.textContent = `vw: ${vw}, vh: ${vh}`;

  
}
// 
// display coordinates of the clicked area
function dis(event:MouseEvent):void{
    //
    // Destructure the array to get the viewport coordinates
    const [vw, vh]=getv(event);
    //
    // Display the coordinates in an alert
    alert(`[${vw}, ${vh}]`)
}
//
// Get the viewport coordinates
function getv(event:MouseEvent):Array<number>{
    //
    // Get the hotspot div
    const hot=document.querySelector('.hotspot');
    // 
    // 
    if (!hot) throw new Error("element 'hotspot' not found")

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
function getp(vu:Array<number>){
        //
    // get the image
    const image=document.querySelector('img');
    //
    //
    if (!image) throw new Error("no image found")
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
// Add the coordinates to the areas
export function add_coods(areas:NodeListOf<HTMLAreaElement>){
    //
    // Loop through the areas
    areas.forEach((area)=>{

        if (!area.dataset.vu) throw new Error ("'vu' attribute not found")
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
       