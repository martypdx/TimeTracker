const TimeBlock = require('./lib/models/timeblock');
const connection = require('./lib/setup-mongoose');

function generateRandomTimeBlocks(numBlocks, starting) {
  let start_time;
  let end_time = starting;
  for (let i = 0; i < numBlocks; i++) {
    start_time = new Date(end_time);
    end_time.setHours(end_time.getHours() + (Math.random()*4));
    console.log('iteration  ', i);
    console.log('start_time ', start_time);
    console.log('end time   ', end_time);
    let blk = new TimeBlock({
      description: 'Thing ' + i,
      startTime: start_time,
      endTime: end_time
    });
    blk.save();
  }
}

generateRandomTimeBlocks(10, new Date());

connection.close();