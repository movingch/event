# v111 - SMS status and Google backup pipeline hardening

- Supabase writes are no longer blocked by Google Apps Script responses.
- Google Sheet backup now runs as a debounced automatic background backup after Supabase writes.
- If a save happens while another Supabase write is in progress, the latest state is queued and saved immediately after the current write finishes.
- Temporary SMS states such as `발송중` are not pushed as final backup states; `발송완료`/`발송실패` trigger the final Supabase save and Google backup.
- Google Sheet backup has a timeout and retry path so slow Apps Script responses do not freeze survey/SMS workflows.
