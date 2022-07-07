document.querySelectorAll(".drop-zone_input").forEach((inputElement) =>{
    const dropZoneElement= inputElement.closest(".drop-zone");


    dropZoneElement.addEventListener("click", (e) => {
        inputElement.click();
    });

    inputElement.addEventListener("change", (e) => {
        if (inputElement.files.length) {
            updateThumbnail(dropZoneElement, inputElement.files[0]);
        }
    });  

    dropZoneElement.addEventListener("dragover", (e) => {  
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone-over");
    });

    ["dragleave","dragend"].forEach((type) =>{
        dropZoneElement.addEventListener(type, (e) =>{
            dropZoneElement.classList.remove("drop-zone-over");
        });
    });

    dropZoneElement.addEventListener("drop", (e)=>{

        e.preventDefault();
        
        if(e.dataTransfer.files.length)
        {
            inputElement.files=e.dataTransfer.files;
            updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
        }

        dropZoneElement.classList.remove("drop-zone-over");
    });
});



/**
   * Updates the thumbnail on a drop zone element.
   *
   * @param {HTMLElement} dropZoneElement
   * @param {File} file
   */

function updateThumbnail(dropZoneElement, file)
{
    let thumbnailElement = dropZoneElement.querySelector("drop-zone_thumb");
    console.log(file);
    if(dropZoneElement.querySelector(".drop-zone_prompt"))
    {
        dropZoneElement.querySelector(".drop-zone_prompt").remove();
    }

    if(!thumbnailElement)
    {
        thumbnailElement= document.createElement("div");
        thumbnailElement.classList.add("drop-zone_thumb");
        dropZoneElement.appendChild(thumbnailElement);
    }

    thumbnailElement.dataset.label = file.name;

    if (file.type.startsWith("image/")) {
        const reader = new FileReader();
    
        reader.readAsDataURL(file);
        reader.onload = () => {
          thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
        };
      }
      else if (file.type.startsWith("application/pdf")) {
          thumbnailElement.style.backgroundImage = `url('pdf.png')`;
        
      } else {
        thumbnailElement.style.backgroundImage = null;
      }
}