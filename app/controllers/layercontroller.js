const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

// Function to upload a shapefile to GeoServer
async function uploadShapefileToGeoServer(username, password, workspace, shapefile) {
    try {
        const formData = new FormData();
        formData.append('shapefile', fs.createReadStream(shapefile));

        const uploadUrl = `http://localhost:8080/geoserver/rest/workspaces/${workspace}/datastores`;

        const headers = {
            ...formData.getHeaders(),
            Authorization: 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
            'Content-Type': 'multipart/form-data'
        };

        const response = await axios.post(uploadUrl, formData, { headers });

        return response;
    } catch (error) {
        console.error('Error uploading shapefile to GeoServer:', error.message);
        throw new Error('Failed to upload shapefile to GeoServer');
    }
}

module.exports = {
    createDatastore: async (req, res) => {
        try {
            const username = 'admin';
            const password = 'geoserver';
            const workspace = 'ne'; // Name of the workspace to create the datastore in
            const shapefile = 'D:\\AdministrativeBoundaryDatabase\\KERALA_DISTRICT_BDY.shp'; // Path to the shapefile ZIP archive

            // Upload the shapefile to GeoServer
            const uploadResponse = await uploadShapefileToGeoServer(username, password, workspace, shapefile);

            res.json(uploadResponse);
        } catch (error) {
            console.error('Error creating GeoServer datastore:', error.message);
            res.status(500).json({ error: 'Failed to create GeoServer datastore' });
        }
    }
};
