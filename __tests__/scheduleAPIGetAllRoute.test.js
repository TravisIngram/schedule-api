
import EpisodeRouter from '../src/routes/episodeRouter.js';
// import Api from '../src/api.js';
import { leadingZero } from '../src/helpers/fileInOut.js'

describe('scheduleAPI helper functions', function() {
	it('should add a leading zero before any single digit number', () => {
		let testNum = 1;
		let passingNum = leadingZero(testNum).toString();

		expect(passingNum).toHaveLength(2);
	});
});

// describe('scheduleAPI', function() {

// 	describe('GET /api/v1/airings - get all airings', () => {
// 		Tests the expected properties on the response object.
// 		let expectedProps = ['_id', 'schedule', 'episode', 'series'];

// 		it('should return objects with the correct properties', () => {
// 			request(app).get('/api/v1/airings')
// 			.expect(200)
// 			.then(res => {
// 				// Check for the expected properties
// 				let sampleKeys = Object.keys(res.body[0]);
// 				expectedProps.forEach(key => {
// 					expect(sampleKeys.includes(key)).toBe(true);
// 				});
// 			});
// 		});

// 		it('shouldn\'t return objects with extra properties', () => {
// 			return request(app).get('/api/v1/airings')
// 			.expect(200)
// 			.then(res => {
// 				// Check only for the expected properties
// 				let extraProps = Object.keys(res.body[0]).filter(key => {
// 					return !expectedProps.includes(key);
// 				});
// 				expect(extraProps.length).toBe(0);
// 			});
// 		});
// 	});
// });


let documents = [ {
	"_id" : "5943f51235b1508ce228b56c",
	"schedule" : {
		"schedule_channel" : "TPTLIFE",
		"schedule_date" : "2017-04-21T08:00:00",
		"schedule_duration" : "P0H26M46S"
	},
	"episode" : {
		"program_id" : 264291,
		"version_id" : 295927,
		"episode_title" : "Quick Column Quilts, Part 1",
		"episode_number" : 2804,
		"episode_desc" : "Replace traditional quilt blocks with sleek columns of fabric.",
		"episode_url" : null,
		"episode_language" : "English",
		"episode_dvi" : "NO",
		"episode_stereo" : "STEREO",
		"episode_hdtv" : "YES",
		"version_rating" : "TVG",
		"version_caption" : "Yes",
		"package_type" : "HDBA",
		"orig_broadcast_date" : "2014-10-15",
		"epi_genrelist_loc" : [ ],
		"epi_genrelist_nat" : [
			{
				"genrecd" : "H2",
				"genretxt" : "HOW-TO"
			}
		]
	},
	"series" : {
		"series_id" : 45,
		"series_code" : "SEWN",
		"series_title" : "Sewing with Nancy",
		"series_desc" : "SEWING WITH NANCY, TV's longest- running sewing program, continues the tradition.",
		"series_url" : "http://wpt.org/sewingwithnancy/",
		"series_pgmtype" : 0,
		"series_genrelist_loc" : [ ]
	}
}];

let mongoDB = {
  collection: function() {
    let query, skip, limit;
    return {
			skip: function(value) {
				skip = value;
				return this;
			},
			limit: function(value) {
				limit = value;
				return this;
			},
			find: function(value) {
				query = value;
				return this;
			},
			toArray: function(cb) {
        cb(null, documents);
      }
    }
  }
 };

let request = {
	"params": {
		"id": 1,
		"startDate": 2,
		"endDate": 3
	},
	"query": {
		"limit": 4,
		"skipt": 5
	}
};

let response = {
	"status": function() {
		return this;
	},
	"json": jest.fn()
}

function exitNode() {
	process.exit(1);
}

describe('Test Handlers', () => {

		//before each will be run to reset state
	it('Responds with data from database', function() {
		EpisodeRouter.prototype.getEpisodeByDateRange(request, response, mongoDB);
		// console.log(response.json.mock, response.json.mock.calls);
		expect(response.json.mock.calls.length).toBe(1);
		expect(response.json.mock.calls[0][0]).toEqual(documents);
	});

	it('Calls limit with limit parameter', function() {
		let mockLimit = jest.fn();

		mongoDB = {
	    collection: function() {
	      let query, skip, limit;
	      return {
					skip: function(value) {
						skip = value;
						return this;
					},
					limit: function(value) {
						mockLimit(value);
						return this;
					},
					find: function(value) {
						query = value;
						return this;
					},
	        toArray: function(cb) {
	          cb(null, documents);
	        }
	      }
	    }
	  };
		EpisodeRouter.prototype.getEpisodeByDateRange(request, response, mongoDB);
		expect(response.json.mock.calls.length).toBe(2);
		expect(request.query.limit).toEqual(4);
	});
});
