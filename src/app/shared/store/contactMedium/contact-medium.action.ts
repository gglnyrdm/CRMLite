import { createAction, props } from '@ngrx/store';
import { PostContactMediumRequest } from '../../../features/customers/models/requests/contactMedium/post-contact-medium-request';

export const setContactMedium = createAction(
  '[Contact Medium] set Contact Medium',
  props<{ contactMedium: PostContactMediumRequest }>()
);
