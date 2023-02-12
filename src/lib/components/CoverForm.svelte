<script lang="ts">
    // Store the base64 string of the image.
    let base64 = null;

    // Convert image to base64.
    const convertBase64 = (image) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(image);
        fileReader.onload = () => {
            base64 = fileReader.result;
        };
    }
</script>

<!-- Form to upload a cover photo with alt text. -->
<form 
    action="?/createCover" 
    method="post"
>
    <!-- Image & alt text.  -->
    <input on:change={e => convertBase64(e.target.files[0])} type="file" name="name" placeholder="image" accept="image/*" />
    <input type="text" name="alt" placeholder="alt" />

    <!-- Hidden input for base64. -->
    <input type="hidden" name="base64" value={base64} />

    <!-- Submit button. -->
    <input type="submit" value="Upload" />
</form>

