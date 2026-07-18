# v116 - survey answers Google backup and test SMS fix

- Supabase server Google backup now sends survey answer fields as concrete columns instead of stringifying answers only.
- Added robust survey answer extraction for q-overall, q-venue, q-guide, q-return, q-good, q-improve and dynamic question columns.
- Survey test SMS now calls /api/send-sms with kind=notice and phone so the exact survey template is sent instead of the reservation confirmation template.
- Fixed test SMS fallback screening field from startsAt to startTime so date/time appears in the survey message.
- Cache version bumped to 116.
