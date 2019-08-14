// Get tags from post content
export const detectTags = (content, character) =>
  content.split(' ').filter(word => word.slice(0, 1) === character);
export const getContentTags = content => {
  const newTags = [];
  const tags = detectTags(content, '#');
  tags.forEach(tag => {
    newTags.push(tag.slice(1));
  });
  return newTags;
};

export const sortObjectsDate = objects => {
  const sortedObjects = objects;

  // Sort posts with creation date
  sortedObjects.sort(
    (a, b) => parseInt(b.creationDate) - parseInt(a.creationDate),
  );

  return sortedObjects;
};
