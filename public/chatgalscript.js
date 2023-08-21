



document.addEventListener('DOMContentLoaded', () => 
{
    const searched = sessionStorage.getItem('imageUrl');
    if(searched)
    {
        //imgElement = document.querySelector('.layout-container');

        const imgElement = document.querySelector('img#compare');
        //console.log(imgElement);
        imgElement.src = searched;
    }
    else
    {
        console.log("searched is not in local storage");
    }

});
