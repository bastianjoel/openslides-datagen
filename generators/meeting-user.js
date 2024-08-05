import { faker } from '@faker-js/faker';

let nextMeetingUserId = 4;

function addMeetingUser(data, meetingId, userId, options = {}) {
  const groups = faker.helpers.arrayElements(data[`meeting`][`${meetingId}`][`group_ids`], { min: 1, max: 3 });
  const structureLevels = faker.helpers.arrayElements(data[`meeting`][`${meetingId}`][`structure_level_ids`], { min: 0, max: 3 });

  data[`meeting_user`][`${nextMeetingUserId}`] = Object.assign({
    "id": nextMeetingUserId,
    "user_id": userId,
    "meeting_id": meetingId,
    "comment": faker.lorem.words(5, 12),
    "number": faker.finance.accountNumber(),
    "about_me": faker.lorem.words(5, 12),
    "vote_weight": "1.000000",
    "speaker_ids": [],
    "supported_motion_ids": [],
    "assignment_candidate_ids": [],
    "structure_level_ids": structureLevels,
    "group_ids": groups
  }, options);
  data[`user`][`${userId}`][`committee_ids`].push(data[`meeting`][`${meetingId}`][`committee_id`]);
  data[`user`][`${userId}`][`meeting_ids`].push(meetingId);
  data[`user`][`${userId}`][`meeting_user_ids`].push(nextMeetingUserId);
  
  data[`meeting`][`${meetingId}`][`user_ids`].push(userId);
  data[`meeting`][`${meetingId}`][`meeting_user_ids`].push(nextMeetingUserId);
  data[`committee`][data[`meeting`][`${meetingId}`][`committee_id`]][`user_ids`].push(userId);
  for (let group of groups) {
    if (data[`group`][`${group}`][`meeting_user_ids`]) {
      data[`group`][`${group}`][`meeting_user_ids`].push(nextMeetingUserId);
    } else {
      data[`group`][`${group}`][`meeting_user_ids`] = [nextMeetingUserId];
    }
  }

  for (let structureLevel of structureLevels) {
    if (data[`structure_level`][`${structureLevel}`][`meeting_user_ids`]) {
      data[`structure_level`][`${structureLevel}`][`meeting_user_ids`].push(nextMeetingUserId);
    } else {
      data[`structure_level`][`${structureLevel}`][`meeting_user_ids`] = [];
    }
  }

  nextMeetingUserId++;
}

export { addMeetingUser, nextMeetingUserId };
