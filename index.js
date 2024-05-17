const { faker } = require('@faker-js/faker');
const { readFileSync } = require('fs');

const fileData = readFileSync('./example-data.json');
const data = JSON.parse(fileData);

const users = data[`user`];
for (let i = 4; i <= 10000; i++) {
  users[`${i}`] = {
    "id": i,
    "username": faker.internet.userName(),
    "first_name": faker.person.firstName(),
    "last_name": faker.person.lastName(),
    "is_active": true,
    "is_physical_person": true,
    "password": "",
    "default_password": "",
    "can_change_own_password": true,
    "gender": "diverse",
    "default_vote_weight": "1.000000",
    "option_ids": [],
    "meeting_user_ids": [i],
    "meeting_ids": [1],
    "organization_id": 1, 
    "committee_ids": [1]
  }
  data[`organization`][`1`][`user_ids`].push(i);
}

const meetingUsers = data[`meeting_user`];
for (let i = 4; i <= 10000; i++) {
  const group = faker.helpers.rangeToNumber({ min: 1, max: 5 });
  const structureLevel = faker.helpers.rangeToNumber({ min: 1, max: 3 });
  meetingUsers[`${i}`] = {
    "id": i,
    "user_id": i,
    "meeting_id": 1,
    "comment": faker.lorem.words(5, 12),
    "number": faker.finance.accountNumber(),
    "about_me": faker.lorem.words(5, 12),
    "vote_weight": "1.000000",
    "speaker_ids": [],
    "supported_motion_ids": [],
    "assignment_candidate_ids": [],
    "structure_level_ids": [structureLevel],
    "group_ids": [group]
  }

  data[`meeting`][`1`][`meeting_user_ids`].push(i);
  if (data[`group`][`${group}`][`meeting_user_ids`]) {
    data[`group`][`${group}`][`meeting_user_ids`].push(i);
  } else {
    data[`group`][`${group}`][`meeting_user_ids`] = [i];
  }

  if (data[`structure_level`][`${structureLevel}`][`meeting_user_ids`]) {
    data[`structure_level`][`${structureLevel}`][`meeting_user_ids`].push(i);
  } else {
    data[`structure_level`][`${structureLevel}`][`meeting_user_ids`] = [];
  }
}

console.log(JSON.stringify(data));
