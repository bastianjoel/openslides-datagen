import { faker } from '@faker-js/faker';

let nextProjectorId = 3;

function addProjector(data, meetingId, name = "Default projector", options = {}) {
  data[`projector`][`${nextProjectorId}`] = Object.assign({
    "id": nextProjectorId,
    "name": name,
    "is_internal": false,
    "scale": 0,
    "scroll": 0,
    "width": 1220,
    "aspect_ratio_numerator": 4,
    "aspect_ratio_denominator": 3,
    "color": "#000000",
    "background_color": "#ffffff",
    "header_background_color": "#317796",
    "header_font_color": "#f5f5f5",
    "header_h1_color": "#317796",
    "chyron_background_color": "#317796",
    "chyron_font_color": "#ffffff",
    "chyron_background_color_2": "#134768",
    "chyron_font_color_2": "#ffffff",
    "show_header_footer": true,
    "show_title": true,
    "show_logo": true,
    "show_clock": true,
    "current_projection_ids": [],
    "preview_projection_ids": [],
    "meeting_id": meetingId
  }, options);

  data[`meeting`][`${meetingId}`][`projector_ids`].push(nextProjectorId);
  
  nextProjectorId++;
  return nextProjectorId - 1;
}

export { addProjector, nextProjectorId };
