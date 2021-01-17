let tags = [];
let images = [];


export function setImages(imgs) {
  images = imgs;
}

export function getImages() {
  return images;
}

/**
 * @param {{name: string; tags: string[]}} tgs 
 */
export function setTags(tgs) {
  tags = tgs;
}

/**
 * @returns {{name: string, tags: string[]}} the tags
 */
export function getTags() {
  return tags;
}

/**
 * @param {string} term term to search for
 * @returns {string[]} list of matching images
 */
export function search(term) {
  const lowerTerm = term.toLowerCase();
  return tags.filter(tag => {
    return tag.name.toLowerCase().includes(lowerTerm) || tag.tags.some((s) => s.toLowerCase().includes(lowerTerm));
  }).map(tag => tag.name);
}
