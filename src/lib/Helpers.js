export function getSpriteAspect(sprite) {
  return sprite.texture.width / sprite.texture.height;
}

export function getFitDimensions(parentW, parentH, childW, childH) {
  const parentAspect = parentW / parentH;
  const childAspect = childW / childH;
  const dimensions = {};
  if (parentAspect > childAspect) {
    dimensions.width = childW * (parentH / childH);
    dimensions.height = parentH;
  } else {
    dimensions.width = parentW;
    dimensions.height = childH * (parentW / childW);
  }
  return dimensions;
}

export function getFillDimensions(parentW, parentH, childW, childH) {
  const parentAspect = parentW / parentH;
  const childAspect = childW / childH;
  const dimensions = {};
  if (parentAspect < childAspect) {
    dimensions.width = childW * (parentH / childH);
    dimensions.height = parentH;
  } else {
    dimensions.width = parentW;
    dimensions.height = childH * (parentW / childW);
  }
  return dimensions;
}
