import { REDUCER_NAME } from './constants';

const authorsSelector = state => state.getIn(['masters', 'authors']);
const tattooPhotosFromAuthorsSelector = state => state.getIn([REDUCER_NAME, 'tattooPhotosFromAuthors']);
const authorsWithTattooSelector = state => state.getIn(['masters', 'authorsWithTattoo']);
const loaderSelector = state => state.getIn(['masters', 'loader']);
const loaderNewsSelector = state => state.getIn(['news', 'loaderNews']);
const newsSelector = state => state.getIn(['news', 'newsList']);
const matchMediaSelector = state => state.get('matchMedia');

export const selectIndexContainer = state => ({
  authors: authorsSelector(state),
  tattooPhotosFromAuthors: tattooPhotosFromAuthorsSelector(state),
  authorsWithTattoo: authorsWithTattooSelector(state),
  matchMedia: matchMediaSelector(state),
  loader: loaderSelector(state),
  loaderNews: loaderNewsSelector(state),
  news: newsSelector(state)
});
