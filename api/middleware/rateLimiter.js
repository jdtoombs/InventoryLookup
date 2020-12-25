const moment = require("moment");
const redis = require("redis");

/** hours */
const WINDOW_SIZE = 24;
/** max number of calls */
const REQUEST_MAX_COUNT = 500;
/** the port for the Redis client */
const PORT_NUMBER = "6379";
/** the name of the host  */
const HOST_NAME = "redis";

const client = redis.createClient(PORT_NUMBER, HOST_NAME);

/** a simple rate limiter middleware to ensure user does not exceed the 24 hour limit
 * currently counts each individual request (1 search has 3 api requests)
 */
var rateLimiter = (req, res, next) => {
    try {
        if (!client) {
            throw new Error("No Redis client found.");
        }
        client.get(req.ip, function(err, record) {
            if (err) {
                console.log(err);
                throw err;
            }
            /** if no record exists make one, record will be null if this is the case */
            if (record == null) {
                let requestLogger = {
                    /** timestamp - unused at the moment - leaving for debugging */
                    requestTimeStamp: moment().unix(),
                    /** initialize call count */
                    requestCount: 1,
                    /** time the first request of 'day' occurred */
                    initialRequestTimeStamp: moment().unix(),
                };
                client.set(req.ip, JSON.stringify(requestLogger));
                next();
            } else {
                let foundRecord = JSON.parse(record);
                console.log(foundRecord);
                /** get the past 24 hour window */
                let past24Hours = moment().subtract(WINDOW_SIZE, "hours").unix();
                /** check user has not exceeded call limit in the past 24 hours*/
                if (foundRecord.requestCount > REQUEST_MAX_COUNT) {
                    res.status(500).send({
                        error: `You have exceeded your 24 hour limit of ${REQUEST_MAX_COUNT}`,
                    });
                    return;
                } else if (foundRecord.initialRequestTimeStamp > past24Hours) {
                    /** if within the 24 hour window increment the count and add latest time count */
                    foundRecord.requestCount++;
                    foundRecord.requestTimeStamp = moment().unix();
                    client.set(req.ip, JSON.stringify(foundRecord));
                    next();
                    /** if outside of window reset the count to 1 and reset initial daily request*/
                } else {
                    foundRecord.requestCount = 1;
                    foundRecord.requestTimeStamp = moment().unix();
                    foundRecord.initialRequestTimeStamp = moment().unix();
                    client.set(req.ip, JSON.stringify(foundRecord));
                    next();
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = rateLimiter;