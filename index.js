import { readFileSync } from 'fs';
import { addUser, nextUserId } from './generators/user.js';
import { addMeetingUser } from './generators/meeting-user.js';
import { addCommittee } from './generators/committee.js';
import { addMeeting } from './generators/meeting.js';
import { faker } from '@faker-js/faker';

const fileData = readFileSync('./example-data.json');
const data = JSON.parse(fileData);

for (let i = nextUserId; i <= 2000; i++) {
  addUser(data);
}

for (let i = 4; i <= 2000; i++) {
  addMeetingUser(data, 1, i);
}

for (let cI = 1; cI <= 50; cI++) {
  const committeeId = addCommittee(data);
  for (let mI = 1; mI <= 2; mI++) {
    const meetingId = addMeeting(data, committeeId);
    const users = faker.helpers.arrayElements(data[`organization`][`1`][`user_ids`], { min: 50, max: 2000 });
    for (let uId of users) {
      addMeetingUser(data, meetingId, uId);
    }
  }
}

console.log(JSON.stringify(data));
