import { faker } from '@faker-js/faker';

let nextUserId = 4;

function addUser(data, options = {}) {
  // Select a random gender_id (1=male, 2=female, 3=diverse, 4=non-binary)
  const genderId = faker.helpers.arrayElement([1, 2, 3, 4]);
  
  data[`user`][`${nextUserId}`] = Object.assign({
    "id": nextUserId,
    "username": faker.internet.userName(),
    "first_name": faker.person.firstName(),
    "last_name": faker.person.lastName(),
    "is_active": true,
    "is_physical_person": true,
    "password": faker.internet.userName(),
    "default_password": faker.internet.userName(),
    "can_change_own_password": true,
    "gender_id": genderId,
    "default_vote_weight": "1.000000",
    "committee_ids": [],
    "committee_management_ids": [],
    "poll_voted_ids": [],
    "option_ids": [],
    "vote_ids": [],
    "delegated_vote_ids": [],
    "meeting_user_ids": [],
    "meeting_ids": [],
    "organization_id": 1
  }, options);

  data[`organization`][`1`][`user_ids`].push(nextUserId);
  
  // Update gender relation - ensure gender collection exists
  if (data[`gender`] && data[`gender`][`${genderId}`] && Array.isArray(data[`gender`][`${genderId}`][`user_ids`])) {
    data[`gender`][`${genderId}`][`user_ids`].push(nextUserId);
  }
  
  nextUserId++;
}

export { addUser, nextUserId };
