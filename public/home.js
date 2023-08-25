document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('upload-form');
    const imageInput = document.getElementById('image-input');
    const resultDiv = document.getElementById('result');

  
    imageInput.addEventListener('input', async (e) => {
      const file = e.target.files[0];
      if (!file) {
        return;
      }
  
      const formData = new FormData(form);
      formData.set('image', file);
  
      try {
        const response = await fetch('/upload', {
          method: 'POST',
          body: formData
        });
  
        if (response.ok) {
          const data = await response.json();
          resultDiv.textContent = 'Image uploaded successfully. Image URL: ' + data.imageUrl;
          
          const imageUrl = data.imageUrl;
          sessionStorage.setItem('imageUrl', imageUrl);
          

          window.location.replace('/results');
        } else {
          resultDiv.textContent = 'Image upload failed. indexscript.js';

          
        }

      } catch (error) {
        console.error('Error:', error);
        resultDiv.textContent = 'An error occurred while uploading the image. indexscript';
      }
    });
  });