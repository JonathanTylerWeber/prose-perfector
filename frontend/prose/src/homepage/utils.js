export const getOpacity = (iconIndex, iconRef) => {
  if (!iconRef.current) return 0;

  const viewportHeight = window.innerHeight;
  const centerThreshold = viewportHeight / 2;
  const iconTop = iconRef.current.getBoundingClientRect().top;
  const iconBottom = iconTop + iconRef.current.offsetHeight;

  const isInView =
    (iconTop >= 0 && iconTop <= viewportHeight) ||
    (iconBottom >= 0 && iconBottom <= viewportHeight);

  let opacity = 1;

  if (
    (iconIndex === 1 && iconTop <= centerThreshold) || // First icon and within center
    (iconIndex === 4 && iconBottom >= viewportHeight - centerThreshold) || // Last icon and below center
    (iconIndex === 4 && iconTop <= centerThreshold) // Last icon and above center
  ) {
    opacity = 1 - Math.abs(iconTop - centerThreshold) / centerThreshold;
  } else if (isInView) {
    opacity = 1 - Math.abs(iconTop - centerThreshold) / centerThreshold;
  } else {
    opacity = 0;
  }

  return opacity;
};