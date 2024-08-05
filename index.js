import { readFileSync } from 'fs';
import { addUser, nextUserId } from './generators/user.js';
import { addMeetingUser } from './generators/meeting-user.js';
import { addCommittee } from './generators/committee.js';
import { addMeeting } from './generators/meeting.js';
import { faker } from '@faker-js/faker';

const fileData = readFileSync('./example-data.json');
const data = JSON.parse(fileData);

const NUM_COMMITTEES = 50;
const NUM_MEETINGS_PER_COMMITTEE = { min: 1, max: 8 };
const NUM_USERS = 2000;
const NUM_USERS_PER_MEETING = { min: 50, max: NUM_USERS };

for (let i = nextUserId; i <= NUM_USERS; i++) {
  addUser(data);
}

for (let i = 4; i <= NUM_USERS; i++) {
  addMeetingUser(data, 1, i);
}

for (let cI = 2; cI <= NUM_COMMITTEES; cI++) {
  const committeeId = addCommittee(data);
  const addMeetingsAmount = faker.helpers.rangeToNumber(NUM_MEETINGS_PER_COMMITTEE);
  for (let mI = 1; mI <= addMeetingsAmount; mI++) {
    const meetingId = addMeeting(data, committeeId);
    const users = faker.helpers.arrayElements(data[`organization`][`1`][`user_ids`], NUM_USERS_PER_MEETING);
    for (let uId of users) {
      addMeetingUser(data, meetingId, uId);
    }
  }
}

console.log(
  JSON.stringify(data, (key, value) => key.endsWith(`_ids`) && value instanceof Array ? [...new Set(value)] : value)
);
