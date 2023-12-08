const schedule = require('node-schedule');

module.exports = {
  async initialize() {
    // Schedule a job to run every minute
    schedule.scheduleJob('*/1 * * * *', async () => {
      try {
        // Get lesson videos with draft status and release date in the past
        const lessonVideosToPublish = await strapi.query('lesson-videos').model
        .find({
          status: 'draft',
          ReleaseDate: { $lte: new Date() },
        })
        .lean();
   
      // Add a log statement to check the retrieved lesson videos
      console.log('Lesson videos to publish:', lessonVideosToPublish);
   
      // Publish lesson videos
      await Promise.all(lessonVideosToPublish.map(video => {
        return strapi.query('lesson-videos').model
          .updateOne({ _id: video._id }, { status: 'published' });
      }));

        console.log('Lesson videos published:', lessonVideosToPublish.length);
      } catch (error) {
        console.error('Error in scheduled job:', error);
      }
    });
  },
};
