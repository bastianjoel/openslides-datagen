import { faker } from '@faker-js/faker';

let nextCommitteeId = 2;

function addCommittee(data, options = {}) {
  data[`committee`][`${nextCommitteeId}`] = Object.assign({
    "id": nextCommitteeId,
    "name": faker.lorem.words({ min: 1, max: 4 }),
    "description": faker.lorem.sentence(),
    "meeting_ids": [],
    "default_meeting_id": null,
    "user_ids": [],
    "manager_ids": [1],
    "organization_tag_ids": [],
    "organization_id": 1
  }, options);

  data[`organization`][`1`][`committee_ids`].push(nextCommitteeId);
  nextCommitteeId++;

  return nextCommitteeId - 1;
}

export { addCommittee, nextCommitteeId };
