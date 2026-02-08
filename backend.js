async function fetchData(){
    try{
        let art_id;
        if(!art_id){
            art_id = Math.floor(Math.random() * 10000)
        }
        else {
            art_id = document.getElementById("art_id").value;
        }
        const response = await fetch(`https://api.artic.edu/api/v1/artworks/${art_id}`)
        if(!response.ok){
            throw new Error ("Could not fetch resource")
        }
        const data = await response.json()
        const image_id = data.image_id
        const image_url = `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`
        const image_element = document.getElementById("art_image")
        image_element.src = image_url
        image_element.style.display = "block"
        const title = data.title
        const title_element = document.getElementById("art_title")
        title_element.innerHTML = title
        const artist = data.artist_title
        const artist_element = document.getElementById("artist_name")
        artist_element.innerHTML = artist
        const description = data.thumbnail.alt_text
        const description_element = document.getElementById("art_description")
        description_element.innerHTML = description
    }
    catch(error){
        console.error(error)
    }
}

