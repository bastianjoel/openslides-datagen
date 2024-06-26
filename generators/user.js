import { faker } from '@faker-js/faker';

let nextUserId = 4;

function addUser(data, options = {}) {
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
    "gender": faker.helpers.arrayElement(['male', 'female', 'diverse']),
    "default_vote_weight": "1.000000",
    "option_ids": [],
    "meeting_user_ids": [],
    "meeting_ids": [],
    "organization_id": 1, 
    "committee_ids": []
  }, options);

  data[`organization`][`1`][`user_ids`].push(nextUserId);
  nextUserId++;
}

export { addUser, nextUserId };
