import { REDUCER_NAME } from './constants';

const authorsSelector = state => state.getIn(['masters', 'authors']);
const tattooPhotosFromAuthorsSelector = state => state.getIn(['masters', 'tattooPhotosFromAuthors']);
const authorsWithTattooSelector = state => state.getIn(['masters', 'authorsWithTattoo']);
const loaderMastersSelector = state => state.getIn(['masters', 'loader']);
const loaderDetailSelector = state => state.getIn([REDUCER_NAME, 'loader']);
const authorDetailSelector = state => state.getIn([REDUCER_NAME, 'authorDetail']);

export const selectIndexContainer = state => ({
  authors: authorsSelector(state),
  tattooPhotosFromAuthors: tattooPhotosFromAuthorsSelector(state),
  authorsWithTattoo: authorsWithTattooSelector(state),
  loaderMasters: loaderMastersSelector(state),
  loaderDetail: loaderDetailSelector(state),
  authorDetail: authorDetailSelector(state),
});
