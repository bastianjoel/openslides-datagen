import { faker } from '@faker-js/faker';

let nextMotionId = 5;

function addMotion(data, meetingId, stateId, options = {}) {
  const hasReason = faker.datatype.boolean(0.7);
  const hasCategory = faker.datatype.boolean(0.6);
  
  const motionData = {
    "id": nextMotionId,
    "title": faker.lorem.words({ min: 2, max: 6 }),
    "text": `<p>${faker.lorem.paragraphs({ min: 1, max: 3 }, '<br/>\n')}</p>`,
    "text_hash": faker.string.alphanumeric(32),
    "category_weight": 10000,
    "sort_weight": 10000,
    "created": Math.floor(Date.now() / 1000) - faker.number.int({ min: 0, max: 86400 * 30 }),
    "last_modified": Math.floor(Date.now() / 1000) - faker.number.int({ min: 0, max: 86400 * 7 }),
    "start_line_number": 1,
    "state_id": stateId,
    "submitter_ids": [],
    "supporter_ids": [],
    "poll_ids": [],
    "option_ids": [],
    "meeting_id": meetingId
  };
  
  if (hasReason) {
    motionData.reason = `<p>${faker.lorem.paragraph()}</p>`;
  }
  
  data[`motion`][`${nextMotionId}`] = Object.assign(motionData, options);

  data[`meeting`][`${meetingId}`][`motion_ids`].push(nextMotionId);
  
  nextMotionId++;
  return nextMotionId - 1;
}

export { addMotion, nextMotionId };
