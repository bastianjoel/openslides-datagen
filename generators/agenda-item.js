import { faker } from '@faker-js/faker';

let nextAgendaItemId = 16;

function addAgendaItem(data, meetingId, contentObjectId, options = {}) {
  const type = faker.helpers.arrayElement(['common', 'internal', 'hidden']);
  
  const agendaItemData = {
    "id": nextAgendaItemId,
    "type": type,
    "closed": faker.datatype.boolean(),
    "weight": nextAgendaItemId * 2,
    "level": 0,
    "content_object_id": contentObjectId,
    "meeting_id": meetingId
  };
  
  // Only add is_internal if type is internal
  if (type === 'internal') {
    agendaItemData.is_internal = true;
  }
  
  data[`agenda_item`][`${nextAgendaItemId}`] = Object.assign(agendaItemData, options);

  data[`meeting`][`${meetingId}`][`agenda_item_ids`].push(nextAgendaItemId);
  
  nextAgendaItemId++;
  return nextAgendaItemId - 1;
}

export { addAgendaItem, nextAgendaItemId };
