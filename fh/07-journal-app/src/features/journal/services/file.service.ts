export const fileUpload = async(file: File) => {
  //https://console.cloudinary.com/pm/c-ae4b527d3fb5b144337978083ba942/developer-dashboard
  const cloudUrl: string = 'https://api.cloudinary.com/v1_1/cloud-name-here-bryan/image/upload';
  const formData = new FormData();
  formData.append('upload_preset', 'react-journal');
  formData.append('file', file);
  try {
    const resp = await fetch(cloudUrl, {method: 'POST', body: formData});
    if (!resp.ok) {
      throw new Error(`Sometime went wrong uploading images`);
    }
    const jsonResp = await resp.json();
    // console.log(jsonResp);
    return jsonResp.secure_url;
  } catch (error: any) {
    throw error;
  }
}