const Clarifai = require('clarifai');

const app = new Clarifai.App({
	apiKey: process.env.CLARIFAI_API
})

const usersService = {
	detectFace: url => app.models
		.predict(Clarifai.FACE_DETECT_MODEL, url)
		.then(response => {
			return {
				regions: response.outputs[0].data.regions.map(region => region.region_info.bounding_box),
				count: response.outputs[0].data.regions.reduce(acc => ++acc, 0)
			}
		})
}

module.exports = usersService;