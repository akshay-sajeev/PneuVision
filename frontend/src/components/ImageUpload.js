import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setError(null);

    // Check if a file was selected
    if (!file) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreview(previewUrl);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    // Here you would typically send the file to your backend
    const formData = new FormData();
    formData.append('xray', selectedFile);

    // TODO: Add your API endpoint here
    try {
      // const response = await fetch('your-api-endpoint', {
      //   method: 'POST',
      //   body: formData,
      // });
      // Handle response
      console.log('File uploaded successfully');
    } catch (error) {
      setError('Error uploading file');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Upload Chest X-Ray Image</h2>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="xrayUpload" className="form-label">
                    Select X-Ray Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="xrayUpload"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>

                {preview && (
                  <div className="mb-4 text-center">
                    <img
                      src={preview}
                      alt="X-Ray Preview"
                      className="img-fluid"
                      style={{ maxHeight: '400px' }}
                    />
                  </div>
                )}

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={!selectedFile}
                  >
                    Upload X-Ray
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;