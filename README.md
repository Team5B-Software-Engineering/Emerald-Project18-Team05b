### Project Features
* `Add Video Button` - Implements functionality for adding/uploading a video to CASMM.
* `Edit Video Page` - Implements functionality for adding questions to videos uploaded to CASMM.
* `Video Display Page` - Implements funtionality for viewing videos uploaded to CASMM.
* `Interactive Questions` - Implments functionality for viewing/answering questions embedded in videos.

### Outstanding Work
* Connect video questions front end to back end
* Implement video release date server code
* Connect video questions to grading service
* Create API/communicate with gallery team to add video support to gallery

### How to update database and server connections - N/A
### Update the database and STRAPI dump files in your file directory - N/A
### Credit - N/A

### Running locally 
* Add all `lesson-video` permissions to `ContentCreator` in Strapi settings
* Add all `interactive-qs` permissions to `ContentCreator` in Strapi settings
* Add all access permissions for `interactive-qs` to `Everyone` in Strapi settings

#### Running

`casmm-client-dev`

1. Follow the [client](/client#setup) setup
2. Run `yarn start` from `/client`

`casmm-server-dev`, `casmm-compile-dev`, `casmm-db-dev`, and `casmm-compile_queue-dev`

1. Install [docker](https://docs.docker.com/get-docker/)

2. Run `docker compose up` from `/`

   > Grant permission to the **scripts** and **server** directories if you are prompted
