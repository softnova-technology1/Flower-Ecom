// Cloudinary configuration for image uploads

export const uploadToCloudinary = async (file) => {
    try {
        // Convert file to base64 if it's a File object
        let base64File = file;
        
        if (file instanceof File || file instanceof Blob) {
            base64File = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }

        // Upload to Cloudinary via API route
        const response = await fetch('/api/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: base64File }),
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.error || 'Upload failed');
        }

        return {
            success: true,
            url: data.url,
            publicId: data.publicId,
        };
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        return {
            success: false,
            error: error.message,
        };
    }
};

// Delete image from Cloudinary
export const deleteFromCloudinary = async (publicId) => {
    try {
        const response = await fetch('/api/upload', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ publicId }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        return {
            success: false,
            error: error.message,
        };
    }
};

// Helper to extract public ID from Cloudinary URL
export const getPublicIdFromUrl = (url) => {
    if (!url) return null;
    
    // Extract public ID from Cloudinary URL
    // Example: https://res.cloudinary.com/demo/image/upload/v1234567890/sample.jpg
    const matches = url.match(/\/([^\/]+)\.[^\.]+$/);
    return matches ? matches[1] : null;
};

