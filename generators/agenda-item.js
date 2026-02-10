import { faker } from '@faker-js/faker';

let nextAgendaItemId = 16;

function addAgendaItem(data, meetingId, contentObjectId, options = {}) {
  const type = faker.helpers.arrayElement(['common', 'internal', 'hidden']);
  const isInternal = type === 'internal';
  
  data[`agenda_item`][`${nextAgendaItemId}`] = Object.assign({
    "id": nextAgendaItemId,
    "type": type,
    "closed": faker.datatype.boolean(),
    "is_internal": isInternal,
    "weight": nextAgendaItemId * 2,
    "level": 0,
    "content_object_id": contentObjectId,
    "meeting_id": meetingId
  }, options);
  
  // Only set is_internal if type is internal
  if (type !== 'internal') {
    delete data[`agenda_item`][`${nextAgendaItemId}`][`is_internal`];
  }

  data[`meeting`][`${meetingId}`][`agenda_item_ids`].push(nextAgendaItemId);
  
  nextAgendaItemId++;
  return nextAgendaItemId - 1;
}

export { addAgendaItem, nextAgendaItemId };
