import { faker } from "@faker-js/faker";

let nextGroupId = 2;

function addGroup(data, meetingId, options = {}) {
  data[`group`][`${nextGroupId}`] = Object.assign({
    "id": nextGroupId,
    "name": faker.word.noun(),
    "permissions": [],
    "weight": 1,
    "meeting_id": meetingId
  }, options);

  data[`meeting`][`${meetingId}`][`group_ids`].push(nextGroupId);
  nextGroupId++;

  return nextGroupId - 1;
}

function addDefaultGroups(data, meetingId) {
  data[`meeting`][`${meetingId}`][`default_group_id`] = nextGroupId;
  addGroup(data, meetingId, {
    "name": "Default",
    "default_group_for_meeting_id": meetingId,
    "permissions": [
        "agenda_item.can_see_internal",
        "assignment.can_see",
        "list_of_speakers.can_see",
        "mediafile.can_see",
        "meeting.can_see_frontpage",
        "motion.can_see",
        "projector.can_see",
        "user.can_see"
    ],
  });

  data[`meeting`][`${meetingId}`][`admin_group_id`] = nextGroupId;
  addGroup(data, meetingId, {
    "name": "Admin",
    "admin_group_for_meeting_id": meetingId,
  });
}

export { addDefaultGroups, addGroup, nextGroupId };
